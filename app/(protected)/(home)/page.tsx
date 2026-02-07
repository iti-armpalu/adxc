import { HeroSection } from "@/components/hero-section";
import { ProblemSolutionSection } from "@/components/problem-solution-section";
import { DemoSection } from "@/components/demo/demo-section";

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <ProblemSolutionSection />
            <DemoSection />
        </>
    );
}
