import { Hero } from "@/components/sections/hero";
import { Stats, StatsGrid } from "@/components/sections/stats";
import { HowItWorks, type HowItWorksStep } from "@/components/sections/how-it-works";
import { SME_STATS, WHY_NOW_STATS } from "@/lib/stats";
import { DataNeed } from "./_components/data-need";
import { StructuralShift } from "./_components/structural-shift";
import { MiroLaunch } from "./_components/miro-launch";
import { EarningsCalculator } from "./_components/earnings-calculator";

const steps: HowItWorksStep[] = [
  { title: "AI Request", description: "AI agents query ADXC when completing tasks inside workflows." },
  { title: "Orchestration", description: "ADXC's Agentic Orchestrator understands the question context, breaks it into sub-tasks and identifies the most relevant data to answer it." },
  { title: "Abstract Answer", description: "The customer sees an abstract of the answer and price." },
  { title: "Full Answer", description: "The user approves and ADXC pulls only the relevant data to answer the question." },
];

export default function DataProvidersPage() {
  return (
    <>
      <Hero title="SMEs want your data, but can't access it today">
        <StatsGrid stats={SME_STATS} />
      </Hero>

      <Stats title="Why this matters now" stats={WHY_NOW_STATS}>
        <p className="mx-auto max-w-3xl text-balance text-center text-2xl font-semibold text-heading sm:text-3xl">
          SMEs don&apos;t have the data to fuel these agents. You do.
        </p>
      </Stats>

      <DataNeed />
      <StructuralShift />

      <HowItWorks
        title="ADXC makes premium marketing data usable for AI agents"
        description="ADXC is the data exchange connecting premium data providers and SMEs via AI agents, on a pay-per-use model."
        steps={steps}
        highlights={[
          "Data is read, not transferred",
          "You make money per use, we take a service fee",
          "High usage customers referred to you",
        ]}
      />

      <MiroLaunch />
      <EarningsCalculator />
    </>
  );
}