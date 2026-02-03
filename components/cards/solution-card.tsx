import { InfoCard } from "@/components/cards/info-card";

export function SolutionCard() {
  return (
    <InfoCard tone="solution" label="The Solution">
      <div className="space-y-4">
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          ADXC is the missing piece. A data exchange for AI agents to instantly query
          multiple premium data providers to answer a specific question, and only pay
          for that answer.
        </p>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          Businesses get access to the data they need to make their marketing agents useful. Data
          providers monetise previously unreachable markets.
        </p>
      </div>
    </InfoCard>
  );
}
