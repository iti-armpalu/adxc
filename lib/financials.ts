export type Financial = {
    year: string;
    revenue: number;
    costs: number;
    profit: number;
};

// TODO: confirm profit figures — revenue minus costs gives 2026: -$612k (stated -$655k), 2028: +$2.1M (stated +$2.2M)
export const FINANCIALS: Financial[] = [
    { year: "2026", revenue: 588_000, costs: 1_200_000, profit: -655_000 },
    { year: "2027", revenue: 5_500_000, costs: 6_100_000, profit: -598_000 },
    { year: "2028", revenue: 19_200_000, costs: 17_100_000, profit: 2_200_000 },
];