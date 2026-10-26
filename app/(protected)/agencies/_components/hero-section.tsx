import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/sections/section-header";
import BrandStatsSection from "../../brands/_components/brand-stats-section";



const HeroSection = () => {
  return (
    <Section size="md" className="flex items-center">
      <Container size="md">
        <SectionHeader
          title="Monetise your clients’ marketing data usage, and cut your own data budget in half"
          size="lg"
          align="center"
        />
        <BrandStatsSection />
      </Container>
    </Section>
  );
};

export default HeroSection;
