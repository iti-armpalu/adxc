// lib/calc/brandSavingsTable.ts
export type TeamSizeBucket = "lt10" | "10to20" | "gt20";

export const TEAM_SIZE_BUCKETS: readonly {
    id: TeamSizeBucket;
    label: string;
}[] = [
    { id: "lt10", label: "Less than 10" },
    { id: "10to20", label: "10–20" },
    { id: "gt20", label: "20+" },
] as const;

export type BudgetBracketId =
    | "lt50k"
    | "50to100k"
    | "100to250k"
    | "250to500k"
    | "500kPlus";

export const BUDGET_BRACKETS: readonly {
    id: BudgetBracketId;
    label: string;
    min: number; // inclusive
    max?: number; // exclusive; omit => infinity
}[] = [
    { id: "lt50k", label: "Below $50k", min: 0, max: 50_000 },
    { id: "50to100k", label: "$50k–$100k", min: 50_000, max: 100_000 },
    { id: "100to250k", label: "$100k–$250k", min: 100_000, max: 250_000 },
    { id: "250to500k", label: "$250k–$500k", min: 250_000, max: 500_000 },
    { id: "500kPlus", label: "$500k+", min: 500_000 },
] as const;

/**
 * Savings % matrix:
 * rows = budget brackets
 * cols = team buckets
 *
 * Put percentages as decimals (e.g. 0.35 = 35%).
 */
export const SAVINGS_RATE: Record<
    BudgetBracketId,
    Record<TeamSizeBucket, number>
> = {
    lt50k: {
        lt10: 0.30,
        "10to20": 0.30,
        gt20: 0.30,
    },

    "50to100k": {
        lt10: 0.35,
        "10to20": 0.40,
        gt20: 0.45,
    },

    "100to250k": {
        lt10: 0.40,
        "10to20": 0.45,
        gt20: 0.50,
    },

    "250to500k": {
        lt10: 0.45,
        "10to20": 0.50,
        gt20: 0.55,
    },

    "500kPlus": {
        lt10: 0.50,
        "10to20": 0.55,
        gt20: 0.60,
    },
};


export function getBudgetBracketId(annualBudgetUsd: number): BudgetBracketId {
    const budget = Math.max(0, annualBudgetUsd);

    const bracket = BUDGET_BRACKETS.find(b =>
        budget >= b.min && (b.max === undefined ? true : budget < b.max)
    );

    // Should never happen because first bracket starts at 0
    return bracket?.id ?? "lt50k";
}

export interface BrandSavingsInput {
    annualResearchBudgetUsd: number;
    teamSize: TeamSizeBucket;
}

export interface BrandSavingsOutput {
    bracketId: BudgetBracketId;
    savingsRate: number; // 0..1
    annualSavingsUsd: number;
    monthlySavingsUsd: number;
}

export function calculateBrandSavings(input: BrandSavingsInput): BrandSavingsOutput {
    const bracketId = getBudgetBracketId(input.annualResearchBudgetUsd);
    const savingsRate = SAVINGS_RATE[bracketId][input.teamSize];

    const annualBudget = Math.max(0, input.annualResearchBudgetUsd);
    const annualSavingsUsd = annualBudget * savingsRate;
    const monthlySavingsUsd = annualSavingsUsd / 12;

    return { bracketId, savingsRate, annualSavingsUsd, monthlySavingsUsd };
}
