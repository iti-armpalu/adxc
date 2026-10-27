"use client";

import { useEffect, useId, useState, type RefObject } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Point = [number, number];
type Line = { d: string; start: Point; end: Point; oneWay?: boolean };

type Props = {
    containerRef: RefObject<HTMLDivElement | null>;
    agent: number;
    providers: number[];
    stage: number;
};

// Vertical → horizontal → vertical path with rounded corners
function elbow(x1: number, y1: number, x2: number, y2: number): Line {
    const midY = (y1 + y2) / 2;
    const r = Math.min(Math.abs(x2 - x1) / 2, Math.abs(y2 - y1) / 2, 24);
    const start: Point = [x1, y1];
    const end: Point = [x2, y2];

    if (r < 1) return { d: `M ${x1} ${y1} L ${x2} ${y2}`, start, end };

    const sx = x2 > x1 ? 1 : -1;
    const sy = y2 > y1 ? 1 : -1;
    const d = [
        `M ${x1} ${y1}`,
        `L ${x1} ${midY - sy * r}`,
        `Q ${x1} ${midY} ${x1 + sx * r} ${midY}`,
        `L ${x2 - sx * r} ${midY}`,
        `Q ${x2} ${midY} ${x2} ${midY + sy * r}`,
        `L ${x2} ${y2}`,
    ].join(" ");

    return { d, start, end };
}

export function FlowLines({ containerRef, agent, providers, stage }: Props) {
    const reduceMotion = useReducedMotion();
    const uid = useId().replace(/[^a-zA-Z0-9-_]/g, "");
    const [lines, setLines] = useState<Line[]>([]);
    const providersKey = providers.join(",");

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const providerIds = providersKey.split(",").filter(Boolean).map(Number);

        const measure = () => {
            const box = container.getBoundingClientRect();

            // First visible match (mobile and desktop task anchors both exist)
            const rect = (selector: string) => {
                const el = Array.from(container.querySelectorAll<HTMLElement>(selector)).find(
                    (e) => e.offsetWidth > 0
                );
                if (!el) return null;
                const r = el.getBoundingClientRect();
                return {
                    left: r.left - box.left,
                    right: r.right - box.left,
                    top: r.top - box.top,
                    bottom: r.bottom - box.top,
                    cx: r.left - box.left + r.width / 2,
                    cy: r.top - box.top + r.height / 2,
                };
            };

            const task = rect(`[data-flow-task="${stage}"]`);
            const ag = rect(`[data-flow="agent-${agent}"]`);
            const adxc = rect(`[data-flow="adxc"]`);
            const internal = rect(`[data-flow="internal"]`);
            if (!task || !ag || !adxc) return;

            const next: Line[] = [
                elbow(task.cx, task.top - 5, ag.cx, ag.bottom + 5),
                elbow(ag.cx, ag.top - 5, adxc.cx, adxc.bottom + 5),
                ...providerIds.flatMap((i) => {
                    const p = rect(`[data-flow="provider-${i}"]`);
                    return p ? [elbow(adxc.cx, adxc.top - 5, p.cx, p.bottom + 5)] : [];
                }),
            ];

            if (internal) {
                const start: Point = [internal.left - 5, adxc.cy];
                const end: Point = [adxc.right + 5, adxc.cy];
                next.push({ d: `M ${start[0]} ${start[1]} L ${end[0]} ${end[1]}`, start, end, oneWay: true });
            }

            setLines(next);
        };

        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(container);
        return () => ro.disconnect();
    }, [containerRef, agent, providersKey, stage]);

    const routeKey = `${agent}-${providersKey}-${stage}`;

    return (
        <svg aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden size-full overflow-visible md:block">
            {lines.map((line, i) => {
                const pathId = `${uid}-flow-${i}`;
                const begin = i * 0.15 + 0.4;

                return (
                    <g key={`${routeKey}-${i}`}>
                        <motion.path
                            id={pathId}
                            d={line.d}
                            fill="none"
                            className="stroke-primary"
                            strokeWidth={3}
                            strokeDasharray="1 8"
                            strokeLinecap="round"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.8 }}
                            transition={{ duration: 0.4, delay: reduceMotion ? 0 : i * 0.15 }}
                        />

                        <circle cx={line.start[0]} cy={line.start[1]} r={3} className="fill-brand-300" />
                        <circle cx={line.end[0]} cy={line.end[1]} r={3} className="fill-brand-300" />

                        {!reduceMotion && (
                            <>
                                <circle r={4} className="fill-brand-300">
                                    <animateMotion dur="3s" repeatCount="indefinite" begin={`${begin}s`}>
                                        <mpath href={`#${pathId}`} />
                                    </animateMotion>
                                </circle>
                                {!line.oneWay && (
                                    <circle r={4} className="fill-primary">
                                        <animateMotion
                                            dur="3s"
                                            repeatCount="indefinite"
                                            begin={`${begin + 1.5}s`}
                                            keyPoints="1;0"
                                            keyTimes="0;1"
                                            calcMode="linear"
                                        >
                                            <mpath href={`#${pathId}`} />
                                        </animateMotion>
                                    </circle>
                                )}
                            </>
                        )}
                    </g>
                );
            })}
        </svg>
    );
}