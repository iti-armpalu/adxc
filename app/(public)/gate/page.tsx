import type { Metadata } from "next";
import { GateForm } from "@/components/gate/gate-form";

export const metadata: Metadata = {
  title: "Investor Access | ADXC",
  robots: { index: false, follow: false },
};

type GatePageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function GatePage({ searchParams }: GatePageProps) {
  const { next } = await searchParams;

  return (
    <main className="relative isolate flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 py-12">
      {/* Diagonal glow + grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          maskImage: "linear-gradient(135deg, transparent 35%, black 65%)",
          WebkitMaskImage: "linear-gradient(135deg, transparent 35%, black 65%)",
        }}
      >
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute -right-1/4 -top-1/4 size-[800px] rounded-full bg-[radial-gradient(circle,var(--color-brand-200)_0%,transparent_70%)] opacity-40" />
      </div>

      <div className="w-full max-w-lg text-center">
        {/* Plain <img> per established pattern for SVGs */}
        <img
          src="/adxc-logo-with-tagline.svg"
          alt="ADXC"
          className="mx-auto mb-12 h-12 w-auto sm:h-16 md:h-20"
        />
        <p className="text-caption mb-3 text-primary">Investor access</p>
        <p className="mb-10 text-lg leading-relaxed text-foreground-alt sm:text-xl">
          The Agentic Data Exchange that gives companies access to all the marketing data
          they need, and only charges for what they use.
        </p>
      </div>

      <GateForm next={next ?? "/"} />
    </main>
  );
}