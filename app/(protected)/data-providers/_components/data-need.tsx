"use client";

import { useState } from "react";
import { ArrowDown, Database } from "lucide-react";
import { cn } from "@/lib/utils";

const PROVIDERS = ["Kantar", "Nielsen", "Experian", "GWI", "Comscore", "Your data"];
const YOUR_DATA = 5;

const STAGES = [
    {
        name: "Strategy / Brief",
        subtasks: [
            { label: "Market understanding", providers: [0, 1, 2, 5] },
            { label: "Audience sizing", providers: [1, 2] },
            { label: "Category context", providers: [0, 3] },
        ],
    },
    {
        name: "Creative Development",
        subtasks: [
            { label: "Cultural tensions, insights", providers: [0, 4] },
            { label: "Inspiration", providers: [4] },
            { label: "Messaging development", providers: [0] },
        ],
    },
    {
        name: "Media Strategy / Planning",
        subtasks: [
            { label: "Reach, frequency", providers: [4] },
            { label: "Channel effectiveness", providers: [4] },
            { label: "Planning", providers: [4] },
        ],
    },
    {
        name: "Activation / Execution",
        subtasks: [
            { label: "Campaign activation", providers: [2, 5] },
            { label: "Retail media", providers: [3] },
            { label: "Execution", providers: [3] },
        ],
    },
    {
        name: "Measurement & Optimization",
        subtasks: [
            { label: "Effectiveness", providers: [0, 1, 5] },
            { label: "Sales impact", providers: [3] },
            { label: "Optimization", providers: [0, 1, 3] },
        ],
    },
];

const SUBTASKS = STAGES.flatMap((s, stage) => s.subtasks.map((t) => ({ ...t, stage })));

const joinList = (items: string[]) =>
    items.length <= 1 ? (items[0] ?? "") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;

export function DataNeed() {
    const [selected, setSelected] = useState<string | null>(STAGES[0].subtasks[0].label);
    const [lastStage, setLastStage] = useState(0);

    const route = SUBTASKS.find((s) => s.label === selected) ?? null;
    const stage = route?.stage ?? lastStage;

    const choose = (label: string) => {
        const match = SUBTASKS.find((s) => s.label === label);
        if (match) setLastStage(match.stage);
        setSelected(label);
    };
    const toggle = (label: string) => (selected === label ? setSelected(null) : choose(label));

    const named = route?.providers.filter((i) => i !== YOUR_DATA).map((i) => PROVIDERS[i]) ?? [];
    const usesYours = !!route?.providers.includes(YOUR_DATA);

    return (
        <section className="bg-primary-subtle">
            <div className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 sm:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-balance text-heading">
                        SMEs need diverse data from a range of providers, making full licenses prohibitive
                    </h2>
                    <p className="mt-4 text-pretty text-lg text-foreground-alt">
                        They can&apos;t afford multiple providers, or low utilisation, so they pick one or none
                    </p>
                </div>

                <div className="mx-auto w-full min-w-0 max-w-5xl rounded-xl border bg-card p-4 shadow-sm sm:p-8">
                    {/* Tasks */}
                    <p className="text-caption mb-2 text-xs text-muted-foreground">Example marketing tasks by stage</p>

                    {/* Mobile: chips + subtasks */}
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
                                <SubtaskButton key={t.label} label={t.label} selected={selected === t.label} onClick={() => toggle(t.label)} />
                            ))}
                        </div>
                    </div>

                    {/* Desktop: grid */}
                    <div className="hidden grid-cols-5 gap-2 rounded-xl border border-border-1 bg-accent-0 p-3 md:grid">
                        {STAGES.map((s) => (
                            <div key={s.name}>
                                <p className="mb-3 flex min-h-10 items-center justify-center rounded-full bg-muted px-2 text-center text-xs font-semibold text-primary">
                                    {s.name}
                                </p>
                                <div className="flex flex-col gap-2">
                                    {s.subtasks.map((t) => (
                                        <SubtaskButton key={t.label} label={t.label} selected={selected === t.label} onClick={() => toggle(t.label)} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div aria-hidden className="flex justify-center py-4">
                        <ArrowDown className={cn("size-5 transition-colors", route ? "text-primary" : "text-border-4")} />
                    </div>

                    {/* Providers */}
                    <p className="text-caption mb-2 text-xs text-muted-foreground">Data providers</p>
                    <ul className="grid grid-cols-3 gap-2 rounded-xl border border-border-1 bg-accent-0 p-3 sm:grid-cols-6">
                        {PROVIDERS.map((name, i) => {
                            const on = !!route?.providers.includes(i);
                            const yours = i === YOUR_DATA;
                            return (
                                <li
                                    key={name}
                                    className={cn(
                                        "flex flex-col items-center gap-2 py-2 transition-opacity duration-300",
                                        route && !on && "opacity-40"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "flex size-10 items-center justify-center rounded-lg border transition-colors sm:size-12",
                                            on
                                                ? "border-2 border-primary bg-primary-subtle text-primary shadow-lg shadow-primary/20"
                                                : "border-border-3 bg-muted text-mid-alt",
                                            yours && "border-dashed"
                                        )}
                                    >
                                        <Database className="size-4 sm:size-5" aria-hidden />
                                    </span>
                                    <span className={cn("text-center text-xs", yours ? "font-semibold text-primary" : "text-mid-alt")}>
                                        {name}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>

                    <p aria-live="polite" className="mx-auto mt-6 max-w-xl text-pretty text-center text-sm text-foreground-alt sm:text-base">
                        {route ? (
                            <>
                                <span className="font-semibold text-primary">{route.label}</span> needs{" "}
                                {named.length > 0 && <span className="font-semibold text-primary">{joinList(named)}</span>}
                                {usesYours && (
                                    <>
                                        {named.length > 0 && " and "}
                                        <span className="font-semibold text-primary">your data</span>
                                    </>
                                )}
                                .
                            </>
                        ) : (
                            "Select a subtask to see which data providers it needs."
                        )}
                    </p>
                    <p className="mt-3 text-center text-xs italic text-muted-foreground">For illustrative purposes only</p>
                </div>
            </div>
        </section>
    );
}

function SubtaskButton({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
    return (
        <button
            type="button"
            aria-pressed={selected}
            onClick={onClick}
            className={cn(
                "w-full rounded-full border px-2 py-1.5 text-center text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selected
                    ? "border-primary bg-primary-subtle text-primary"
                    : "border-transparent bg-card text-mid-alt hover:border-primary hover:bg-primary-subtle"
            )}
        >
            {label}
        </button>
    );
}