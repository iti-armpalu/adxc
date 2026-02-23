import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import SquaresScatterToCard from "@/components/squares-scatter-to-card";
import { SectionHeader } from "./sections/section-header";
import { CornerDownRight } from "lucide-react";

export function ADXCApproachSection() {
  return (
    <Section size="md" className="relative">
      <Container size="md">

        <SectionHeader
          title="ADXC uses agentic access technology to give SMEs access to all the marketing data they need, while only paying for what they use"
          size="sm"
          align="center"
        />



        <div className="relative">
          <SquaresScatterToCard />

          <div className="absolute -left-[220px] top-1/5 -translate-y-1/2 max-w-[200px] hidden xl:block">
            <div className="flex flex-col">
              <div className="bg-card/80 backdrop-blur-xl border border-adxc rounded-xl px-4 py-3 shadow-md">
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-adxc">
                  ADXC approach
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ADXC enables agents to use data & only pay for what is consumed
                </p>
              </div>

              <CornerDownRight
                className="mt-3 self-end text-adxc h-6 w-6"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="absolute -left-[220px] bottom-1/7 -translate-y-1/2 max-w-[200px] hidden xl:block">
            <div className="flex flex-col">
              <div className="bg-card/80 backdrop-blur-xl border border-adxc rounded-xl px-4 py-3 shadow-md">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="uppercase text-adxc font-semibold">Click a subtask</span>
                  {" "}to see how data flows change
                </p>
              </div>

              <CornerDownRight
                className="mt-3 self-end text-adxc h-6 w-6"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

      </Container>
    </Section>
  );
}
