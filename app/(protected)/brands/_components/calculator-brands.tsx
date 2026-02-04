'use client';

import { useMemo, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { Slider } from "@/components/ui/slider";

type PhaseId = "strategy" | "creative" | "media" | "execution" | "optimisation";
type TeamSize = "lt10" | "10to20" | "gt20";
type View = "annual" | "monthly";

const PHASES = [
  { id: "strategy", label: "Strategy / brief", avgSpendUsd: 200_000 },
  { id: "creative", label: "Creative ideation", avgSpendUsd: 175_000 },
  { id: "media", label: "Channel / media Planning", avgSpendUsd: 250_000 },
  { id: "execution", label: "Execution", avgSpendUsd: 150_000 },
  { id: "optimisation", label: "Optimisation", avgSpendUsd: 175_000 },
] as const satisfies readonly { id: PhaseId; label: string; avgSpendUsd: number }[];

const TEAM_SIZES = [
  { id: "lt10", label: "Less than 10", multiplier: 1 },
  { id: "10to20", label: "10–20", multiplier: 1.5 },
  { id: "gt20", label: "More than 20", multiplier: 2 },
] as const satisfies readonly { id: TeamSize; label: string; multiplier: number }[];

type PhaseToggles = Record<PhaseId, boolean>;

const formatUsd0 = (n: number) =>
  n.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

const sizeClassForBigMoney = (value: number) => {
  if (value >= 50_000_000) return "text-[40px] md:text-[48px]";
  if (value >= 20_000_000) return "text-[48px] md:text-[56px]";
  if (value >= 10_000_000) return "text-[56px] md:text-[64px]";
  return "text-[72px] md:text-[80px]";
};

export default function CalculatorBrands() {

  const [selectedPhases, setSelectedPhases] = useState<PhaseToggles>({
    strategy: false,
    creative: false,
    media: false,
    execution: false,
    optimisation: false,
  });

  const [teamSize, setTeamSize] = useState<TeamSize>("lt10");
  const [annualResearchBudgetUsd, setAnnualResearchBudgetUsd] = useState(100_000);
  const [view, setView] = useState<View>("annual");

  const togglePhase = (id: PhaseId) => {
    setSelectedPhases(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const { equivalentAnnualUsd, equivalentMonthlyUsd, savingsAnnualUsd, savingsMonthlyUsd } =
    useMemo(() => {
      const basePhaseSpendUsd = PHASES.reduce((sum, p) => {
        return sum + (selectedPhases[p.id] ? p.avgSpendUsd : 0);
      }, 0);

      const teamMultiplier =
        TEAM_SIZES.find(t => t.id === teamSize)?.multiplier ?? 1;

      const equivalentAnnualUsd = basePhaseSpendUsd * teamMultiplier;
      const equivalentMonthlyUsd = equivalentAnnualUsd / 12;

      const rawSavings = equivalentAnnualUsd - annualResearchBudgetUsd;

      // If you want negative savings (overspend), remove Math.max.
      const savingsAnnualUsd = Math.max(0, rawSavings);
      const savingsMonthlyUsd = savingsAnnualUsd / 12;

      return {
        basePhaseSpendUsd,
        teamMultiplier,
        equivalentAnnualUsd,
        equivalentMonthlyUsd,
        savingsAnnualUsd,
        savingsMonthlyUsd,
      };
    }, [annualResearchBudgetUsd, selectedPhases, teamSize]);

  const displaySavings = view === "annual" ? savingsAnnualUsd : savingsMonthlyUsd;
  const displayEquivalent = view === "annual" ? equivalentAnnualUsd : equivalentMonthlyUsd;

  return (
    <Section size="md">
      <Container>
        <div className="flex flex-col items-start">
          <SectionHeader
            title="Calculate your potential savings"
            description="Compare your on-demand research budget to equivalent subscription costs."
            size="md"
            align="left"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Calculator Form */}
          <div className="flex-1 space-y-12">
            {/* Phase selection */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-5">
                Marketing Phases Where You Use Data <span className="text-pink-600">(Multi-select)</span>
              </label>

              {/* grid so they can fit in one row on large screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {PHASES.map(phase => {
                  const isOn = selectedPhases[phase.id];
                  return (
                    <button
                      key={phase.id}
                      type="button"
                      onClick={() => togglePhase(phase.id)}
                      className={[
                        "w-full px-3 py-3 rounded-lg text-sm font-medium transition-all",
                        "min-h-[56px] text-center",
                        isOn
                          ? "bg-adxc text-primary-foreground shadow-md"
                          : "bg-card border border-border text-muted-foreground hover:border-primary/50",
                      ].join(" ")}
                    >
                      <div>{phase.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-5">
                Team Size
              </label>

              <div className="flex flex-col md:flex-row gap-5">
                {TEAM_SIZES.map(opt => {
                  const isOn = teamSize === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setTeamSize(opt.id)}
                      className={[
                        "relative flex-1 p-6 rounded-xl border-1 transition-all",
                        isOn ? "border-adxc bg-pink-50/30" : "hover:border-primary/50 bg-white",
                      ].join(" ")}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div
                          className={[
                            "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                            isOn ? "bg-pink-100" : "bg-gray-100",
                          ].join(" ")}
                        >
                          <svg
                            className={[
                              "w-5 h-5",
                              isOn ? "text-adxc" : "text-gray-500",
                            ].join(" ")}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                          </svg>
                        </div>

                        <div className={isOn ? "font-bold text-gray-900" : "font-bold text-gray-600"}>
                          {opt.label}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Annual research budget slider */}
            <div className="pt-2">
              <div className="flex items-end justify-between mb-8">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Your Annual Research Budget
                </label>

                <div className="text-4xl font-bold text-[#66023c] tracking-tight tabular-nums">
                  {formatUsd0(annualResearchBudgetUsd)}
                </div>
              </div>

              <Slider
                value={[annualResearchBudgetUsd]}
                onValueChange={([v]) => setAnnualResearchBudgetUsd(v)}
                min={0}
                max={500_000}
                step={1_000}
              />

              <div className="flex justify-between text-sm text-gray-400 mt-4">
                <span>$0</span>
                <span>$500k</span>
              </div>
            </div>
          </div>


          {/* Results Card */}
          <div className="lg:w-[496px] bg-[#66023c] border border-pink-700 rounded-[32px] p-10 shadow-2xl relative overflow-hidden">
            <div className="relative">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-pink-100 text-lg font-medium">
                  Your estimated savings
                </span>

                <div className="flex bg-black/20 backdrop-blur border border-white/10 rounded-xl p-1.5">
                  <button
                    type="button"
                    onClick={() => setView("annual")}
                    className={[
                      "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                      view === "annual"
                        ? "bg-white text-[#66023c] shadow-sm"
                        : "text-pink-100/70 hover:text-pink-100",
                    ].join(" ")}
                  >
                    Annual
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("monthly")}
                    className={[
                      "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                      view === "monthly"
                        ? "bg-white text-[#66023c] shadow-sm"
                        : "text-pink-100/70 hover:text-pink-100",
                    ].join(" ")}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              {/* Equivalent cost (smaller, top row) */}
              <div className="mb-12">
                <div className="flex items-baseline justify-between gap-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-pink-100/70">
                    Equivalent data cost via subscriptions
                  </div>
                  <div className="text-pink-50 text-xl font-semibold tabular-nums whitespace-nowrap">
                    {formatUsd0(displayEquivalent)}
                  </div>
                </div>

                <p className="mt-2 text-xs text-pink-100/70 leading-relaxed">
                  Assumes access to 2+ premium data providers per phase
                </p>
              </div>

              {/* Savings label */}
              <div className="text-xs font-bold uppercase tracking-wider text-pink-100/70 mb-3">
                Savings vs subscriptions
              </div>

              {/* Savings Amount (big) */}
              <div
                className={[
                  "text-white font-bold tracking-tight leading-none mb-4 tabular-nums whitespace-nowrap transition-all duration-300",
                  sizeClassForBigMoney(displaySavings),
                ].join(" ")}
              >
                {formatUsd0(displaySavings)}
              </div>

              {/* Optional: small supporting line (keep or remove) */}
              <p className="text-pink-200/90 text-sm font-light leading-relaxed mb-10 opacity-90">
                Savings vs equivalent subscription costs for your selected activities, adjusted by team size.
              </p>
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}
