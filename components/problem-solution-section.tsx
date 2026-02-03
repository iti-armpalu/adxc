import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { ProblemCard } from "@/components/cards/problem-card";
import { SolutionCard } from "@/components/cards/solution-card";
import SquaresScatterToCard from "@/components/squares-scatter-to-card";

export function ProblemSolutionSection() {
  return (
    <Section size="sm">
      <Container size="lg">
        {/* 1) Problem on top */}
        <div className="mx-auto mb-24 max-w-3xl">
          <ProblemCard />
        </div>

        {/* 2) Solution + Squares below */}
        <div className="mt-8 flex flex-col-reverse gap-6 xl:flex-row xl:items-start">
          {/* Left on desktop, second on mobile */}
          <div className="mx-auto mt-24 max-w-3xl my-auto">
            <SolutionCard />
          </div>

          {/* Right on desktop, first on mobile */}
          {/* <div className="w-full flex-1"> */}
            <SquaresScatterToCard />
          {/* </div> */}
        </div>
      </Container>
    </Section>
  );
}
