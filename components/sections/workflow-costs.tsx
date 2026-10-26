"use client";

import { useMemo, useState } from "react";
import { Check, Database } from "lucide-react";
import { cn } from "@/lib/utils";

const PROVIDERS = [
    { name: "Kantar", cost: 200000 },
    { name: "Nielsen", cost: 100000 },
    { name: "Experian", cost: 50000 },
    { name: "GWI", cost: 75000 },
    { name: "Comscore", cost: 100000 },
] as const;

const TASKS = [
    { name: "Strategy / Brief", subtasks: ["Market understanding", "Audience sizing", "Category context"], providers: [0, 1, 2] },
    { name: "Creative Development", subtasks: ["Tensions", "Cultural context", "Inspiration"], providers: [0, 4] },
    { name: "Media Strategy / Planning", subtasks: ["Reach, frequency", "Channel effectiveness", "Planning"], providers: [4] },
    { name: "Activation / Execution", subtasks: ["Campaign delivery", "Retail media", "Execution"], providers: [2, 3] },
    { name: "Measurement & Optimization", subtasks: ["Effectiveness", "Sales impact", "Optimization"], providers: [0, 1] },
] as const;

const formatUsd = (n: number) =>
    n.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        currencyDisplay: "narrowSymbol",
        maximumFractionDigits: 0,
    });

export function WorkflowCosts() {
    const [selected, setSelected] = useState<Set<string>>(() => new Set([TASKS[0].name]));

    const toggle = (name: string) =>
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(name)) next.delete(name);
            else next.add(name);
            return next;
        });

    const active = useMemo(
        () => new Set<number>(TASKS.filter((t) => selected.has(t.name)).flatMap((t) => t.providers)),
        [selected]
    );

    const total = PROVIDERS.reduce((sum, p, i) => (active.has(i) ? sum + p.cost : sum), 0);
    const count = active.size;

    return (
        <section>
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
                {/* Heading + hint */}
                <div className="mx-auto mb-10 max-w-3xl text-center">
                    <h2 className="text-balance text-primary">
                        See how much it costs to buy the data needed at each stage of the marketing workflow
                    </h2>
                    <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="relative flex size-2 shrink-0">
                            <span className="absolute inline-flex size-full rounded-full bg-primary opacity-60 motion-safe:animate-ping" />
                            <span className="relative inline-flex size-2 rounded-full bg-primary" />
                        </span>
                        Select tasks to see which data providers they need and what it costs
                    </p>
                </div>

                {/* Tasks */}
                <p className="text-caption mb-3 text-muted-foreground">Marketing tasks by stage</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                    {TASKS.map((task) => {
                        const on = selected.has(task.name);
                        return (
                            <button
                                key={task.name}
                                type="button"
                                aria-pressed={on}
                                onClick={() => toggle(task.name)}
                                className={cn(
                                    "flex flex-col rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                    on ? "border-primary bg-brand-50" : "border-border bg-card hover:border-border-4"
                                )}
                            >
                                <span className="flex items-start justify-between gap-2">
                                    <span className={cn("text-sm font-semibold", on ? "text-primary" : "text-foreground")}>
                                        {task.name}
                                    </span>
                                    <span
                                        className={cn(
                                            "flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                                            on ? "border-primary bg-primary text-primary-foreground" : "border-border-3"
                                        )}
                                    >
                                        {on && <Check className="size-3" />}
                                    </span>
                                </span>
                                <span className="mt-2 text-xs text-muted-foreground">{task.subtasks.join(" · ")}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Providers */}
                <p className="text-caption mb-3 mt-10 text-muted-foreground">
                    Data provider subscriptions (entry level)
                </p>
                <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
                    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-5">
                        {PROVIDERS.map((p, i) => {
                            const on = active.has(i);
                            return (
                                <li
                                    key={p.name}
                                    className={cn(
                                        "flex items-center gap-3 rounded-xl border p-3 transition-colors sm:flex-col sm:py-5 sm:text-center",
                                        on ? "border-primary bg-brand-50" : "border-border bg-card"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                                            on ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                        )}
                                    >
                                        <Database className="size-4" />
                                    </span>
                                    <span className={cn("flex-1 text-sm font-medium", on ? "text-primary" : "text-foreground-alt")}>
                                        {p.name}
                                    </span>
                                    <span
                                        className={cn(
                                            "text-sm tabular-nums",
                                            on ? "font-semibold text-primary" : "text-muted-foreground"
                                        )}
                                    >
                                        {formatUsd(p.cost)}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Desktop total */}
                    <Total total={total} count={count} className="hidden lg:flex lg:min-w-44 lg:flex-col lg:justify-center lg:text-center" />
                </div>

                <p className="mt-6 text-center text-xs italic text-muted-foreground">
                    For illustrative purposes only
                </p>

                {/* Mobile total: sticks to the bottom while the section is in view */}
                <Total total={total} count={count} className="sticky bottom-4 z-10 mt-6 flex shadow-lg lg:hidden" />

                {/* Single screen-reader announcement */}
                <p aria-live="polite" className="sr-only">
                    {count ? `Total ${formatUsd(total)} across ${count} providers` : "No tasks selected"}
                </p>
            </div>
        </section>
    );
}

function Total({ total, count, className }: { total: number; count: number; className?: string }) {
    return (
        <div
            aria-hidden
            className={cn(
                "items-center justify-between gap-1 rounded-xl border-2 border-dashed p-4 transition-colors",
                count ? "border-primary bg-brand-50" : "border-border-3 bg-card",
                className
            )}
        >
            <span className="text-caption text-muted-foreground">Total cost</span>
            <span className="text-right lg:text-center">
                <span className={cn("block text-2xl font-semibold tabular-nums", count ? "text-primary" : "text-muted-foreground")}>
                    {count ? formatUsd(total) : "—"}
                </span>
                {count > 0 && (
                    <span className="block text-xs text-muted-foreground">
                        {count} provider{count !== 1 ? "s" : ""}
                    </span>
                )}
            </span>
        </div>
    );
}