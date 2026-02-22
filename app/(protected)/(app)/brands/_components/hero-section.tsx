import { StatCard } from "@/components/cards/stat-card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/sections/section-header";
import BrandStatsSection from "./brand-stats-section";


const HeroSection = () => {
  return (
    <Section size="md" className="bg-white flex items-center">
      <Container size="md">
        <SectionHeader
          title="Cut your marketing data budget in half and get the data that finally makes your agents useful"
          size="lg"
          align="center"
        />
        <BrandStatsSection />
      </Container>
    </Section>
  );
};

export default HeroSection;
