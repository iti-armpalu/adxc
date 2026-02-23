
import { AIAgentsSection } from "./_components/ai-agents-section";
import { HeroSection } from "./_components/hero-section";
import { WhyNowSection } from "./_components/why-now-section";
import WorkflowSection, { WorkflowStep } from "@/components/sections/workflow-section";
import CalculatorDataProviders from "./_components/calculator-data-providers";
import { MiroSection } from "./_components/miro-section";
import { DataNeedSection } from "./_components/data-need-section";


const steps: WorkflowStep[] = [
  { number: 1, title: "AI Request", description: "AI agents query ADXC when completing tasks inside workflows." },
  { number: 2, title: "Orchestration", description: "ADXC's Agentic Orchestrator understands the question context, breaks it into sub-tasks and identifies the most relevant data to answer it." },
  { number: 3, title: "Abstract Answer", description: "The customer sees an abstract of the answer and price." },
  { number: 4, title: "Full Answer", description: "The user approves and ADXC pulls only the relevant data to answer the question." },
];

export default function ProvidersPage() {
  return (
    <div>
      <HeroSection />
      <WhyNowSection />

      <DataNeedSection />

      <AIAgentsSection />

      <WorkflowSection
        title="ADXC makes premium marketing data usable for AI agents"
        description="ADXC is the data exchange connecting premium data providers and SMEs via AI agents, on a pay-per-use model."
        steps={steps}
        footer="Data is read, not transferred • You make money per use, we take a service fee • High usage customers referred to you"
      />

      <MiroSection />

      <CalculatorDataProviders />
    </div>
  );
}
