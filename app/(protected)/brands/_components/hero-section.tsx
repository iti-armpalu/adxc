import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/sections/section-header";


const HeroSection = () => {
  return (
    <Section size="lg" className="bg-white min-h-dvh flex items-center">
      <Container size="md">
        <SectionHeader
          title="Cut your data budget in half and get the data that finally makes your agents useful"
          size="lg"
          align="center" // explicit, even though it's default
        />

        <div className="mt-10 flex justify-center">
          <button
            className="rounded-xl bg-adxc px-8 py-4 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-[#7a0348]"
          >
            Calculate your savings
          </button>
        </div>
      </Container>
    </Section>
  );
};

export default HeroSection;
