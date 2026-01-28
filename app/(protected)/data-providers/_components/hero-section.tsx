import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/sections/section-header";
import { Building2, DollarSign } from "lucide-react";

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Stat 1 */}
          <div className="bg-white rounded-xl border border text-center p-6 md:p-8 hover:border-adxc hover:shadow-lg transition-all duration-300">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center ">
                <Building2 className="w-6 h-6 text-adxc" />
              </div>
            </div>
            <div className="text-4xl md:text-5xl font-bold mb-2">
              {">"}99%
            </div>
            <div className="text-lg text-muted-foreground">of Businesses</div>
            <p className="text-sm text-muted-foreground mt-3">
              are small and medium-sized enterprises
            </p>
          </div>

          {/* Stat 2 */}
          <div className="bg-white rounded-xl border border text-center p-6 md:p-8 hover:border-adxc hover:shadow-lg transition-all duration-300">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-adxc" />
              </div>
            </div>
            <div className="text-4xl md:text-5xl font-bold mb-2">
              ~$18B
            </div>
            <div className="text-lg text-muted-foreground">Untapped Market</div>
            <p className="text-sm text-muted-foreground mt-3">
              Estimated annual SME research and data spend (UK + US)
            </p>
          </div>
        </div>

        {/* Highlight Box */}

        <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-8 md:p-10 relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <h3 className="text-xl lg:text-2xl text-center font-semibold text-balance">
                We Can Unlock This Market for You via Agent-Native Data Delivery
              </h3>
            </div>

            <div className="flex items-center gap-6 lg:gap-8">
              <div className="flex items-center text-center gap-4">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-emerald-600">
                    $4.5M
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Estimated revenue via ADXC for Kantar within 24 months
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>

  );
}
