import CapabilityMatrix from "@/components/capability-matrix";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "./section-header";
import { ReactNode } from "react";

type CapabilityMatrixSectionProps = {
  title: ReactNode;
  description?: ReactNode;
};

export default function CapabilityMatrixSection({
  title,
  description,
}: CapabilityMatrixSectionProps) {
  return (
    <Section size="lg">
      <Container>
        <SectionHeader
          title={title}
          description={description}
          size="md"
          align="center"
        />

        <CapabilityMatrix />
      </Container>
    </Section>
  );
}
