
import HeroSection from "./_components/hero-section";
import ProblemSection from "./_components/problem-section";
import CapabilityMatrixSection from "@/components/sections/capability-matrix-section";
import WorkflowSection, { WorkflowStep } from "@/components/sections/workflow-section";
import { Layers, Sparkles, TrendingDown } from "lucide-react";

import { BenefitFeature, BenefitsSection } from "@/components/sections/benefits-section";
import CalculatorBrands from "./_components/calculator-brands";

const steps: WorkflowStep[] = [
  { number: 1, title: "AI Request", description: "AI agents query ADXC when completing tasks inside workflows." },
  { number: 2, title: "Orchestration", description: "ADXC's Agentic Orchestrator understands the question context, breaks it into sub-tasks and identifies the most relevant data to answer it." },
  { number: 3, title: "Abstract Answer", description: "The customer sees an abstract of the answer and price." },
  { number: 4, title: "Full Answer", description: "The user approves and ADXC pulls only the relevant data to answer the question." },
];

const features: BenefitFeature[] = [
  {
    icon: Sparkles,
    title: "Higher-Quality AI Outputs",
    description:
      "AI agents generate materially better results when powered by trusted, premium data sources.",
  },
  {
    icon: Layers,
    title: "Multi-Source Data Access",
    description:
      "AI agents can access and combine insights from multiple premium data providers in a single workflow.",
  },
  {
    icon: TrendingDown,
    title: "Lower Spend, Higher Utilisation",
    description:
      "Lower cost per insight, and no wasted spend on data you don't need.",
  },
];

export default function BrandsPage() {
  return (
    <div>
      <HeroSection />
      <CapabilityMatrixSection
        title="For SMEs, getting the right data for the right task is prohibitive"
        description="You can't afford multiple providers, or low utilisation - so pick one or none."
      />
      <ProblemSection />

      <WorkflowSection
        title="ADXC gives you access to all the data you need, while you only pay for what you use"
        description="ADXC is the data exchange connecting premium data providers and SMEs via AI agents, on a pay-per-use model."
        steps={steps}
        footer="No long-term contracts • Access multiple premium datasets • Spend caps set per task/user"
      />

      <BenefitsSection
        title="Start paying for answers, not access"
        features={features}
      />

      <CalculatorBrands />
    </div>
  );
}
