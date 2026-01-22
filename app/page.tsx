import { cookies } from "next/headers";

import GateForm from "@/components/gate/gate-form";
import { HeroSection } from "@/components/hero-section";
import SquaresScatterToCard from "@/components/squares-scatter-to-card";
import { AudiencePortalSelector } from "@/components/audience-portal-selector";
import { DemoSection } from "@/components/demo/demo-section";
import { ProblemSolutionSection } from "@/components/problem-solution-section";

const COOKIE_NAME = "site_unlocked";

export default async function HomePage() {
  const cookieStore = await cookies(); // Next 16: async
  const token = cookieStore.get(COOKIE_NAME)?.value;

  // Soft-launch: presence check only (matches your proxy check)
  if (!token) {
    return (
      <main className="min-h-[calc(100vh-40px)] flex flex-col items-center justify-center px-2">
        <div className="mx-auto w-full max-w-xl text-center mb-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-foreground mb-8">
            ADXC
          </h1>

          <p className="text-xl sm:text-2xl text-foreground/80 leading-relaxed mb-4">
            The data exchange connecting AI agents to premium data providers, on a pay-per-query basis
          </p>

          <p className="text-lg text-muted-foreground">
            Making access affordable and agents finally useful.
          </p>
        </div>

        <div className="mt-8 w-full flex justify-center">
          <GateForm nextPath="/" />
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
          <p className="text-muted-foreground text-xs mb-1">
            A password was shared with you. Need access? Contact us.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-full animate-fade-in bg-gradient-main">
      <HeroSection />
      <div className="flex flex-col items-start xl:flex-row">


        <ProblemSolutionSection />
        <SquaresScatterToCard />
      </div>
      <DemoSection />
      <AudiencePortalSelector />
    </main>
  );
}
