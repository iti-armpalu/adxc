import { ReactNode } from "react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "./section-header";
import DataCoverageMatrix from "../data-coverage-matrix";

type DataCoverageMatrixProps = {
  title: ReactNode;
  description?: ReactNode;
};

export default function DataCoverageMatrixSection({
  title,
  description,
}: DataCoverageMatrixProps) {
  return (
    <Section size="lg">
      <Container>
        <SectionHeader
          title={title}
          description={description}
          size="md"
          align="center"
        />
        <DataCoverageMatrix />
      </Container>
    </Section>
  );
}
