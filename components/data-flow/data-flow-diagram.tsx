"use client";

import { useEffect, useRef, useState } from "react";
import { MotionConfig, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowDown, Database, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    AGENTS,
    AGENT_SCATTER,
    DEFAULT_SUBTASK,
    PROVIDERS,
    PROVIDER_SCATTER,
    STAGES,
} from "./data";
import { FlowLines } from "./flow-lines";

const DURATION = 1;
const EASE = [0.32, 0.72, 0, 1] as const;
const SQUARE_TRANSITION = {
    layout: { duration: DURATION, ease: EASE },
    rotate: { duration: DURATION, ease: EASE },
    scale: { duration: 0.3 },
};

// Flat lookup: subtask label → route + stage index
const SUBTASKS = STAGES.flatMap((s, stage) => s.subtasks.map((t) => ({ ...t, stage })));

const joinList = (items: string[]) =>
    items.length <= 1 ? (items[0] ?? "") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;

export function DataFlowDiagram() {
    const reduceMotion = useReducedMotion();
    const containerRef = useRef<HTMLDivElement>(null);
    const inView = useInView(containerRef, { once: true, amount: 0.3 });
    const slotted = inView || !!reduceMotion;

    // Lines + highlights wait until squares have landed
    const [settled, setSettled] = useState(false);
    useEffect(() => {
        if (!slotted) return;
        const t = setTimeout(() => setSettled(true), reduceMotion ? 0 : DURATION * 1000);
        return () => clearTimeout(t);
    }, [slotted, reduceMotion]);

    const [selected, setSelected] = useState<string | null>(DEFAULT_SUBTASK);
    const [lastStage, setLastStage] = useState(0);

    const route = SUBTASKS.find((s) => s.label === selected) ?? null;
    const stage = route?.stage ?? lastStage;
    const live = settled && route ? route : null;

    const choose = (label: string) => {
        const match = SUBTASKS.find((s) => s.label === label);
        if (match) setLastStage(match.stage);
        setSelected(label);
    };
    const toggle = (label: string) => (selected === label ? setSelected(null) : choose(label));

    return (
        <MotionConfig reducedMotion="user">
            <div
                ref={containerRef}
                className="adxc-brand relative mx-auto flex w-full min-w-0 max-w-5xl flex-col rounded-xl border bg-card p-4 shadow-xl sm:p-8 md:gap-10"

            >
                {/* Curved lines: desktop only */}
                {live && (
                    <FlowLines
                        containerRef={containerRef}
                        agent={live.agent}
                        providers={live.providers}
                        stage={live.stage}
                    />
                )}

                {/* Scattered squares, shown until the diagram enters view */}
                {!slotted && (
                    <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
                        {PROVIDER_SCATTER.map((p, i) => (
                            <ScatteredSquare key={`p${i}`} id={`provider-${i}`} pos={p} kind="provider" />
                        ))}
                        {AGENT_SCATTER.map((p, i) => (
                            <ScatteredSquare key={`a${i}`} id={`agent-${i}`} pos={p} kind="agent" />
                        ))}
                    </div>
                )}

                {/* Tasks: first on mobile, last on desktop */}
                <div className="order-1 md:order-4">
                    <p className="text-caption mb-2 text-xs text-muted-foreground">
                        Example marketing tasks by stage
                    </p>

                    {/* Mobile: swipeable stage chips + subtasks */}
                    <div className="md:hidden">
                        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden">
                            {STAGES.map((s, i) => (
                                <button
                                    key={s.name}
                                    type="button"
                                    aria-pressed={i === stage}
                                    onClick={() => choose(s.subtasks[0].label)}
                                    className={cn(
                                        "shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                        i === stage
                                            ? "border-primary bg-primary text-primary-foreground"
                                            : "border-border bg-card text-primary"
                                    )}
                                >
                                    {s.name}
                                </button>
                            ))}
                        </div>
                        <div className="mt-3 grid gap-2 rounded-xl border border-border-1 bg-accent-0 p-3">
                            {STAGES[stage].subtasks.map((t) => (
                                <SubtaskButton
                                    key={t.label}
                                    label={t.label}
                                    selected={selected === t.label}
                                    onClick={() => toggle(t.label)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Desktop: 5-column grid */}
                    <div className="hidden grid-cols-5 gap-2 rounded-xl border border-border-1 bg-accent-0 p-3 md:grid">
                        {STAGES.map((s, i) => (
                            <div key={s.name} data-flow-task={i}>
                                <p className="mb-3 flex min-h-10 items-center justify-center rounded-full bg-muted px-2 text-center text-xs font-semibold text-primary">
                                    {s.name}
                                </p>
                                <div className="flex flex-col gap-2">
                                    {s.subtasks.map((t) => (
                                        <SubtaskButton
                                            key={t.label}
                                            label={t.label}
                                            selected={selected === t.label}
                                            onClick={() => toggle(t.label)}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Connector on={!!live} className="order-2" />

                {/* Agents */}
                <Group label="Your AI agentic ecosystem" className="order-3">
                    <div className="flex justify-between gap-1 sm:justify-center sm:gap-10 md:gap-16">
                        {AGENTS.map((name, i) => (
                            <SlotItem
                                key={name}
                                id={`agent-${i}`}
                                name={name}
                                kind="agent"
                                slotted={slotted}
                                active={live?.agent === i}
                                dimmed={!!live && live.agent !== i}
                            />
                        ))}
                    </div>
                </Group>

                <Connector on={!!live} className="order-4" />

                {/* ADXC + internal data */}
                <div className="order-5 grid grid-cols-[2fr_auto_1fr] items-center md:order-2">
                    <div
                        data-flow="adxc"
                        className="flex items-center justify-center rounded-xl bg-primary p-3 sm:p-4"
                    >
                        <span className="text-xl font-bold tracking-[0.3em] text-primary-foreground sm:text-3xl">
                            ADXC
                        </span>
                    </div>
                    <div
                        aria-hidden
                        className={cn(
                            "w-4 border-t-2 border-dashed border-border-3 transition-opacity duration-300 sm:w-16",
                            live && "md:opacity-0"
                        )}
                    />
                    <div
                        data-flow="internal"
                        className="flex items-center justify-center rounded-xl border-2 border-border bg-muted p-3 text-center text-xs font-medium text-mid-alt sm:p-4 sm:text-sm"
                    >
                        Internal / 1P data
                    </div>
                </div>

                <Connector on={!!live} className="order-6" />

                {/* Data providers: last on mobile, first on desktop */}
                <Group label="Data providers" className="order-7 md:order-1">
                    <div className="flex justify-between gap-1 sm:justify-center sm:gap-10 md:gap-16">
                        {PROVIDERS.map((name, i) => (
                            <SlotItem
                                key={name}
                                id={`provider-${i}`}
                                name={name}
                                kind="provider"
                                slotted={slotted}
                                active={!!live?.providers.includes(i)}
                                dimmed={!!live && !live.providers.includes(i)}
                            />
                        ))}
                    </div>
                </Group>

                {/* Footnote + screen-reader description (no visible summary) */}
                <div className="order-8 mt-6 md:order-5 md:mt-0">
                    <p className="text-center text-xs italic text-muted-foreground">
                        For illustrative purposes only
                    </p>
                    <p aria-live="polite" className="sr-only">
                        {route
                            ? `${route.label}: ${AGENTS[route.agent]} queries ${joinList(
                                route.providers.map((i) => PROVIDERS[i])
                            )} through ADXC`
                            : ""}
                    </p>
                </div>
            </div>
        </MotionConfig>
    );
}

/* ---------- Pieces ---------- */

type Kind = "provider" | "agent";

function Square({ kind, active = false, glow = false }: { kind: Kind; active?: boolean; glow?: boolean }) {
    const Icon = kind === "provider" ? Database : Sparkles;
    return (
        <span
            className={cn(
                "flex size-full items-center justify-center rounded-lg border shadow-md transition-colors duration-300",
                active
                    ? "border-2 border-primary bg-brand-100 text-primary shadow-lg shadow-primary/25"
                    : "border-border-3 bg-muted text-mid-alt",
                glow && "shadow-lg shadow-primary/25"
            )}
        >
            <Icon className="size-4 sm:size-5" strokeWidth={2} />
        </span>
    );
}

function ScatteredSquare({
    id,
    pos,
    kind,
}: {
    id: string;
    pos: { x: number; y: number; rotate: number };
    kind: Kind;
}) {
    return (
        <motion.div
            layoutId={id}
            // negative margins centre the square on its point (transforms are reserved for Framer)
            className="absolute -ml-4.5 -mt-4.5 size-9 sm:-ml-6.5 sm:-mt-6.5 sm:size-13"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            initial={false}
            animate={{ rotate: pos.rotate }}
            transition={SQUARE_TRANSITION}
        >
            <Square kind={kind} glow />
        </motion.div>
    );
}

function SlotItem({
    id,
    name,
    kind,
    slotted,
    active,
    dimmed,
}: {
    id: string;
    name: string;
    kind: Kind;
    slotted: boolean;
    active: boolean;
    dimmed: boolean;
}) {
    return (
        <div
            data-flow={id}
            className={cn(
                "flex min-w-0 flex-1 flex-col items-center gap-2 transition-opacity duration-300 sm:w-20 sm:flex-none",
                dimmed && "opacity-40"
            )}
        >
            <div
                className={cn(
                    "relative size-9 rounded-lg border-2 border-dashed transition-colors sm:size-13",
                    slotted ? "border-transparent" : "border-border"
                )}
            >
                {slotted && (
                    <motion.div
                        layoutId={id}
                        className="size-full"
                        initial={false}
                        animate={{ rotate: 0, scale: active ? 1.1 : 1 }}
                        transition={SQUARE_TRANSITION}
                    >
                        <Square kind={kind} active={active} />
                    </motion.div>
                )}
            </div>
            <span className="break-words text-center text-[0.625rem] leading-tight text-mid-alt sm:text-xs">
                {name}
            </span>
        </div>
    );
}

// Mobile-only arrow between stacked layers
function Connector({ on, className }: { on: boolean; className?: string }) {
    return (
        <div aria-hidden className={cn("flex flex-col items-center py-2 md:hidden", className)}>
            <span
                className={cn("h-5 w-0.5 rounded-full transition-colors", on ? "bg-primary" : "bg-border-3")}
            />
            <ArrowDown
                className={cn("-mt-1 size-4 transition-colors", on ? "text-primary" : "text-border-4")}
            />
        </div>
    );
}

function Group({
    label,
    className,
    children,
}: {
    label: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div className={className}>
            <p className="text-caption mb-2 text-xs text-muted-foreground">{label}</p>
            <div className="rounded-xl border border-border-1 bg-accent-0 p-3">{children}</div>
        </div>
    );
}

function SubtaskButton({
    label,
    selected,
    onClick,
}: {
    label: string;
    selected: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            aria-pressed={selected}
            onClick={onClick}
            className={cn(
                "w-full rounded-full border px-2 py-1.5 text-center text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selected
                    ? "border-primary bg-brand-50 text-primary"
                    : "border-transparent bg-card text-mid-alt hover:border-primary hover:bg-brand-50"
            )}
        >
            {label}
        </button>
    );
}