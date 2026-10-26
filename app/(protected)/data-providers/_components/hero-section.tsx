import { StatCard } from "@/components/cards/stat-card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/sections/section-header";

export function HeroSection() {
  return (
    <Section size="lg">
      <Container size="md">
        <SectionHeader
          title="SMEs want your data, but can't access it today"
          size="lg"
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

  );
}
