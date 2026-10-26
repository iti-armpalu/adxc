import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { StatCard } from "@/components/cards/stat-card";


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
                <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">

                    <StatCard
                        value="80%"
                        description={
                            <>
                                of businesses already use AI
                                <sup className="ml-0.5 text-[0.65em] align-super">1</sup>
                            </>
                        }
                    />

                    <StatCard
                        value="88%"
                        description={
                            <>
                                plan to increase AI budgets over the next 12 months
                                <sup className="ml-0.5 text-[0.65em] align-super">2</sup>
                            </>
                        }
                    />
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
                    <a
                        href="https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline underline-offset-4"
                    >
                        <span>
                            <sup>1</sup> MIT Nanda AI Report 2025
                        </span>
                    </a>
                    <a
                        href="https://www.pwc.com/us/en/tech-effect/ai-analytics/ai-agent-survey.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline underline-offset-4"
                    >
                        <span>
                            <sup>2</sup> PwC AI Agent Report 2025
                        </span>
                    </a>
                </div>
            </Container>
        </Section>
    );
}
