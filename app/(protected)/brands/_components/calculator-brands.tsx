'use client';

import { useMemo, useState } from "react";
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
    strategy: true,
    creative: true,
    media: true,
    execution: false,
    optimisation: true,
  });

  const [teamSize, setTeamSize] = useState<TeamSize>("10to20");
  const [annualResearchBudgetUsd, setAnnualResearchBudgetUsd] = useState(100_000);
  const [view, setView] = useState<View>("annual");

  const togglePhase = (id: PhaseId) => {
    setSelectedPhases(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const { savingsAnnualUsd, savingsMonthlyUsd } =
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
                        "w-full px-2 py-3 rounded-lg text-sm font-medium transition-all",
                        "min-h-[56px] text-center",
                        isOn
                          ? "bg-[#66023c] text-white shadow-md"
                          : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300",
                      ].join(" ")}
                    >
                      <div>{phase.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Team size (replaces acquisition approach) */}
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
                        "relative flex-1 p-6 rounded-xl border-2 transition-all",
                        isOn ? "border-[#66023c] bg-pink-50/30" : "border-gray-200 bg-white",
                      ].join(" ")}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div
                          className={[
                            "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                            isOn ? "bg-pink-100" : "bg-gray-100",
                          ].join(" ")}
                        >
                          <svg
                            className={[
                              "w-5 h-5",
                              isOn ? "text-[#66023c]" : "text-gray-500",
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
                min={1_000}
                max={500_000}
                step={1_000}
              />

              <div className="flex justify-between text-sm text-gray-400 mt-4">
                <span>$1k</span>
                <span>$500k</span>
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="lg:w-[496px] bg-[#66023c] border border-pink-700 rounded-[32px] p-10 shadow-2xl relative overflow-hidden">
            <div className="relative">
              <div className="flex items-center justify-between mb-10">
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
                        ? "bg-white text-primary shadow-sm"
                        : "text-primary-foreground/70 hover:text-primary-foreground",
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
                        ? "bg-white text-primary shadow-sm"
                        : "text-primary-foreground/70 hover:text-primary-foreground",
                    ].join(" ")}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              {/* Savings Amount */}
              <div
                className={[
                  "text-white font-bold tracking-tight leading-none mb-4 tabular-nums whitespace-nowrap transition-all duration-300",
                  sizeClassForBigMoney(displaySavings),
                ].join(" ")}
              >
                {formatUsd0(displaySavings)}
              </div>

              <p className="text-pink-200/90 text-sm font-light leading-relaxed mb-10 opacity-90">
                Savings vs equivalent subscription costs for your selected activities,
                adjusted by team size.
              </p>

              {/* Benefits */}
              <div className="space-y-6">
                {[
                  "Replace bundled subscriptions with targeted spend",
                  "Scale costs with actual usage, not seats",
                  "Transparent cost breakdown by activity",
                ].map(text => (
                  <div key={text} className="flex items-center gap-4">
                    <div className="w-7 h-7 bg-emerald-400 rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-white font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
