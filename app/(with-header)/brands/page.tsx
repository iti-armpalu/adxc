import CapabilityMatrix from "@/components/capability-matrix";
import HeroSection from "./_components/hero-section";
import ProblemSection from "./_components/problem-section";
import SquaresScatterToCard from "@/components/squares-scatter-to-card";
import Calculator from "./_components/calculator";
import FloatingCTA from "./_components/floating-cta";
import Workflow from "./_components/workflow";


export default function BrandsPage() {
  return (
    <div>

      <HeroSection />
      <CapabilityMatrix />
      <ProblemSection />
      <Workflow />
      <Calculator />

      {/* <FloatingCTA /> */}
    </div>
  );
}
