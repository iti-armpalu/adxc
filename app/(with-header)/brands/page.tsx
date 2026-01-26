
import HeroSection from "./_components/hero-section";
import ProblemSection from "./_components/problem-section";
import Calculator from "./_components/calculator";
import FloatingCTA from "./_components/floating-cta";
import Workflow from "./_components/workflow";
import StatsSection from "./_components/stats-section";
import CapabilityMatrixSection from "./_components/capability-matrix-section";
import { BenefitsSection } from "./_components/benefits-section";

const benefits = [
  {
    title: "Better AI Outputs",
    description: "Access to the right data at the right time",
    // icon: <ShieldCheckIcon className="h-9 w-9" />,
  },
  {
    title: "Lower Spend",
    description: "Pay only for what you use",
    // icon: <DollarSignIcon className="h-9 w-9" />,
  },
  {
    title: "Higher Utilisation",
    description: "100% of data is used effectively",
    // icon: <TrendUpIcon className="h-9 w-9" />,
  },
] as const

export default function BrandsPage() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <CapabilityMatrixSection />
      <ProblemSection />
      <Workflow />
      <BenefitsSection />

      <Calculator />

      {/* <FloatingCTA /> */}
    </div>
  );
}
