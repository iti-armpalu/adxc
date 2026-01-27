import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";


const StatsSection = () => {
  return (
    <Section size="md">
      <Container size="md">
        <SectionHeader
          title="Data is expensive, and chronically underutilised"
          size="md"
          align="center"
        />

        <div className="flex flex-col gap-12 md:flex-row md:justify-center">
          {/* Stat 1 */}
          <div className="flex-1 rounded-2xl border border-gray-100 bg-gray-50 p-10 text-center">
            <div className="mb-4 text-[60px] font-bold leading-none text-[#66023c]">
              $200k+
            </div>
            <div className="mb-2 text-lg font-semibold text-gray-900">
              Entry level price to access
            </div>
            <div className="text-sm text-gray-500">
              GWI + Kantar + Nielsen
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex-1 rounded-2xl border border-gray-100 bg-gray-50 p-10 text-center">
            <div className="mb-4 text-[60px] font-bold leading-none text-[#66023c]">
              73%
            </div>
            <div className="mb-2 text-lg font-semibold text-gray-900">
              All data within businesses goes unused
            </div>
            <a
              href="#"
              className="text-sm text-pink-600 underline decoration-pink-300"
            >
              (Forrester)
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default StatsSection;
