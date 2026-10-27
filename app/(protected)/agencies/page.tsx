import { DollarSign, PiggyBank, Target } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { Stats, StatsGrid } from "@/components/sections/stats";
import { Problem } from "@/components/sections/problem";
import { HowItWorks, type HowItWorksStep } from "@/components/sections/how-it-works";
import { Benefits, type Benefit } from "@/components/sections/benefits";
import { AI_ADOPTION_STATS, MARKET_STATS } from "@/lib/stats";
import { RevenueCalculator } from "./_components/revenue-calculator";

const steps: HowItWorksStep[] = [
    { title: "AI Request", description: "A marketer asks a question to their AI agent, who queries ADXC." },
    { title: "Orchestration", description: "ADXC's Agentic Orchestrator understands the question context, breaks it into sub-tasks and identifies the most relevant data to answer it." },
    { title: "Abstract Answer", description: "The marketer sees an abstract of the answer and price." },
    { title: "Full Answer", description: "They approve, and ADXC pulls only the relevant data to answer the question." },
];

const benefits: Benefit[] = [
    {
        icon: DollarSign,
        title: "Make money",
        description:
            "Manage your clients' data spend using ADXC, and earn up to 20% of ADXC's net revenue from them.",
    },
    {
        icon: PiggyBank,
        title: "Save money",
        description:
            "Save money on your agency's data budget, shifting from expensive subscriptions to ADXC's pay-per-answer model.",
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
        <>
            <Hero title="Monetise your clients' marketing data usage, and cut your own data budget in half">
                <StatsGrid stats={MARKET_STATS} />
            </Hero>

            <Stats
                title="But businesses need this data more than ever to make their agents useful"
                stats={AI_ADOPTION_STATS}
            />

            <Problem />

            <HowItWorks
                title="ADXC gives you access to all the data you need, while you only pay for what you use"
                description="ADXC is the data exchange connecting premium marketing data providers and SMEs via AI agents, on a pay-per-use model."
                steps={steps}
                highlights={["No long-term contracts", "Access multiple premium datasets", "Spend caps set per task/user"]}
            />

            <Benefits title="Turn a costly expense into a profitable service" benefits={benefits} />

            <RevenueCalculator />
        </>
    );
}