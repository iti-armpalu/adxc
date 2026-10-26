import { ChevronDown } from "lucide-react";
import { GridGlow } from "@/components/decor/grid-glow";

export function Hero() {
    return (
        <section className="relative isolate flex min-h-[calc(100dvh-var(--header-h))] items-center overflow-hidden">
            <GridGlow />

            <div className="mx-auto w-full max-w-7xl px-4 py-16 text-center sm:px-6">
                <h1 className="mx-auto max-w-5xl text-balance text-3xl leading-tight sm:text-4xl">
                    The Agentic Data Exchange that gives companies access to all the marketing data they
                    need, and only charges for what they use
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-foreground-alt sm:text-xl">
                    The <span className="font-medium text-primary">$18B data opportunity</span> unlocked by
                    agents to transform an industry with outdated monetization and pricing
                </p>
            </div>

            <ChevronDown
                aria-hidden
                className="absolute bottom-6 left-1/2 size-6 -translate-x-1/2 text-muted-foreground motion-safe:animate-bounce"
            />
        </section>
    );
}