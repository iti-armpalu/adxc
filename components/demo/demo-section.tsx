import DemoButtons from "./demo-buttons";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "../sections/section-header";

export function DemoSection() {
  return (
    <Section size="lg">
      <Container size="sm">
        <SectionHeader
          title="See ADXC in action"
          size="md"
          align="center"
        />
        <DemoButtons />
      </Container>
    </Section>
  );
}
