import { AlertTriangle, TrendingUp } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";


const HeroSection = () => {
    return (
        <Section size="lg" className="bg-white">
            <Container size="md">
                <SectionHeader
                    title="AI agents are still disappointing customers with output quality, and it’s limiting use"
                    align="center"
                    size="lg"
                />

                {/* Metrics Grid */}
                <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Metric 1 */}
                    <div className="rounded-xl border border bg-white p-8 text-center">
                        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
                            <AlertTriangle className="h-7 w-7 text-amber-600" />
                        </div>

                        <div className="mb-4 text-5xl font-bold leading-none text-amber-600 md:text-6xl">
                            #1
                        </div>

                        <p className="text-lg font-medium">
                            Output quality is the primary barrier to AI adoption in marketing
                            <sup>1</sup>
                        </p>
                    </div>

                    {/* Metric 2 */}
                    <div className="rounded-xl border border bg-white p-8 text-center">
                        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-pink-100">
                            <TrendingUp className="h-7 w-7 text-adxc" />
                        </div>

                        <div className="mb-4 text-5xl font-bold leading-none text-adxc md:text-6xl">
                            5%
                        </div>

                        <p className="text-lg font-medium">
                            of businesses have integrated AI into core workflows<sup>2</sup>
                        </p>
                    </div>
                </div>

                {/* Footnotes */}
                <div className="flex flex-col items-center justify-center gap-4 text-xs text-muted-foreground sm:flex-row sm:gap-8">
                    <span>
                        <sup>1</sup> Jasper AI Marketing Report 2025
                    </span>
                    <span>
                        <sup>2</sup> MIT Nanda AI Report 2025
                    </span>
                </div>
            </Container>
        </Section>
    );
};

export default HeroSection;
