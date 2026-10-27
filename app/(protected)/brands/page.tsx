
import { Layers, Sparkles, TrendingDown } from "lucide-react";

import { StatsGrid } from "@/components/sections/stats";
import { MARKET_STATS } from "@/lib/stats";
import { Hero } from "@/components/sections/hero";
import { Problem } from "./_components/problem";
import { DataCoverage } from "@/components/sections/data-coverage";
import { HowItWorks, type HowItWorksStep } from "@/components/sections/how-it-works";
import { Benefits, type Benefit } from "@/components/sections/benefits";
import { SavingsCalculator } from "./_components/savings-calculator";

const steps: HowItWorksStep[] = [
  { title: "AI Request", description: "AI agents query ADXC when completing tasks inside workflows." },
  { title: "Orchestration", description: "ADXC's Agentic Orchestrator understands the question context, breaks it into sub-tasks and identifies the most relevant data to answer it." },
  { title: "Abstract Answer", description: "The customer sees an abstract of the answer and price." },
  { title: "Full Answer", description: "The user approves and ADXC pulls only the relevant data to answer the question." },
];

const benefits: Benefit[] = [
  {
    icon: Sparkles,
    title: "Higher-quality AI outputs",
    description: "AI agents generate materially better results when powered by trusted, premium data sources.",
  },
  {
    icon: Layers,
    title: "Multi-source data access",
    description: "AI agents can access and combine insights from multiple premium data providers in a single workflow.",
  },
  {
    icon: TrendingDown,
    title: "Lower spend, higher utilisation",
    description: "Lower cost per insight, and no wasted spend on data you don't need.",
  },
];

export default function BrandsPage() {
  return (
    <>
      <Hero title="Cut your marketing data budget in half and get the data that finally makes your agents useful">
        <StatsGrid stats={MARKET_STATS} />
      </Hero>


      <DataCoverage
        className="bg-primary-subtle"
        title="For SMEs, getting the right data for the right task is prohibitive"
        description="You can't afford multiple providers, or low utilisation - so pick one or none."
      />

      <Problem />

      <HowItWorks
        title="ADXC gives you access to all the data you need, while you only pay for what you use"
        description="ADXC is the data exchange connecting premium marketing data providers and SMEs via AI agents, on a pay-per-use model."
        steps={steps}
        highlights={["No long-term contracts", "Access multiple premium datasets", "Spend caps set per task/user"]}
      />

      <Benefits title="Start paying for answers, not access" benefits={benefits} />

      <SavingsCalculator />
    </>
  );
}
