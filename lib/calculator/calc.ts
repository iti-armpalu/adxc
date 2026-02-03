// lib/calc.ts
export type PhaseId =
  | "strategy"
  | "creative"
  | "media"
  | "execution"
  | "optimisation";

export const PHASES = [
  { id: "strategy", label: "Strategy / Brief", weight: 0.3 },
  { id: "creative", label: "Creative Ideation", weight: 0.25 },
  { id: "media", label: "Channel / Media Planning", weight: 0.25 },
  { id: "execution", label: "Execution", weight: 0.1 },
  { id: "optimisation", label: "Optimisation", weight: 0.1 },
] as const satisfies readonly { id: PhaseId; label: string; weight: number }[];

export type ClientTierId = "micro" | "small" | "medium";

export const CLIENT_TIERS = [
  {
    id: "micro",
    label: "Micro Clients",
    activeUsersPerClient: 2,
    avgQueriesPerUserPerMonth: 5,
  },
  {
    id: "small",
    label: "Small Clients",
    activeUsersPerClient: 8,
    avgQueriesPerUserPerMonth: 10,
  },
  {
    id: "medium",
    label: "Medium Clients",
    activeUsersPerClient: 20,
    avgQueriesPerUserPerMonth: 20,
  },
] as const satisfies readonly {
  id: ClientTierId;
  label: string;
  activeUsersPerClient: number;
  avgQueriesPerUserPerMonth: number;
}[];

// constants
export const PROVIDER_PAYOUT_PER_QUERY_USD = 6;
export const USEFUL_DATA_FACTOR = 0.75; // 75%

export type PhaseToggles = Record<PhaseId, boolean>;

export interface CalculatorInput {
  selectedPhases: PhaseToggles;
  tier: ClientTierId;
  clientCount: number; // slider
}

export interface CalculatorOutput {
  phaseFactor: number; // sum of enabled weights (0..1)
  activeUsersPerClient: number;
  avgQueriesPerUserPerMonth: number;
  totalQueriesPerClientPerMonth: number; // activeUsersPerClient * avgQueriesPerUserPerMonth
  expectedMonthlyQueries: number; // clientCount * totalQueriesPerClientPerMonth
  grossPayoutUsd: number; // expectedMonthlyQueries * $6
  usablePayoutUsd: number; // gross * 0.75
  totalUsd: number; // phaseFactor * usablePayoutUsd
}

const byTier = Object.fromEntries(CLIENT_TIERS.map(t => [t.id, t])) as Record<
  ClientTierId,
  (typeof CLIENT_TIERS)[number]
>;

export function calculateTotal(input: CalculatorInput): CalculatorOutput {
  const tierInfo = byTier[input.tier];

  const phaseFactor = PHASES.reduce((sum, p) => {
    return sum + (input.selectedPhases[p.id] ? p.weight : 0);
  }, 0);

  const activeUsersPerClient = tierInfo.activeUsersPerClient;
  const avgQueriesPerUserPerMonth = tierInfo.avgQueriesPerUserPerMonth;

  const totalQueriesPerClientPerMonth =
    activeUsersPerClient * avgQueriesPerUserPerMonth;

  const expectedMonthlyQueries =
    input.clientCount * totalQueriesPerClientPerMonth;

  const grossPayoutUsd = expectedMonthlyQueries * PROVIDER_PAYOUT_PER_QUERY_USD;
  const usablePayoutUsd = grossPayoutUsd * USEFUL_DATA_FACTOR;

  const totalUsd = phaseFactor * usablePayoutUsd;

  return {
    phaseFactor,
    activeUsersPerClient,
    avgQueriesPerUserPerMonth,
    totalQueriesPerClientPerMonth,
    expectedMonthlyQueries,
    grossPayoutUsd,
    usablePayoutUsd,
    totalUsd,
  };
}
