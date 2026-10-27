"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const MAX = 5;
const GAP_MAX = 2; // values at or below are gaps

const STAGES = [
    { label: "Strategy / Brief", short: "Strategy", task: "Market understanding, audience sizing, category context" },
    { label: "Creative Development", short: "Creative", task: "Insights, tensions, cultural context, inspiration" },
    { label: "Media Strategy / Planning", short: "Media", task: "Reach, frequency, channel effectiveness, planning" },
    { label: "Activation / Execution", short: "Activation", task: "Campaign delivery, retail media, execution" },
    { label: "Measurement & Optimization", short: "Measurement", task: "ROI, effectiveness, sales impact, optimization" },
];

const SOURCES = [
    { name: "Kantar Worldpanel", data: [4, 2, 3, 1, 5] },
    { name: "Nielsen / NielsenIQ", data: [4, 1, 4, 2, 5] },
    { name: "Mintel", data: [5, 4, 2, 1, 2] },
    { name: "Brandwatch", data: [3, 5, 2, 3, 3] },
    { name: "Amazon / Walmart", data: [0, 2, 3, 5, 4] },
    { name: "Meta / Google / TikTok", data: [0, 3, 4, 5, 4] },
    { name: "Ipsos", data: [4, 4, 2, 1, 4] },
    { name: "WARC", data: [4, 3, 4, 2, 3] },
    { name: "GWI", data: [5, 4, 3, 2, 2] },
    { name: "YouGov", data: [4, 4, 2, 1, 3] },
    { name: "Circana", data: [4, 2, 3, 3, 4] },
    { name: "Numerator", data: [3, 2, 3, 3, 5] },
];

const LEGEND = [
    { label: "Strong", color: "bg-emerald-500" },
    { label: "Partial", color: "bg-orange-400" },
    { label: "Gap", color: "bg-red-400" },
];

const barColor = (v: number) =>
    v <= GAP_MAX ? "bg-red-400" : v <= 3 ? "bg-orange-400" : "bg-emerald-500";

const joinList = (items: string[]) =>
    items.length <= 1 ? (items[0] ?? "") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;

// Name column on desktop, full-width name row on mobile
const ROW_GRID = "grid grid-cols-5 gap-x-2 md:grid-cols-[10rem_repeat(5,1fr)] md:gap-x-4";

type Props = { title: string; description?: string; className?: string };

export function DataCoverage({ title, description, className }: Props) {
    const [active, setActive] = useState<number | null>(null);
    const source = active === null ? null : SOURCES[active];
    const gaps = source ? STAGES.filter((_, i) => source.data[i] <= GAP_MAX).map((s) => s.short) : [];

    return (
        <section className={cn(className)}>
            <div className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 sm:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-balance text-heading">{title}</h2>
                    {description && (
                        <p className="mt-4 text-pretty text-lg text-foreground-alt">{description}</p>
                    )}
                </div>

                <div className="mx-auto max-w-6xl rounded-xl border bg-card p-4 shadow-sm sm:p-8">
                    <h3 className="text-lg sm:text-xl">Data provider coverage by marketing stage</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Each data provider covers part of the marketing process, but none cover it all.
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                        {LEGEND.map((l) => (
                            <span key={l.label} className="inline-flex items-center gap-1.5">
                                <span className={cn("size-2 rounded-full", l.color)} />
                                {l.label}
                            </span>
                        ))}
                        <span className="inline-flex items-center gap-2 sm:ml-auto">
                            <span className="relative flex size-1.5">
                                <span className="absolute inline-flex size-full rounded-full bg-primary opacity-60 motion-safe:animate-ping" />
                                <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                            </span>
                            Select a provider to highlight its gaps
                        </span>
                    </div>

                    {/* Column headers */}
                    <div className={cn(ROW_GRID, "mt-6 border-b px-1 pb-3")}>
                        <span className="hidden text-xs font-medium text-muted-foreground md:block">
                            Data source
                        </span>
                        {STAGES.map((s) => (
                            <span
                                key={s.label}
                                className="break-words text-center text-[0.625rem] font-medium leading-tight text-muted-foreground md:text-xs"
                            >
                                <span className="md:hidden">{s.short}</span>
                                <span className="hidden md:inline">{s.label}</span>
                                <span className="mt-1 hidden text-[0.625rem] font-normal leading-tight md:block">
                                    {s.task}
                                </span>
                            </span>
                        ))}
                    </div>

                    {/* Rows */}
                    <ul className="divide-y">
                        {SOURCES.map((src, r) => {
                            const on = active === r;
                            return (
                                <li key={src.name}>
                                    <button
                                        type="button"
                                        aria-pressed={on}
                                        onClick={() => setActive(on ? null : r)}
                                        className={cn(
                                            ROW_GRID,
                                            "w-full items-center gap-y-1.5 px-1 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:py-2.5",
                                            on ? "bg-primary-subtle" : "hover:bg-accent-0"
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "col-span-5 text-sm font-medium md:col-span-1",
                                                on ? "text-primary" : "text-foreground"
                                            )}
                                        >
                                            {src.name}
                                        </span>

                                        {src.data.map((v, c) => {
                                            const gap = v <= GAP_MAX;
                                            return (
                                                <span
                                                    key={STAGES[c].label}
                                                    className={cn(
                                                        "relative flex h-5 items-center rounded px-1 transition-colors",
                                                        on && gap && "bg-destructive-subtle"
                                                    )}
                                                >
                                                    <span className="block h-2 w-full overflow-hidden rounded-full bg-muted sm:h-2.5">
                                                        <span
                                                            className={cn(
                                                                "block h-full rounded-full transition-opacity duration-200",
                                                                barColor(v),
                                                                on && !gap && "opacity-30"
                                                            )}
                                                            style={{ width: `${(v / MAX) * 100}%` }}
                                                        />
                                                    </span>
                                                    {on && gap && (
                                                        <span className="absolute right-1.5 text-[0.625rem] font-semibold text-destructive-text">
                                                            Gap
                                                        </span>
                                                    )}
                                                </span>
                                            );
                                        })}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    <p
                        aria-live="polite"
                        className="mx-auto mt-6 max-w-xl text-pretty text-center text-sm text-foreground-alt"
                    >
                        {source ? (
                            <>
                                <span className="font-semibold text-primary">{source.name}</span> has gaps in{" "}
                                <span className="font-semibold text-destructive-text">{joinList(gaps)}</span>.
                                You&apos;d need other providers to cover them.
                            </>
                        ) : (
                            "No single provider covers every stage of the marketing workflow."
                        )}
                    </p>
                </div>
            </div>
        </section>
    );
}