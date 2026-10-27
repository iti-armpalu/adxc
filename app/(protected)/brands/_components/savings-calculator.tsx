"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { CalculatorSection } from "@/components/calculator/calculator-section";
import { ChoiceGroup, SliderField } from "@/components/calculator/fields";
import { TEAM_SIZES, brandAnnualSavings, type TeamSize } from "@/lib/calculator/brands";
import { formatUsd } from "@/lib/calculator/format";

const TEAM_OPTIONS = TEAM_SIZES.map((t) => ({ ...t, icon: Users }));

export function SavingsCalculator() {
    const [team, setTeam] = useState<TeamSize>("lt10");
    const [budget, setBudget] = useState(100_000);

    return (
        <CalculatorSection
            title="Calculate your potential savings"
            description="See how much you could save by switching to ADXC's on-demand model."
            resultLabel="savings"
            annual={brandAnnualSavings(budget, team)}
            note="Estimated savings based on your annual research budget and team size."
        >
            <ChoiceGroup
                label="Team size"
                options={TEAM_OPTIONS}
                selected={[team]}
                onToggle={(id) => setTeam(id as TeamSize)}
                className="grid-cols-3"
            />
            <SliderField
                label="Your annual research budget"
                value={budget}
                onChange={setBudget}
                min={0}
                max={600_000}
                step={1_000}
                format={formatUsd}
            />
        </CalculatorSection>
    );
}