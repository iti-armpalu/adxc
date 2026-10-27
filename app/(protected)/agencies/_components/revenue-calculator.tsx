"use client";

import { useState } from "react";
import { CalculatorSection } from "@/components/calculator/calculator-section";
import { CurrencyField, SliderField } from "@/components/calculator/fields";
import { agencyAnnualRevenue } from "@/lib/calculator/agencies";

export function RevenueCalculator() {
    const [clients, setClients] = useState(10);
    const [avgSpend, setAvgSpend] = useState(100_000);

    return (
        <CalculatorSection
            title="Calculate your potential revenue"
            description="See how much revenue you could generate with ADXC."
            resultLabel="revenue"
            annual={agencyAnnualRevenue(clients, avgSpend)}
            note="Estimated revenue based on clients using ADXC and average annual data spend."
        >
            <SliderField
                label="Number of clients using ADXC"
                value={clients}
                onChange={setClients}
                min={0}
                max={100}
                step={1}
            />
            <CurrencyField label="Average annual data spend" value={avgSpend} onChange={setAvgSpend} />
        </CalculatorSection>
    );
}