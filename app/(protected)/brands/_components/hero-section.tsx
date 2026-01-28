import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/sections/section-header";


const HeroSection = () => {
  return (
    <Section size="lg" className="bg-white flex items-center">
      <Container size="md">
        <SectionHeader
          title="Cut your data budget in half and get the data that finally makes your agents useful"
          size="lg"
          align="center"
        />
      </Container>
    </Section>
  );
};

export default HeroSection;
