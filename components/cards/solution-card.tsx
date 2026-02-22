import { InfoCard } from "@/components/cards/info-card";

export function SolutionCard() {
  return (
    <InfoCard tone="adxc" label="The ADXC Approach">
      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
        ADXC enables agents to use data & only pay for what is consumed
      </p>
    </InfoCard>
  );
}
