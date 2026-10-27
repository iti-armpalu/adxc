"use client";

import { useState } from "react";
import { CalculatorSection } from "@/components/calculator/calculator-section";
import { ChoiceGroup, SliderField } from "@/components/calculator/fields";
import {
    PHASES,
    TIERS,
    dataProviderAnnualEarnings,
    type PhaseId,
    type TierId,
} from "@/lib/calculator/data-providers";

const DEFAULT_COUNTS = Object.fromEntries(TIERS.map((t) => [t.id, t.defaultValue])) as Record<TierId, number>;

export function EarningsCalculator() {
    const [phases, setPhases] = useState<PhaseId[]>(["strategy", "media"]);
    const [counts, setCounts] = useState(DEFAULT_COUNTS);

    const togglePhase = (id: string) =>
        setPhases((prev) =>
            prev.includes(id as PhaseId) ? prev.filter((p) => p !== id) : [...prev, id as PhaseId]
        );

    return (
        <CalculatorSection
            title="Calculate your potential earnings"
            description="See how much you could earn by switching to ADXC's on-demand model."
            resultLabel="earnings"
            annual={dataProviderAnnualEarnings(phases, counts)}
            note="Estimated earnings based on the marketing phases your data supports and the number of ADXC clients by tier."
        >
            <ChoiceGroup
                label="Marketing phases your data supports"
                hint="(multi-select)"
                options={PHASES}
                selected={phases}
                onToggle={togglePhase}
                className="xl:grid-cols-5"
            />

            <div className="space-y-8">
                <p className="text-caption text-xs text-muted-foreground">Number of ADXC clients by tier</p>
                {TIERS.map((tier) => (
                    <SliderField
                        key={tier.id}
                        label={tier.label}
                        value={counts[tier.id]}
                        onChange={(v) => setCounts((prev) => ({ ...prev, [tier.id]: v }))}
                        min={0}
                        max={tier.max}
                        step={tier.step}
                    />
                ))}
            </div>
        </CalculatorSection>
    );
}