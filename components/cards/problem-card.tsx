import { InfoCard } from "@/components/cards/info-card";

export function ProblemCard() {
  return (
    <InfoCard tone="problem" label="The Problem">
      <p className="text-base sm:text-lg text-muted-foreground text-balance leading-relaxed">
        AI agents are everywhere, but most lack the data they need to produce reliable,
        decision-grade outputs. Premium data that could help is still sold via expensive
        annual licenses built for human analysis, so out of reach for most businesses.
      </p>
    </InfoCard>
  );
}
