import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { GENERIC_AI_STATS, MARKET_STATS, SME_STATS } from "@/lib/stats";
import { WorkflowCosts } from "@/components/sections/workflow-costs";
import { FounderVideo } from "@/components/sections/founder-video";
import { FinancialProjections } from "@/components/sections/financial-projections";
import { CompetitiveAdvantage } from "@/components/sections/competitive-advantage";
import { SalesMarketing } from "@/components/sections/sales-marketing";
import { Team } from "@/components/sections/team";
import { Advisors } from "@/components/sections/advisors";
import { VideoDemos } from "@/components/sections/video-demos";
import { AdxcApproach } from "@/components/sections/adxc-approach";
import { MarketSize } from "@/components/sections/market-size";


export default function HomePage() {
    return (
        <>
            <Hero
                title="The Agentic Data Exchange that gives companies access to all the marketing data they need, and only charges for what they use"
            />

            <MarketSize />

            <Stats
                title="Right now, generic AI doesn't have the data to give useful and reliable answers"
                stats={GENERIC_AI_STATS}
            />

            <WorkflowCosts />


            <AdxcApproach />

            <FounderVideo />

            <FinancialProjections />

            <CompetitiveAdvantage />

            <SalesMarketing />

            <Team />

            <Advisors />

            <VideoDemos />
        </>
    );
}
