import GateForm from "@/components/gate/password-gate";

type GatePageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function GatePage({ searchParams }: GatePageProps) {
  const sp = await searchParams;

  const nextRaw = typeof sp.next === "string" ? sp.next : "/";
  const nextPath = nextRaw.startsWith("/") ? nextRaw : "/";

  return (
    <main className="min-h-[calc(100vh-40px)] flex flex-col items-center justify-center px-2">
      <div className="mx-auto w-full max-w-xl text-center mb-10">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-foreground mb-8">
          ADXC
        </h1>

        <p className="text-xl sm:text-2xl text-foreground/80 leading-relaxed mb-4">
          The data exchange connecting AI agents to premium data providers, on a pay-per-query basis; making access affordable and agents finally useful.
        </p>
      </div>

      <div className="w-full flex justify-center">
        <GateForm nextPath={nextPath} />
      </div>
    </main>
  );
}
