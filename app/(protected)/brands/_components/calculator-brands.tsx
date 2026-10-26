'use client';

import { useMemo, useState } from "react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { Slider } from "@/components/ui/slider";
import { calculateBrandSavings } from "./brand-savings-table";

type TeamSize = "lt10" | "10to20" | "gt20";
type View = "annual" | "monthly";

const TEAM_SIZES = [
  { id: "lt10", label: "Less than 10", multiplier: 1 },
  { id: "10to20", label: "10–20", multiplier: 1.5 },
  { id: "gt20", label: "More than 20", multiplier: 2 },
] as const satisfies readonly { id: TeamSize; label: string; multiplier: number }[];

// UI-only: force "$" (not "US$") and round to whole dollars
const formatUsdUI = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  });

const sizeClassForBigMoney = (value: number) => {
  if (value >= 100_000_000) return "text-[32px] sm:text-[40px] md:text-[48px] xl:text-[56px]";
  if (value >= 10_000_000) return "text-[40px] sm:text-[48px] md:text-[56px] xl:text-[64px]";
  if (value >= 1_000_000) return "text-[48px] sm:text-[56px] md:text-[64px] xl:text-[72px]";
  return "text-[56px] sm:text-[64px] md:text-[72px] xl:text-[80px]";
};

export default function CalculatorBrands() {

  const [teamSize, setTeamSize] = useState<TeamSize>("lt10");
  const [annualResearchBudgetUsd, setAnnualResearchBudgetUsd] = useState(100_000);
  const [view, setView] = useState<View>("annual");

  const result = useMemo(
    () => calculateBrandSavings({ annualResearchBudgetUsd, teamSize }),
    [annualResearchBudgetUsd, teamSize]
  );

  const displaySavings = view === "annual" ? result.annualSavingsUsd : result.monthlySavingsUsd;

  return (
    <Section size="md">
      <Container>
        <div className="flex flex-col items-start">
          <SectionHeader
            title="Calculate your potential savings"
            description="See how much you could save by switching to ADXC's on-demand model."
            size="md"
            align="left"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start lg:items-stretch">
          <div className="flex-1 w-full space-y-10 md:space-y-12">
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 md:mb-5">
                Team Size
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5">
                {TEAM_SIZES.map(opt => {
                  const isOn = teamSize === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setTeamSize(opt.id)}
                      className={[
                        "relative p-4 sm:p-5 md:p-6 rounded-xl border transition-all",
                        isOn
                          ? "border-adxc bg-pink-50/30"
                          : "hover:border-primary/50 bg-white",
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
                              isOn ? "text-adxc" : "text-muted-foreground",
                            ].join(" ")}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                          </svg>
                        </div>

                        <div
                          className={[
                            "font-semibold text-sm sm:text-base",
                            isOn ? "text-foreground" : "text-muted-foreground",
                          ].join(" ")}
                        >
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
              <div className="flex flex-row items-center justify-between gap-4 mb-6 md:mb-8">
                <label className="inline-flex text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Your Annual Research Budget
                </label>

                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-adxc tracking-tight tabular-nums">
                  {formatUsdUI(annualResearchBudgetUsd)}
                </div>
              </div>

              <Slider
                value={[annualResearchBudgetUsd]}
                onValueChange={([v]) => setAnnualResearchBudgetUsd(v)}
                min={0}
                max={600_000}
                step={1_000}
                className="w-full"
              />

              <div className="flex justify-between text-sm text-muted-foreground mt-4">
                <span>$0</span>
                <span>$600k</span>
              </div>
            </div>
          </div>


          {/* Results Card */}
          <div className="w-full lg:w-[480px] lg:shrink-0 bg-adxc rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
            <div className="relative">
              {/* Header */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
                <span className="text-primary-foreground/80 text-base sm:text-lg font-medium">
                  Your estimated savings
                </span>

                <div className="flex w-full sm:w-auto bg-black/20 backdrop-blur border border-white/10 rounded-xl p-1.5">
                  <button
                    type="button"
                    onClick={() => setView("annual")}
                    className={[
                      "flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-1.5 rounded-lg text-xs font-bold transition-all",
                      view === "annual"
                        ? "bg-white text-adxc shadow-sm"
                        : "text-primary-foreground/70 hover:text-primary-foreground",
                    ].join(" ")}
                  >
                    Annual
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("monthly")}
                    className={[
                      "flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-1.5 rounded-lg text-xs font-bold transition-all",
                      view === "monthly"
                        ? "bg-white text-primary shadow-sm"
                        : "text-primary-foreground/70 hover:text-primary-foreground",
                    ].join(" ")}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              {/* Savings label */}
              <div className="text-xs font-bold uppercase tracking-wider text-primary-foreground/70 mb-3">
                Estimated savings
              </div>

              {/* Savings Amount */}
              <div
                className={[
                  "text-white font-bold tracking-tight leading-none mb-4 tabular-nums whitespace-nowrap transition-all duration-300",
                  sizeClassForBigMoney(displaySavings),
                ].join(" ")}
              >
                {formatUsdUI(displaySavings)}
              </div>

              <p className="text-primary-foreground/80 text-sm sm:text-[15px] font-light leading-relaxed">
                Estimated savings based on your annual research budget and team size.
              </p>
            </div>
          </div>


        </div>
      </Container>
    </Section>
  );
}
