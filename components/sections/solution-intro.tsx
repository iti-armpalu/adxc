import { cn } from "@/lib/utils";

const EMPHASIS = "font-semibold text-[color-mix(in_oklch,var(--primary)_60%,black)]";

export function SolutionIntro({ className }: { className?: string }) {
    return (
        <section className={cn(className)}>
            <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24">
                <p className="text-caption mb-6 text-muted-foreground">The solution</p>

                {/* The logo is the section heading; plain <img> for SVG per convention */}
                <h2>
                    <img
                        src="/adxc-logo-with-tagline.svg"
                        alt="ADXC, the Agentic Data Exchange"
                        className="mx-auto h-16 w-auto sm:h-20 md:h-24"
                    />
                </h2>

                <p className="mx-auto mt-8 max-w-2xl text-pretty text-xl leading-relaxed text-foreground-alt sm:text-2xl">
                    The data exchange <span className={EMPHASIS}>connecting AI tools</span> to the world&apos;s
                    most trusted <span className={EMPHASIS}>data providers</span>, on a{" "}
                    <span className={EMPHASIS}>pay per answer model</span>
                </p>
            </div>
        </section>
    );
}