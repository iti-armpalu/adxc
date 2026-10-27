export type TeamSize = "lt10" | "10to20" | "gt20";

export const TEAM_SIZES: { id: TeamSize; label: string }[] = [
    { id: "lt10", label: "Less than 10" },
    { id: "10to20", label: "10–20" },
    { id: "gt20", label: "20+" },
];

// Savings rate by annual budget bracket (upper bound exclusive) and team size
const BRACKETS: { max: number; rates: Record<TeamSize, number> }[] = [
    { max: 50_000, rates: { lt10: 0.3, "10to20": 0.3, gt20: 0.3 } },
    { max: 100_000, rates: { lt10: 0.35, "10to20": 0.4, gt20: 0.45 } },
    { max: 250_000, rates: { lt10: 0.4, "10to20": 0.45, gt20: 0.5 } },
    { max: 500_000, rates: { lt10: 0.45, "10to20": 0.5, gt20: 0.55 } },
    { max: Infinity, rates: { lt10: 0.5, "10to20": 0.55, gt20: 0.6 } },
];

export function brandAnnualSavings(annualBudget: number, team: TeamSize) {
    const budget = Math.max(0, annualBudget);
    const bracket = BRACKETS.find((b) => budget < b.max) ?? BRACKETS[BRACKETS.length - 1];
    return budget * bracket.rates[team];
}