import { HeroSection } from "@/components/hero-section";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import BrandStatsSection from "./brands/_components/brand-stats-section";
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
import VideoDemosSection from "@/components/video-demos-sections";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { MARKET_STATS, SME_STATS } from "@/lib/stats";
import { WorkflowCosts } from "@/components/sections/workflow-costs";
import { FounderVideo } from "@/components/sections/founder-video";
import { FinancialProjections } from "@/components/sections/financial-projections";
import { CompetitiveAdvantage } from "@/components/sections/competitive-advantage";


export default function HomePage() {
    return (
        <>
            <Hero
                title="The Agentic Data Exchange that gives companies access to all the marketing data they need, and only charges for what they use"
                description={
                    <>
                        The <span className="font-medium text-primary">$18B data opportunity</span> unlocked
                        by agents to transform an industry with outdated monetization and pricing
                    </>
                }
            />
            <Stats stats={MARKET_STATS} />

            <WorkflowCosts />

            <Stats
                title="This prices SMEs out and creates a large market opportunity"
                stats={SME_STATS}
            />

            <ADXCApproachSection />

            <FounderVideo />

            <FinancialProjections />

            <CompetitiveAdvantage />

            {/* Sales & Marketing Section */}
            <SalesMarketingSection />

            {/* Team Section */}
            <TeamSection />

            {/* Advisors Section */}
            <AdvisorsSection />

            {/* Video Demos Section */}
            <VideoDemosSection />
        </>
    );
}
