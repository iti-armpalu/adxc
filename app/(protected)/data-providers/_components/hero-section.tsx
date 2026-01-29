import { StatCard } from "@/components/cards/stat-card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/sections/section-header";

export function HeroSection() {
  return (
    <Section size="md">
      <Container size="md">
        <SectionHeader
          title=" SMEs want your data, but can't access it today"
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
                <p className="text-xs opacity-50">Estimated annual SME research and data spend (UK + US)</p>
              </>
            }
          />
        </div>

        {/* Highlight Box */}
        <div className="bg-white shadow-sm rounded-xl border border-stone-200 p-6 md:p-8 relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-stone-50 pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <h3 className="text-xl lg:text-2xl text-center font-semibold text-balance">
                We can unlock this market for you via agent-native data delivery
              </h3>
            </div>

            <div className="flex flex-col items-center text-center">
              {/* <div className="flex items-center text-center gap-4"> */}
              <div className="mb-4 text-5xl font-bold text-adxc sm:text-6xl md:text-7xl">
                $4.5M
              </div>
              <div className="text-sm leading-relaxed text-stone-500 sm:text-base">
                Estimated revenue via ADXC for Kantar within 24 months
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </Container>
    </Section>

  );
}
