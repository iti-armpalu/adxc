'use client';

import { useMemo, useState } from "react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { Slider } from "@/components/ui/slider";

type View = "annual" | "monthly";

const ADXC_NET_REVENUE = 0.34;
const AVG_SHARE_OF_REVENUE = 0.15;

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

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function parseNonNegativeInt(s: string): number {
  const trimmed = s.trim();
  if (!trimmed) return 0;
  const n = Number(trimmed);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.floor(n));
}

export default function CalculatorAgencies() {
  const [clientsUsingAdxc, setClientsUsingAdxc] = useState<number>(10);

  // store raw input string so empty stays empty
  const [avgAnnualDataSpendInput, setAvgAnnualDataSpendInput] = useState<string>("100000");

  const [view, setView] = useState<View>("annual");

  // number derived from string for calculations
  const avgAnnualDataSpendUsd = useMemo(
    () => parseNonNegativeInt(avgAnnualDataSpendInput),
    [avgAnnualDataSpendInput]
  );

  const annualRevenueUsd = useMemo(() => {
    const clients = clamp(clientsUsingAdxc, 0, 100);
    const spend = avgAnnualDataSpendUsd;
    return clients * spend * ADXC_NET_REVENUE * AVG_SHARE_OF_REVENUE;
  }, [clientsUsingAdxc, avgAnnualDataSpendUsd]);

  const displayRevenueUsd = view === "annual" ? annualRevenueUsd : annualRevenueUsd / 12;

  return (
    <Section size="md">
      <Container>
        <div className="flex flex-col items-start">
          <SectionHeader
            title="Calculate your potential revenue"
            description="See how much revenue you could generate with ADXC."
            size="md"
            align="left"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start lg:items-stretch">
          <div className="flex-1 w-full space-y-10 md:space-y-12">
            <div className="pt-2">
              <div className="flex flex-row items-center justify-between gap-4 mb-6 md:mb-8">
                <label className="inline-flex text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Number of clients using ADXC
                </label>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-adxc tracking-tight tabular-nums">
                  {clientsUsingAdxc}
                </div>
              </div>

              <Slider
                value={[clientsUsingAdxc]}
                onValueChange={([v]) => setClientsUsingAdxc(v)}
                min={0}
                max={100}
                step={1}
                className="w-full"
              />

              <div className="flex justify-between text-sm text-muted-foreground mt-4">
                <span>0</span>
                <span>100</span>
              </div>
            </div>

            {/* Average annual data spend input */}
            <div className="pt-2">
              <div className="flex flex-row items-center justify-between gap-4 mb-6 md:mb-8">
                <label className="inline-flex text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Average annual data spend
                </label>

                {/* display uses parsed number */}
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-adxc tracking-tight tabular-nums">
                  {formatUsdUI(avgAnnualDataSpendUsd)}
                </div>
              </div>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={avgAnnualDataSpendInput}
                  onChange={(e) => {
                    // allow empty; otherwise keep digits only (prevents weird chars)
                    const next = e.target.value.replace(/[^\d]/g, "");
                    setAvgAnnualDataSpendInput(next);
                  }}
                  onBlur={() => {
                    // normalize leading zeros ("" stays "")
                    if (avgAnnualDataSpendInput === "") return;
                    setAvgAnnualDataSpendInput(String(parseNonNegativeInt(avgAnnualDataSpendInput)));
                  }}
                  className="w-full rounded-xl border transition-all bg-white px-8 py-3 text-base font-semibold tabular-nums outline-none ring-2 ring-adxc/30 focus:ring-2 focus:ring-adxc/50"
                  aria-label="Average annual data spend in USD"
                />
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="w-full lg:w-[480px] lg:shrink-0 bg-adxc rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
            <div className="relative">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
                <span className="text-primary-foreground/80 text-base sm:text-lg font-medium">
                  Your estimated revenue
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

              <div className="text-xs font-bold uppercase tracking-wider text-primary-foreground/70 mb-3">
                Estimated revenue
              </div>

              <div
                className={[
                  "text-white font-bold tracking-tight leading-none mb-4 tabular-nums whitespace-nowrap transition-all duration-300",
                  sizeClassForBigMoney(displayRevenueUsd),
                ].join(" ")}
              >
                {formatUsdUI(displayRevenueUsd)}
              </div>

              <p className="text-primary-foreground/80 text-sm sm:text-[15px] font-light leading-relaxed">
                Estimated revenue based on clients using ADXC and average annual data spend.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}