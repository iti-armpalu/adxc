import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { GENERIC_AI_STATS, WHY_STATS } from "@/lib/stats";
import { WorkflowCosts } from "@/components/sections/workflow-costs";
import { FinancialProjections } from "@/components/sections/financial-projections";
import { CompetitiveAdvantage } from "@/components/sections/competitive-advantage";
import { SalesMarketing } from "@/components/sections/sales-marketing";
import { Team } from "@/components/sections/team";
import { Advisors } from "@/components/sections/advisors";
import { VideoDemos } from "@/components/sections/video-demos";
import { AdxcApproach } from "@/components/sections/adxc-approach";
import { MarketSize } from "@/components/sections/market-size";
import { SolutionIntro } from "@/components/sections/solution-intro";
import { StakeholderBenefits } from "@/components/sections/stakeholder-benefits";
import { Traction } from "@/components/sections/traction";
import { MiroDemo } from "@/components/sections/miro-demo";


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

            <Stats
                className="bg-card"
                layout="list"
                title="Why? The data sits behind subscriptions most businesses can't afford"
                stats={WHY_STATS}
            />

            <WorkflowCosts />

            <SolutionIntro className="bg-primary-subtle" />

            <AdxcApproach />

            <MiroDemo className="bg-primary-subtle" />

            <StakeholderBenefits className="bg-card" />

            <FinancialProjections />

            <CompetitiveAdvantage className="bg-card" />

            <SalesMarketing />

            <Traction className="bg-primary-subtle" />

            <Team />

            <Advisors />

            <VideoDemos />
        </>
    );
}
