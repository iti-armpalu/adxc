import { cookies } from "next/headers";

import GateForm from "@/components/gate/gate-form";
import { HeroSection } from "@/components/hero-section";

const COOKIE_NAME = "site_unlocked";

export default async function HomePage() {
  const cookieStore = await cookies(); // Next 16: async
  const token = cookieStore.get(COOKIE_NAME)?.value;

  // Soft-launch: presence check only (matches your proxy check)
  if (!token) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <div className="mx-auto w-full max-w-xl text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8">
            Protected Access
          </p>
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
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <HeroSection />
    </div>
  );
}
