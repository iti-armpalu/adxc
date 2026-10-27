"use client";

import { useState } from "react";
import { formatUsd } from "@/lib/calculator/format";
import { cn } from "@/lib/utils";

type View = "annual" | "monthly";

type Props = {
    title: string;
    description?: string;
    resultLabel: string; // "savings" | "revenue" | "earnings"
    annual: number;
    note: string;
    className?: string;
    children: React.ReactNode; // the inputs
};

export function CalculatorSection({
    title,
    description,
    resultLabel,
    annual,
    note,
    className,
    children,
}: Props) {
    const [view, setView] = useState<View>("annual");
    const value = formatUsd(view === "annual" ? annual : annual / 12);

    return (
        <section className={cn(className)}>
            <div className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 sm:py-24">
                <div className="max-w-2xl">
                    <h2 className="text-balance text-heading">{title}</h2>
                    {description && (
                        <p className="mt-4 text-pretty text-lg text-foreground-alt">{description}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-start lg:gap-16">
                    <div className="space-y-10">{children}</div>

                    {/* Result: sticky bottom bar on mobile, sticky card on desktop */}
                    <div className="@container sticky bottom-4 z-10 rounded-xl bg-primary p-4 text-primary-foreground shadow-2xl [--num-max:2.25rem] sm:p-6 lg:bottom-auto lg:top-[calc(var(--header-h)+1.5rem)] lg:p-10 lg:[--num-max:4.5rem]">
                        <div className="flex items-center justify-between gap-3">
                            <span className="text-sm font-medium text-primary-muted lg:text-lg">
                                Your estimated {resultLabel}
                            </span>
                            <div role="group" aria-label="Period" className="flex rounded-lg bg-primary-foreground/10 p-1">
                                {(["annual", "monthly"] as const).map((v) => (
                                    <button
                                        key={v}
                                        type="button"
                                        aria-pressed={view === v}
                                        onClick={() => setView(v)}
                                        className={cn(
                                            "rounded-md px-3 py-1 text-xs font-semibold capitalize transition-colors",
                                            view === v
                                                ? "bg-card text-primary shadow-sm"
                                                : "text-primary-muted hover:text-primary-foreground"
                                        )}
                                    >
                                        {v}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <p
                            aria-live="polite"
                            className="mt-2 whitespace-nowrap font-bold leading-none tracking-tight tabular-nums lg:mt-8"
                            style={{ fontSize: `min(var(--num-max), calc(100cqi / ${value.length * 0.62}))` }}
                        >
                            {value}
                        </p>

                        <p className="mt-4 hidden text-sm leading-relaxed text-primary-muted lg:block">{note}</p>
                    </div>
                </div>

                <p className="text-sm text-muted-foreground lg:hidden">{note}</p>
            </div>
        </section>
    );
}