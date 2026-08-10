import GateForm from "@/components/gate/password-gate";
import adxcLogo from "@/public/adxc-logo-with-tagline.svg";

type GatePageProps = {
  searchParams: Promise<{ next?: string }>;
};

function safeNextPath(input: string | undefined): string {
  const v = typeof input === "string" ? input : "/";
  if (!v.startsWith("/")) return "/";
  if (v.startsWith("//")) return "/"; // block scheme-relative redirect
  if (v.includes("\\")) return "/";   // block odd path tricks
  return v;
}

export default async function GatePage({ searchParams }: GatePageProps) {
  const sp = await searchParams;

  const nextPath = safeNextPath(sp.next);

  return (
    <main className="min-h-[calc(100vh-var(--spacing-header))] flex flex-col items-center justify-center px-2">

      {/* Diagonal glow + grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: "linear-gradient(135deg, transparent 35%, black 65%)",
          WebkitMaskImage: "linear-gradient(135deg, transparent 35%, black 65%)",
        }}
      >
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, var(--color-brand-200) 0%, transparent 70%)",
            opacity: 0.4,
          }}
        />
      </div>


      <div className="mx-auto w-full max-w-lg text-center mb-10">
        {/* Plain <img> per established pattern — fixed SVG asset, not next/image */}
        <img
          src={adxcLogo.src}
          alt="ADXC"
          className="h-12 sm:h-16 md:h-20 w-auto mx-auto mb-8"
        />

        <p className="text-lg sm:text-xl text-foreground-alt leading-relaxed mb-4">
          The Agentic Data Exchange that gives companies access to all the marketing data they need, and only charges for what they use.
        </p>

      </div>

      <div className="w-full flex justify-center">
        <GateForm nextPath={nextPath} />
      </div>
    </main>
  );
}