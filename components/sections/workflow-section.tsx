import { ReactNode } from "react";
import SquaresScatterToCard from "@/components/squares-scatter-to-card";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "./section-header";


export type WorkflowStep = {
  number: number;
  title: string;
  description: string;
};

type WorkflowSectionProps = {
  title: ReactNode;
  description?: ReactNode;
  steps: WorkflowStep[];
  footer?: ReactNode;
};

export default function WorkflowSection({
  title,
  description,
  steps,
  footer,
}: WorkflowSectionProps) {
  return (
    <Section size="lg" className="relative">
      <Container className="relative z-10">
        <SectionHeader
          title={title}
          description={description}
          align="center"
          size="md"
        />

        <div className="flex flex-col items-start gap-6 xl:flex-row">
          <SquaresScatterToCard />

          <div className="relative mx-auto my-auto w-full xl:max-w-[300px]">
            <div className="space-y-6">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-xl border border bg-white p-2 transition-all duration-300 hover:border-adxc hover:shadow-lg md:p-4"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100">
                    <span className="text-base font-bold text-adxc">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mb-3 text-base font-semibold text-adxc">
                    {step.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {footer && (
          <p className="mx-auto mt-12 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
            {footer}
          </p>
        )}
      </Container>
    </Section>
  );
}
