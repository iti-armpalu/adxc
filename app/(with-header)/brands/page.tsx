
import HeroSection from "./_components/hero-section";
import ProblemSection from "./_components/problem-section";
import Calculator from "./_components/calculator";
import FloatingCTA from "./_components/floating-cta";
import Workflow from "./_components/workflow";
import StatsSection from "./_components/stats-section";
import CapabilityMatrixSection from "./_components/capability-matrix-section";
import { BenefitsSection } from "./_components/benefits-section";

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
