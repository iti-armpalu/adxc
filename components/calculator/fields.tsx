"use client";

import { useId } from "react";
import type { LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { formatUsd } from "@/lib/calculator/format";
import { cn } from "@/lib/utils";

const LABEL = "text-caption text-xs text-muted-foreground";
const VALUE = "text-2xl font-semibold tracking-tight tabular-nums text-primary sm:text-3xl";

/* ---------- Slider with live value ---------- */

type SliderFieldProps = {
    label: string;
    value: number;
    onChange: (v: number) => void;
    min: number;
    max: number;
    step: number;
    format?: (n: number) => string;
};

export function SliderField({
    label,
    value,
    onChange,
    min,
    max,
    step,
    format = (n) => n.toLocaleString("en-US"),
}: SliderFieldProps) {
    return (
        <div>
            <div className="mb-4 flex items-baseline justify-between gap-4">
                <span className={LABEL}>{label}</span>
                <span className={VALUE}>{format(value)}</span>
            </div>
            <Slider
                aria-label={label}
                value={[value]}
                onValueChange={([v]) => onChange(v)}
                min={min}
                max={max}
                step={step}
            />
            <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                <span>{format(min)}</span>
                <span>{format(max)}</span>
            </div>
        </div>
    );
}

/* ---------- Single or multi choice ---------- */

type Option = { id: string; label: string; icon?: LucideIcon };

type ChoiceGroupProps = {
    label: string;
    hint?: string;
    options: readonly Option[];
    selected: string[];
    onToggle: (id: string) => void;
    className?: string; // grid columns override
};

export function ChoiceGroup({ label, hint, options, selected, onToggle, className }: ChoiceGroupProps) {
    return (
        <fieldset>
            <legend className={cn(LABEL, "mb-3")}>
                {label}
                {hint && <span className="text-primary"> {hint}</span>}
            </legend>
            <div className={cn("grid grid-cols-2 gap-2 sm:grid-cols-3", className)}>
                {options.map(({ id, label: optionLabel, icon: Icon }) => {
                    const on = selected.includes(id);
                    return (
                        <button
                            key={id}
                            type="button"
                            aria-pressed={on}
                            onClick={() => onToggle(id)}
                            className={cn(
                                "flex min-h-14 flex-col items-center justify-center gap-2 rounded-xl border px-3 py-3 text-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                on
                                    ? "border-primary bg-primary-subtle text-primary"
                                    : "border-border bg-card text-muted-foreground hover:border-border-4"
                            )}
                        >
                            {Icon && <Icon className="size-5" aria-hidden />}
                            {optionLabel}
                        </button>
                    );
                })}
            </div>
        </fieldset>
    );
}

/* ---------- Currency input ---------- */

type CurrencyFieldProps = {
    label: string;
    value: number;
    onChange: (v: number) => void;
};

export function CurrencyField({ label, value, onChange }: CurrencyFieldProps) {
    const id = useId();
    return (
        <div>
            <div className="mb-4 flex items-baseline justify-between gap-4">
                <label htmlFor={id} className={LABEL}>
                    {label}
                </label>
                <span className={VALUE}>{formatUsd(value)}</span>
            </div>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                    id={id}
                    inputMode="numeric"
                    value={value ? value.toLocaleString("en-US") : ""}
                    onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, "");
                        onChange(digits ? Number(digits) : 0);
                    }}
                    className="h-12 pl-7 text-base font-semibold tabular-nums"
                />
            </div>
        </div>
    );
}