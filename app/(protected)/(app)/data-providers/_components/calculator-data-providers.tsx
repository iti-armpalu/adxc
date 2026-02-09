'use client';

import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";

type PhaseId = "strategy" | "creative" | "media" | "execution" | "optimisation";
type view = "annual" | "monthly";
type TierId = "micro" | "small" | "medium";

const PROVIDER_PAYOUT_PER_QUERY_GBP = 5.7;
const GBP_TO_USD = 1.35;
const USEFUL_DATA_FACTOR = 0.33;

const PHASES = [
  { id: "strategy", label: "Strategy / brief", weight: 0.30 },
  { id: "creative", label: "Creative ideation", weight: 0.25 },
  { id: "media", label: "Channel / media planning", weight: 0.25 },
  { id: "execution", label: "Execution", weight: 0.1 },
  { id: "optimisation", label: "Optimisation", weight: 0.1 },
] as const satisfies readonly { id: PhaseId; label: string; weight: number }[];

const clientTiers = [
  {
    id: "micro",
    label: "Micro clients",
    min: 0,
    max: 20000,
    defaultValue: 500,
    step: 100,
    activeUsersPerClient: 2,
    avgQueriesPerUserPerMonth: 5,
  },
  {
    id: "small",
    label: "Small clients",
    min: 0,
    max: 5000,
    defaultValue: 50,
    step: 10,
    activeUsersPerClient: 8,
    avgQueriesPerUserPerMonth: 10,
  },
  {
    id: "medium",
    label: "Medium clients",
    min: 0,
    max: 250,
    defaultValue: 5,
    step: 1,
    activeUsersPerClient: 20,
    avgQueriesPerUserPerMonth: 20,
  },
] as const satisfies readonly {
  id: TierId;
  label: string;
  min: number;
  max: number;
  defaultValue: number;
  step: number;
  activeUsersPerClient: number;
  avgQueriesPerUserPerMonth: number;
}[];

type PhaseToggles = Record<PhaseId, boolean>;
type ClientCounts = Record<TierId, number>;

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

export default function CalculatorDataProviders() {
  const [view, setView] = useState<view>("annual");

  const [selectedPhases, setSelectedPhases] = useState<PhaseToggles>({
    strategy: true,
    creative: false,
    media: true,
    execution: false,
    optimisation: false,
  });

  const [clientCounts, setClientCounts] = useState<ClientCounts>({
    micro: clientTiers.find(t => t.id === "micro")?.defaultValue ?? 0,
    small: clientTiers.find(t => t.id === "small")?.defaultValue ?? 0,
    medium: clientTiers.find(t => t.id === "medium")?.defaultValue ?? 0,
  });

  const togglePhase = (id: PhaseId) => {
    setSelectedPhases(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const updateClientCount = (tier: TierId, value: number) => {
    setClientCounts(prev => ({ ...prev, [tier]: value }));
  };

  const {
    estimatedMonthly,
    estimatedAnnual,
  } = useMemo(() => {
    // 1) sum weights for selected phases
    const phaseFactor = PHASES.reduce((sum, p) => {
      return sum + (selectedPhases[p.id] ? p.weight : 0);
    }, 0);

    // 2) total expected queries across tiers:
    // clients * (activeUsersPerClient * avgQueriesPerUserPerMonth)
    const expectedMonthlyQueries = clientTiers.reduce((sum, tier) => {
      const clients = clientCounts[tier.id];
      const queriesPerClient =
        tier.activeUsersPerClient * tier.avgQueriesPerUserPerMonth;

      return sum + clients * queriesPerClient;
    }, 0);

    // 3) payout
    const grossPayoutGbp = expectedMonthlyQueries * PROVIDER_PAYOUT_PER_QUERY_GBP;
    const grossPayoutUsd = grossPayoutGbp * GBP_TO_USD;
    const usablePayoutUsd = grossPayoutUsd * USEFUL_DATA_FACTOR;

    // 4) apply phase factor (your definition)
    const estimatedMonthly = usablePayoutUsd * phaseFactor;
    const estimatedAnnual = estimatedMonthly * 12;

    return { phaseFactor, estimatedMonthly, estimatedAnnual };
  }, [clientCounts, selectedPhases]);

  const displayRevenue =
    view === "annual" ? estimatedAnnual : estimatedMonthly;

  return (
    <Section size="lg">
      <Container>
        <div className="flex flex-col items-start">
          <SectionHeader
            title="Calculate your potential earnings"
            description="See how much you could earn by switching to ADXC's on-demand model."
            size="md"
            align="left"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start lg:items-stretch">
          {/* Calculator Form */}
          <div className="flex-1 w-full space-y-10 md:space-y-12">
            {/* Phase selection */}
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 md:mb-5">
                Marketing Phases Your Data Supports{" "}
                <span className="text-adxc">(Multi-select)</span>
              </label>

              {/* grid so they can fit in one row on large screens */}
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-3">

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

            {/* Client Tiers Sliders */}
            <div className="pt-2">
              <label className="inline-flex text-xs font-bold text-muted-foreground uppercase tracking-wider mb-6 md:mb-8">
                Number of ADXC Clients by Tier
              </label>

              <div className="space-y-10">
                {clientTiers.map(tier => (
                  <div key={tier.id} className="space-y-4">

                    <div className="flex flex-row items-center justify-between gap-4">


                      <span className="inline-flex text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {tier.label}
                      </span>


                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-adxc tracking-tight tabular-nums">
                        {clientCounts[tier.id].toLocaleString()}
                      </div>
                    </div>

                    <Slider
                      value={[clientCounts[tier.id]]}
                      onValueChange={([v]) => updateClientCount(tier.id, v)}
                      min={tier.min}
                      max={tier.max}
                      step={tier.step}
                    />

                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>{tier.min.toLocaleString()}</span>
                      <span>{tier.max.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="w-full lg:w-[480px] lg:shrink-0 bg-adxc rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
            <div className="relative">
              {/* Header */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">

                <span className="text-primary-foreground/80 text-base sm:text-lg font-medium">
                  Your estimated earnings
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


              <div
                className={[
                  "text-white font-bold tracking-tight leading-none mb-4 tabular-nums whitespace-nowrap transition-all duration-300",
                  sizeClassForBigMoney(displayRevenue),
                ].join(" ")}
              >
                {formatUsdUI(displayRevenue)}
              </div>

              <p className="text-primary-foreground/80 text-sm sm:text-[15px] font-light leading-relaxed">

                Estimated {view} revenue based on selected phases, average ADXC spend per client type,
                and the percentage of queries present in available data.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
