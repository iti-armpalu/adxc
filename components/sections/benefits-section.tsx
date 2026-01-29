import { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "./section-header";


export type BenefitFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type BenefitsSectionProps = {
  title: ReactNode;
  description?: ReactNode;
  features: BenefitFeature[];
  backgroundClassName?: string; // optional per-page background tweak
};

export function BenefitsSection({
  title,
  description,
  features,
  backgroundClassName = "bg-white",
}: BenefitsSectionProps) {
  return (
    <Section size="md" className={backgroundClassName}>
      <Container>
        <SectionHeader
          title={title}
          description={description}
          size="md"
          align="center"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border bg-white p-6 md:p-8"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100">
                <feature.icon className="h-6 w-6 text-adxc" />
              </div>

              <h3 className="mb-3 text-xl font-semibold text-adxc">
                {feature.title}
              </h3>

              <p className="leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
