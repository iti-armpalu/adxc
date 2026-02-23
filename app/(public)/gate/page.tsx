import GateForm from "@/components/gate/password-gate";
import { SectionHeader } from "@/components/sections/section-header";

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
    <main className="min-h-[calc(100vh-40px)] flex flex-col items-center justify-center px-2">
      <div className="mx-auto w-full max-w-xl text-center mb-10">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-foreground mb-8">
          ADXC
        </h1>

        <p className="text-xl sm:text-2xl text-foreground/80 leading-relaxed mb-4">
          The Agentic Data Exchange that gives companies access to all the marketing data they need, and only charges for what they use
        </p>

      </div>

      <div className="w-full flex justify-center">
        <GateForm nextPath={nextPath} />
      </div>
    </main>
  );
}
