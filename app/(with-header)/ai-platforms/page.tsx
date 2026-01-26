import Workflow from "../brands/_components/workflow";
import { BenefitsSection } from "./_components/benefits-section";
import CapabilityMatrixSection from "./_components/capability-matrix-section";
import { DataAccessSection } from "./_components/data-access-section";
import HeroSection from "./_components/hero-section";
import { SolutionSection } from "./_components/solution-section";

export default function AiPlatformsPage() {
  return (
    <div>
      <HeroSection />
      <DataAccessSection />
      <SolutionSection />
      <CapabilityMatrixSection />
      <Workflow />
      <BenefitsSection />
    </div>
  );
}
