
import WorkflowSection, { WorkflowStep } from "@/components/sections/workflow-section";
import { DollarSign, PiggyBank, Target, TrendingDown } from "lucide-react";

import { BenefitFeature, BenefitsSection } from "@/components/sections/benefits-section";
import HeroSection from "./_components/hero-section";
import ProblemSection from "../brands/_components/problem-section";
import { StatCard } from "@/components/cards/stat-card";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import CalculatorAgencies from "./_components/calculator-agencies";

const steps: WorkflowStep[] = [
    { number: 1, title: "AI Request", description: "A marketer asks a question to their AI agent, who queries ADXC." },
    { number: 2, title: "Orchestration", description: "ADXC's Agentic Orchestrator understands the question context, breaks it into sub-tasks and identifies the most relevant data to answer it." },
    { number: 3, title: "Abstract Answer", description: "The marketer sees an abstract of the answer and price." },
    { number: 4, title: "Full Answer", description: "They approve, and ADXC pulls only the relevant data to answer the question." },
];

const features: BenefitFeature[] = [
    {
        icon: DollarSign,
        title: "Make money",
        description:
            "Manage your clients’ data spend using ADXC, and earn up to 20% of ADXC’s net revenue from them.",
    },
    {
        icon: PiggyBank,
        title: "Save money",
        description:
            "Save money on your agency’s data budget, shifting from expensive subscriptions to ADXC’s pay-per-answer model.",
    },
    {
        icon: Target,
        title: "Better outputs",
        description:
            "Start getting the exact data you need, with access to multiple premium data providers.",
    },
];

export default function AgenciesPage() {
    return (
        <div>
            <HeroSection />

            <Section size="lg">
                <Container size="md">
                    <SectionHeader
                        title="But businesses need this data more than ever to make their agents useful"
                        size="md"
                        align="center"
                    />

                    <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">

                        <StatCard
                            value="#1"
                            description={
                                <>
                                    Output quality is the no. 1 barrier to AI adoption in marketing
                                    <sup className="ml-0.5 text-[0.65em] align-super">1</sup>
                                </>
                            }
                        />

                        <StatCard
                            value="#2"
                            description={
                                <>
                                    Lack of necessary data is the no. 2 concern using AI tools for marketers
                                    <sup className="ml-0.5 text-[0.65em] align-super">2</sup>
                                </>
                            }
                        />
                    </div>
                    {/* Footnotes */}
                    <div className="flex flex-col items-center justify-center gap-4 text-xs text-muted-foreground sm:flex-row sm:gap-8">
                        <a
                            href="https://www.jasper.ai/blog/2025-ai-marketing-trends-insights-report"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline underline-offset-4"
                        >
                            <span>
                                <sup>1</sup> Jasper AI Marketing Report 2025
                            </span>
                        </a>
                        <a
                            href="https://www.salesforce.com/content/dam/web/en_us/www/documents/marketingcloud/S-MC-State-of-Marketing-Report-9th-Edition.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline underline-offset-4"
                        >
                            <span>
                                <sup>2</sup> Salesforce State of Marketing Report 2025
                            </span>
                        </a>
                    </div>

                </Container>
            </Section>

            <ProblemSection />

            <WorkflowSection
                title="ADXC gives you access to all the data you need, while you only pay for what you use"
                description="ADXC is the data exchange connecting premium marketing data providers and SMEs via AI agents, on a pay-per-use model."
                steps={steps}
                footer="No long-term contracts • Access multiple premium datasets • Spend caps set per task/user"
            />

            <BenefitsSection
                title="Turn a costly expense into a profitable service"
                features={features}
            />

            <CalculatorAgencies />
        </div>
    );
}
