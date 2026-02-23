import { HeroSection } from "@/components/hero-section";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import BrandStatsSection from "../(app)/brands/_components/brand-stats-section";
import { ADXCApproachSection } from "@/components/adxc-approach-section";
import CostCalculator from "@/components/cost-calculator";
import { SectionHeader } from "@/components/sections/section-header";
import { StatCard } from "@/components/cards/stat-card";
import FinancialProjectionsSection from "@/components/financial-projections-section";
import CompetitiveAdvantageSection from "@/components/competitive-advantage-section";
import SalesMarketingSection from "@/components/sales-marketing-section";
import TeamSection from "@/components/team-section";
import AdvisorsSection from "@/components/advisors-section";
import { Button } from "@/components/ui/button";
import { CornerDownRight, ExternalLink } from "lucide-react";


export default function HomePage() {
    return (
        <>
            <HeroSection />

            <Section size="md">
                <Container size="md">
                    <BrandStatsSection />
                </Container>
            </Section>

            <Section size="md" className="relative">
                <Container size="md">
                    <SectionHeader
                        title="See how much it costs to buy the data needed at each stage of the marketing workflow"
                        size="sm"
                        align="center"
                    />
                    <CostCalculator />
                    <div className="absolute mt-4 left-4 top-1/4 -translate-y-1/2 max-w-[200px] hidden xl:block">
                        <div className="flex flex-col">
                            <div className="bg-card/80 backdrop-blur-xl border border-adxc rounded-xl px-4 py-3 shadow-md">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    <span className="uppercase text-adxc font-semibold">Click a task</span>
                                    {" "}to see which data providers it uses and the associated costs
                                </p>
                            </div>

                            <CornerDownRight
                                className="mt-3 self-end text-adxc h-6 w-6"
                                aria-hidden="true"
                            />
                        </div>
                    </div>

                </Container>
            </Section>

            <Section size="md">
                <Container size="md">
                    <SectionHeader
                        title="This prices SMEs out and creates a large market opportunity"
                        size="sm"
                        align="center"
                    />

                    {/* Market Reality Stats */}
                    <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">

                        <StatCard
                            value=">99%"
                            description={
                                <>
                                    of businesses are small and medium-sized enterprises
                                </>
                            }
                        />

                        <StatCard
                            value="~$18B"
                            description={
                                <>
                                    untapped market
                                    <span className="block text-xs opacity-50">Estimated annual SME research and data spend (UK + US)</span>
                                </>
                            }
                        />
                    </div>

                </Container>
            </Section>



            <ADXCApproachSection />

            {/* CTA Section */}
            <Section size="md">
                <Container size="lg">
                    <SectionHeader
                        title="Watch our founder's explanation with more details"
                        size="sm"
                        align="center"
                        className="max-w-3xl"
                    />
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="flex-1 w-full aspect-video rounded-xl bg-muted overflow-hidden">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/uhDiez70s30"
                                title="See it in action"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
                            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">See it in action</h2>
                            <p className="text-muted-foreground text-sm max-w-sm">
                                Explore the platform yourself and discover how it can transform workflows
                            </p>
                            <Button size="lg" asChild className={`mt-2 text-base bg-foreground`}>
                                <a
                                    href="https://adxc.netlify.app/login"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Try it yourself
                                </a>
                            </Button>
                            {/* <DemoButtons /> */}
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Financial Projections Section */}
            <FinancialProjectionsSection />

            {/* Competitive Advantage Section */}
            <CompetitiveAdvantageSection />

            {/* Sales & Marketing Section */}
            <SalesMarketingSection />

            {/* Team Section */}
            <TeamSection />

            {/* Advisors Section */}
            <AdvisorsSection />
        </>
    );
}
