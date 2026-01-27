

import WorkflowSection, { WorkflowStep } from "@/components/sections/workflow-section";
import { DataAccessSection } from "./_components/data-access-section";
import HeroSection from "./_components/hero-section";
import { SolutionSection } from "./_components/solution-section";
import { Award, Shield, Target } from "lucide-react";
import { BenefitFeature, BenefitsSection } from "@/components/sections/benefits-section";
import CapabilityMatrixSection from "@/components/sections/capability-matrix-section";

const steps: WorkflowStep[] = [
  { number: 1, title: "Agent Connection", description: "Customer connects ADXC to their chosen AI agent (e.g. Miro)" },
  { number: 2, title: "AI Request", description: "AI agents query ADXC when completing tasks inside workflows." },
  { number: 3, title: "Orchestration", description: "ADXC's Agentic Orchestrator understands the question context, breaks it into sub-tasks and identifies the most relevant data to answer it." },
  { number: 4, title: "Abstract Answer", description: "The customer sees an abstract of the answer and price." },
  { number: 5, title: "Full Answer", description: "The user approves and ADXC pulls only the relevant data to answer the question." },
];

const features: BenefitFeature[] = [
  {
    icon: Target,
    title: "Dramatically Better Outputs",
    description:
      "AI agents deliver materially better results when powered by trusted, premium data.",
  },
  {
    icon: Shield,
    title: "Keep Users In-platform",
    description:
      "Access to the data they need inside workflows stops users from going elsewhere to complete tasks.",
  },
  {
    icon: Award,
    title: "Product Differentiation",
    description:
      "Access to premium data creates differentiation vs blunt outputs from generic co-pilots..",
  },
];

export default function AiPlatformsPage() {
  return (
    <div>
      <HeroSection />
      <DataAccessSection />
      <SolutionSection />

      <CapabilityMatrixSection
        title="Marketers need diverse data from a range of providers for Agents to be useful end-to-end"
        description="Most can’t afford multiple subscriptions, and most data sources aren’t Agent-accessible."
      />

      <WorkflowSection
        title="ADXC makes premium data usable for AI agents"
        description="ADXC is the data exchange connecting premium data providers and SMEs via AI agents, on a pay-per-use model."
        steps={steps}
        footer="Data is read, not transferred • You make money per use, we take a service fee • High usage customers referred to you"
      />
      <BenefitsSection
        title="Make your agents more valuable, trusted and differentiated"
        features={features}
      />
    </div>
  );
}
