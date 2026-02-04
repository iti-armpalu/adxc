'use client';

import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Check } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";

type PhaseId = "strategy" | "creative" | "media" | "execution" | "optimisation";
type view = "annual" | "monthly";
type TierId = "micro" | "small" | "medium";

const PROVIDER_PAYOUT_PER_QUERY_USD = 6;
const USEFUL_DATA_FACTOR = 0.75;

const phases = [
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
    max: 50000,
    defaultValue: 500,
    step: 100,
    activeUsersPerClient: 2,
    avgQueriesPerUserPerMonth: 5,
  },
  {
    id: "small",
    label: "Small clients",
    min: 0,
    max: 10000,
    defaultValue: 50,
    step: 10,
    activeUsersPerClient: 8,
    avgQueriesPerUserPerMonth: 10,
  },
  {
    id: "medium",
    label: "Medium clients",
    min: 0,
    max: 1000,
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

const formatUsd = (n: number) =>
  n.toLocaleString(undefined, { maximumFractionDigits: 0 });

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
    const phaseFactor = phases.reduce((sum, p) => {
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
    const grossPayout = expectedMonthlyQueries * PROVIDER_PAYOUT_PER_QUERY_USD;
    const usablePayout = grossPayout * USEFUL_DATA_FACTOR;

    // 4) apply phase factor (your definition)
    const estimatedMonthly = usablePayout * phaseFactor;
    const estimatedAnnual = estimatedMonthly * 12;

    return { phaseFactor, estimatedMonthly, estimatedAnnual };
  }, [clientCounts, selectedPhases]);

  const displayRevenue =
    view === "annual" ? estimatedAnnual : estimatedMonthly;

  const isLargeNumber = displayRevenue >= 10_000_000;


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

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Calculator Form */}
          <div className="flex-1 space-y-12">
            {/* Phases */}
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-5">
                Marketing Phases Your Data Supports <span className="text-pink-600">(Multi-select)</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {phases.map(phase => {
                  const isOn = selectedPhases[phase.id];
                  return (
                    <button
                      key={phase.id}
                      type="button"
                      onClick={() => togglePhase(phase.id)}
                      className={[
                        "w-full px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                        isOn
                          ? "bg-adxc text-primary-foreground shadow-md"
                          : "bg-card border border-border text-muted-foreground hover:border-primary/50",
                      ].join(" ")}
                    >
                      {phase.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Client Tiers Sliders */}
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-8">
                Number of Clients by Tier
              </label>

              <div className="space-y-10">
                {clientTiers.map(tier => (
                  <div key={tier.id} className="space-y-4">
                    <div className="flex items-end justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-foreground">
                          {tier.label}
                        </span>
                      </div>

                      <div className="text-2xl font-bold text-adxc tabular-nums">
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

          {/* Revenue Results Card */}
          <div className="lg:w-[496px] bg-adxc rounded-[32px] p-10 shadow-2xl relative overflow-hidden">

            <div className="relative">
              <div className="flex items-center justify-between mb-20">
                <span className="text-primary-foreground/90 text-lg font-medium">
                  Your estimated earnings
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


              <div
                className={[
                  "text-primary-foreground font-bold tracking-tight leading-none mb-4 transition-all",
                  isLargeNumber
                    ? "text-[56px] md:text-[64px]"
                    : "text-[68px] md:text-[76px]",
                ].join(" ")}
              >
                ${formatUsd(displayRevenue)}
              </div>

              <p className="text-primary-foreground/70 text-sm font-light leading-relaxed mb-12">
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
