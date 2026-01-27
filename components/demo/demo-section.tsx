import DemoButtons from "./demo-buttons";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";

export function DemoSection() {
  return (
    <Section size="lg">
      <Container size="sm">
        <div className="text-center">
          <h2 className="mb-4 text-balance text-2xl font-bold leading-tight text-foreground sm:text-3xl md:text-4xl">
            See ADXC in Action
          </h2>

          <DemoButtons />
        </div>
      </Container>
    </Section>
  );
}
