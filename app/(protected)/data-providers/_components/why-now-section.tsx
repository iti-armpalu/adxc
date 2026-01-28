import { Section } from "@/components/layout/section";
import { StatCard } from "./stat-card";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";


export function WhyNowSection() {
    return (
        <Section size="md" className="bg-white flex items-center">
            <Container size="md">
                <SectionHeader
                    title="Why this matters now"
                    size="md"
                    align="center"
                />

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {/* Metric 1 */}
                    <div className="bg-white rounded-xl border border p-8 text-center">
                        <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-adxc mb-4">
                            80%
                        </p>
                        <p className="text-muted-foreground text-lg">
                            of businesses already use AI<sup>1</sup>
                        </p>
                    </div>

                    {/* Metric 2 */}
                    <div className="bg-white rounded-xl border border p-8 text-center">
                        <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-adxc mb-4">
                            88%
                        </p>
                        <p className="text-muted-foreground text-lg">
                            plan to increase AI budgets over the next 12 months<sup>2</sup>
                        </p>
                    </div>
                </div>

                {/* Bottom Statement */}
                <div className="mb-8 bg-adxc rounded-xl p-8 md:p-10 text-center">
                    <p className="text-white text-lg md:text-2xl lg:text-3xl leading-relaxed mx-auto">
                        <span className="block mt-2 font-semibold">
                            SMEs don’t have the data to fuel these agents. You do.
                        </span>
                    </p>
                </div>

                {/* Footnotes */}
                <div className="flex flex-col items-center justify-center gap-4 text-xs text-muted-foreground sm:flex-row sm:gap-8">
                    <span>
                        <sup>1</sup> MIT Nanda AI Report 2025
                    </span>
                    <span>
                        <sup>2</sup> PwC AI Agent Report 2025
                    </span>
                </div>
            </Container>
        </Section>
    );
}
