import { Ban, DollarSign, PoundSterling } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";

export function DataAccessSection() {
    return (
        <Section size="md" className="bg-white">
            <Container size="md">
                <SectionHeader
                    title="The issue is agents don’t have the necessary data. For most marketers, it’s out of reach"
                    align="center"
                    size="md"
                />

                {/* Metrics Grid */}
                <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Metric 1 */}
                    <div className="rounded-xl border border bg-white p-8 text-center">
                        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
                            <Ban className="h-7 w-7 text-amber-600" />
                        </div>

                        <div className="mb-4 text-5xl font-bold leading-none text-amber-600 md:text-6xl">
                            #2
                        </div>

                        <p className="text-lg font-medium">
                            Lack of access to relevant data is the second-largest barrier to AI tool adoption among marketers
                            <sup>2</sup>
                        </p>
                    </div>

                    {/* Metric 2 */}
                    <div className="rounded-xl border border bg-white p-8 text-center">
                        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-pink-100">
                            <DollarSign className="h-7 w-7 text-adxc" />
                        </div>

                        <div className="mb-4 text-5xl font-bold leading-none text-adxc md:text-6xl">
                            $200k+
                        </div>

                        <p className="text-lg font-medium">
                            Typical entry-level cost to access premium data providers (e.g. GWI, Kantar, Nielsen)
                            <sup></sup>
                        </p>
                    </div>
                </div>

                {/* Footnotes */}
                <div className="flex flex-col items-center justify-center gap-4 text-xs text-muted-foreground sm:flex-row sm:gap-8">
                    <span>
                        <sup>1</sup> Jasper AI Marketing Report 2025
                    </span>
                    <span>
                        <sup>2</sup> Salesforce State of Marketing Report 2025
                    </span>
                </div>
            </Container>
        </Section>
    );
}
