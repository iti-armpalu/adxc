import { ReactNode } from "react";
import SquaresScatterToCard from "@/components/squares-scatter-to-card";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "./section-header";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";


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

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-6">
            {steps.map((step) => (
              <Card key={step.number} className="flex-1 basis-0 gap-3 py-4">
                <CardHeader>
                  <CardTitle>

                    <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100">
                        <span className="text-base font-bold text-adxc">
                          {step.number}
                        </span>
                      </div>

                      <h3 className="text-base font-semibold text-adxc">
                        {step.title}
                      </h3>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
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
