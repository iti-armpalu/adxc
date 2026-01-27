
import { AIAgentsSection } from "./_components/ai-agents-section";
import { HeroSection } from "./_components/hero-section";
import { WhyNowSection } from "./_components/why-now-section";
import CapabilityMatrixSection from "@/components/sections/capability-matrix-section";
import WorkflowSection, { WorkflowStep } from "@/components/sections/workflow-section";
import { BenefitFeature, BenefitsSection } from "@/components/sections/benefits-section";
import { DollarSign, RefreshCw, Workflow } from "lucide-react";
import CalculatorDataProviders from "./_components/calculator-data-providers";

const steps: WorkflowStep[] = [
  { number: 1, title: "AI Request", description: "AI agents query ADXC when completing tasks inside workflows." },
  { number: 2, title: "Orchestration", description: "ADXC's Agentic Orchestrator understands the question context, breaks it into sub-tasks and identifies the most relevant data to answer it." },
  { number: 3, title: "Abstract Answer", description: "The customer sees an abstract of the answer and price." },
  { number: 4, title: "Full Answer", description: "The user approves and ADXC pulls only the relevant data to answer the question." },
];

const features: BenefitFeature[] = [
  {
    icon: DollarSign,
    title: "Access to the SME Market",
    description:
      "Enable monetisation of SME customers that were previously out of reach.",
  },
  {
    icon: RefreshCw,
    title: "Repeated Monetisation",
    description:
      "Monetise the same data repeatedly across multiple agent-driven use cases.",
  },
  {
    icon: Workflow,
    title: "Where Decisions are Made",
    description:
      "Presence inside agent-driven workflows where decisions are made.",
  },
];

export default function ProvidersPage() {
  return (
    <div>
      <HeroSection />
      <WhyNowSection />
      <CapabilityMatrixSection
        title="SMEs need diverse data from a range of providers, making full license prohibitve"
        description="They can't afford multiple providers, or low utilisation - so pick one or none."
      />
      <AIAgentsSection />

      <WorkflowSection
        title="ADXC makes premium data usable for AI agents"
        description="ADXC is the data exchange connecting premium data providers and SMEs via AI agents, on a pay-per-use model."
        steps={steps}
        footer="Data is read, not transferred • You make money per use, we take a service fee • High usage customers referred to you"
      />

      <BenefitsSection
        title="This unlocks a new revenue stream for you, without disrupting your core business"
        features={features}
      />
      <CalculatorDataProviders />
    </div>
  );
}
