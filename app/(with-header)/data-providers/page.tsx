import { BenefitsSection } from "@/components/benefits-sections";
import Workflow from "../brands/_components/workflow";
import { AIAgentsSection } from "./_components/ai-agents-section";
import CapabilityMatrixSection from "./_components/capability-matrix-section";
import { HeroSection } from "./_components/hero-section";
import { WhyNowSection } from "./_components/why-now-section";
import Calculator from "../brands/_components/calculator";
import { RevenueSection } from "./_components/revenue-section";



const benefits = [
  {
    title: "Monetisation of previously unreachable SMEs",
    description:
      "Unlock demand from small and mid-sized businesses that were historically too costly to serve.",
    // icon: <UsersIcon className="h-9 w-9" />,
  },
  {
    title: "Repeated monetisation of the same data",
    description:
      "Sell the same dataset across many AI-driven tasks without re-licensing friction.",
    // icon: <RepeatIcon className="h-9 w-9" />,
  },
  {
    title: "Embedded in agent-driven workflows",
    description:
      "Your data is used directly inside AI systems where real decisions are made.",
    // icon: <WorkflowIcon className="h-9 w-9" />,
  },
] as const

export default function ProvidersPage() {
  return (
    <div>
      <HeroSection />
      <WhyNowSection />
      <CapabilityMatrixSection />
      <AIAgentsSection />
      <Workflow />
      {/* <BenefitsSection
        title="This unlocks a new revenue stream for you, without disrupting your core business"
        items={benefits}
      /> */}
      <RevenueSection />
      <Calculator />

    </div>
  );
}
