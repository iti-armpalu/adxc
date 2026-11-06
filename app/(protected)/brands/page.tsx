import { Layers, Sparkles, TrendingDown } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { StatsGrid } from "@/components/sections/stats";
import { MARKET_STATS } from "@/lib/stats";
import { DataCoverage } from "@/components/sections/data-coverage";
import { Problem } from "@/components/sections/problem";
import { HowItWorks, type HowItWorksStep } from "@/components/sections/how-it-works";
import { Benefits, type Benefit } from "@/components/sections/benefits";
import { SavingsCalculator } from "./_components/savings-calculator";

const steps: HowItWorksStep[] = [
  { description: "Connect an AI tool to ADXC & ask a question*" },
  { description: "ADXC clarifies context & searches multiple research providers" },
  { description: "ADXC presents an abstract of the answer, the sources, and price" },
  { description: "Approve, get a synthesised response & only pay for that data" },
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
        className="bg-card"
        title="For SMEs, getting the right data for the right task is prohibitive"
        description="You can't afford multiple providers, or low utilisation - so pick one or none."
      />

      <Problem />

      <HowItWorks
        className="bg-card"
        title="ADXC gives you access to all the data you need, while you only pay for what you use"
        description="ADXC is the data exchange connecting premium marketing data providers and SMEs via AI agents, on a pay-per-use model."
        steps={steps}
        highlights={["No long-term contracts", "Access multiple premium datasets", "Spend caps set per task/user"]}
        footnote="*Requires sign-up + topping up your ADXC wallet"
      />

      <Benefits className="bg-primary-subtle" title="Start paying for answers, not access" benefits={benefits} />

      <SavingsCalculator className="bg-card" />
    </>
  );
}
