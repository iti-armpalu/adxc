export type PhaseId = "strategy" | "creative" | "media" | "execution" | "optimisation";
export type TierId = "micro" | "small" | "medium";

const PAYOUT_PER_QUERY_GBP = 5.7;
const GBP_TO_USD = 1.35; // fixed rate, illustrative
const USEFUL_DATA_FACTOR = 0.33;

export const PHASES: { id: PhaseId; label: string; weight: number }[] = [
    { id: "strategy", label: "Strategy / brief", weight: 0.3 },
    { id: "creative", label: "Creative ideation", weight: 0.25 },
    { id: "media", label: "Channel / media planning", weight: 0.25 },
    { id: "execution", label: "Execution", weight: 0.1 },
    { id: "optimisation", label: "Optimisation", weight: 0.1 },
];

export const TIERS: {
    id: TierId;
    label: string;
    max: number;
    step: number;
    defaultValue: number;
    usersPerClient: number;
    queriesPerUserPerMonth: number;
}[] = [
        { id: "micro", label: "Micro clients", max: 20_000, step: 100, defaultValue: 500, usersPerClient: 2, queriesPerUserPerMonth: 5 },
        { id: "small", label: "Small clients", max: 5_000, step: 10, defaultValue: 50, usersPerClient: 8, queriesPerUserPerMonth: 10 },
        { id: "medium", label: "Medium clients", max: 250, step: 1, defaultValue: 5, usersPerClient: 20, queriesPerUserPerMonth: 20 },
    ];

export function dataProviderAnnualEarnings(phases: PhaseId[], counts: Record<TierId, number>) {
    const phaseFactor = PHASES.reduce((sum, p) => sum + (phases.includes(p.id) ? p.weight : 0), 0);
    const monthlyQueries = TIERS.reduce(
        (sum, t) => sum + counts[t.id] * t.usersPerClient * t.queriesPerUserPerMonth,
        0
    );
    const monthlyUsd = monthlyQueries * PAYOUT_PER_QUERY_GBP * GBP_TO_USD * USEFUL_DATA_FACTOR * phaseFactor;
    return monthlyUsd * 12;
}