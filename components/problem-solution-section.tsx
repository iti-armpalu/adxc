import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { ProblemCard } from "@/components/cards/problem-card";
import { SolutionCard } from "@/components/cards/solution-card";
import SquaresScatterToCard from "@/components/squares-scatter-to-card";
import { SectionHeader } from "./sections/section-header";

export function ProblemSolutionSection() {
  return (
    <Section size="md">
      <Container size="lg">

        <SectionHeader
          title="ADXC uses agentic access technology to give SMEs access to all the marketing data they need, while only paying for what they use"
          size="sm"
          align="center"
        />

        <div className="mt-8 flex flex-col-reverse gap-6 xl:flex-row xl:items-start">
          <div className="mx-auto max-w-3xl">
            <SolutionCard />
          </div>
          <SquaresScatterToCard />
        </div>
      </Container>
    </Section>
  );
}
