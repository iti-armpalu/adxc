import { HeroSection } from "@/components/hero-section";
import { ProblemSolutionSection } from "@/components/problem-solution-section";
import { DemoSection } from "@/components/demo/demo-section";
import { AudiencePortalSection } from "@/components/audience-portal-section";

export default function HomePage() {
    return (
        <main className="min-h-full animate-fade-in bg-gradient-main">
            <HeroSection />
            <ProblemSolutionSection />
            <DemoSection />
        </main>
    );
}
