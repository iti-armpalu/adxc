import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { StatCard } from "@/components/cards/stat-card";


const StatsSection = () => {
  return (
    <Section size="sm">
      <Container size="md" className="-mt-48">
        {/* <SectionHeader
          title="Data is expensive, and chronically underutilised"
          size="md"
          align="center"
        /> */}

        {/* Highlight Box */}
        <div className="mb-12 bg-white shadow-sm rounded-xl border border-stone-200 p-6 md:p-8 relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-stone-50 pointer-events-none" />

          <div className="relative z-10 flex flex-col">
            {/* <div className="flex items-center gap-4"> */}
              <h3 className="text-xl font-bold text-center sm:text-3xl md:text-4xl">
                Data is expensive, and chronically underutilised
              </h3>
            {/* </div> */}
          </div>
        </div>


        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <StatCard
            value="$200k+"
            description={
              <>
                entry level price to access ( GWI + Kantar + Nielsen)
              </>
            }
          />
          <StatCard
            value="73%"
            description={
              <>
                all data within businesses goes unused
                <sup className="ml-0.5 text-[0.65em] align-super">1</sup>
              </>
            }
          />
        </div>


        <div className="flex flex-col items-center justify-center gap-4 text-xs text-muted-foreground sm:flex-row sm:gap-8">
          <a
            href="https://www.forrester.com/blogs/hadoop-is-datas-darling-for-a-reason/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-4"
          >
            <span>
              <sup>1</sup> Forrester 2016
            </span>
          </a>
        </div>
      </Container>
    </Section>
  );
};

export default StatsSection;
