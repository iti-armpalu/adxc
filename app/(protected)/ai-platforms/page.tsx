import { Award, Shield, Target } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { Stats, StatsGrid } from "@/components/sections/stats";
import { DataCoverage } from "@/components/sections/data-coverage";
import { HowItWorks, type HowItWorksStep } from "@/components/sections/how-it-works";
import { Benefits, type Benefit } from "@/components/sections/benefits";
import { AI_PLATFORM_STATS, DATA_ACCESS_STATS } from "@/lib/stats";

const steps: HowItWorksStep[] = [
  { title: "Agent Connection", description: "Customer connects ADXC to their chosen AI agent (e.g. Miro)." },
  { title: "AI Request", description: "AI agents query ADXC when completing tasks inside workflows." },
  { title: "Orchestration", description: "ADXC's Agentic Orchestrator understands the question context, breaks it into sub-tasks and identifies the most relevant data to answer it." },
  { title: "Abstract Answer", description: "The customer sees an abstract of the answer and price." },
  { title: "Full Answer", description: "The user approves and ADXC pulls only the relevant data to answer the question." },
];

const benefits: Benefit[] = [
  {
    icon: Target,
    title: "Dramatically better outputs",
    description: "AI agents deliver materially better results when powered by trusted, premium data.",
  },
  {
    icon: Shield,
    title: "Keep users in-platform",
    description:
      "Access to the data they need inside workflows stops users from going elsewhere to complete tasks.",
  },
  {
    icon: Award,
    title: "Product differentiation",
    description:
      "Access to premium data creates differentiation vs blunt outputs from generic co-pilots.",
  },
];

export default function AiPlatformsPage() {
  return (
    <>
      <Hero title="AI agents are still disappointing customers with output quality, and it's limiting use">
        <StatsGrid stats={AI_PLATFORM_STATS} />
      </Hero>

      <Stats
        title="The issue is agents don't have the necessary data. For most marketers, it's out of reach"
        stats={DATA_ACCESS_STATS}
      />

      <DataCoverage
        title="Marketers need diverse data from a range of providers for Agents to be useful end-to-end"
        description="Most can't afford multiple subscriptions, and most data sources aren't Agent-accessible."
      />

      <HowItWorks
        title="ADXC makes premium data usable for AI agents"
        description="ADXC is the data exchange connecting premium data providers and SMEs via AI agents, on a pay-per-use model."
        steps={steps}
        highlights={[
          "Data is read, not transferred",
          "You make money per use, we take a service fee",
          "High usage customers referred to you",
        ]}
      />

      <Benefits title="Make your agents more valuable, trusted and differentiated" benefits={benefits} />
    </>
  );
}