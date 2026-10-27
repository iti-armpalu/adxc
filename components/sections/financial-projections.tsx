"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ReferenceLine,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { FINANCIALS, type Financial } from "@/lib/financials";

type Metric = Exclude<keyof Financial, "year">;

const CHARTS: { metric: Metric; title: string; color: (v: number) => string }[] = [
    { metric: "revenue", title: "Revenue", color: () => "var(--color-chart-1)" },
    { metric: "costs", title: "Expenses & costs", color: () => "var(--color-chart-3)" },
    {
        metric: "profit",
        title: "Profit",
        color: (v) => (v < 0 ? "var(--color-chart-negative)" : "var(--color-chart-positive)"),
    },
];

const barColor = (v: number) => (v < 0 ? "var(--color-chart-5)" : "var(--color-chart-1)");

const formatMillions = (v: number) =>
    `${v < 0 ? "-" : ""}$${(Math.abs(v) / 1_000_000).toFixed(1)}M`;

export function FinancialProjections() {
    return (
        <section>
            <div className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 sm:py-24">
                <div className="text-center">
                    <p className="text-caption mb-3 text-muted-foreground">Financial projections</p>
                    <h2 className="text-balance text-primary">Servicing this market can scale quickly</h2>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {CHARTS.map((c) => (
                        <MiniBarChart key={c.metric} {...c} />
                    ))}
                </div>

                <p className="text-center text-xs text-muted-foreground">
                    Forward-looking projections in USD
                </p>

                {/* Accessible data for screen readers */}
                <table className="sr-only">
                    <caption>Financial projections (USD)</caption>
                    <thead>
                        <tr>
                            <th scope="col">Year</th>
                            {CHARTS.map((c) => (
                                <th key={c.metric} scope="col">
                                    {c.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {FINANCIALS.map((row) => (
                            <tr key={row.year}>
                                <th scope="row">{row.year}</th>
                                {CHARTS.map((c) => (
                                    <td key={c.metric}>{formatMillions(row[c.metric])}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

function MiniBarChart({ metric, title, color }: (typeof CHARTS)[number]) {
    const hasNegative = FINANCIALS.some((d) => d[metric] < 0);

    return (
        <Card className="py-0" aria-hidden>
            <CardContent className="p-6">
                <h3 className="mb-4 text-center text-base">{title}</h3>
                <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={FINANCIALS} margin={{ top: 24, right: 8, left: 8, bottom: 4 }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis
                            dataKey="year"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                        />
                        <YAxis hide />
                        {hasNegative && <ReferenceLine y={0} stroke="var(--border-4)" />}
                        <Bar dataKey={metric} radius={[4, 4, 0, 0]} label={<ValueLabel />}>
                            {FINANCIALS.map((d) => (
                                <Cell key={d.year} fill={color(d[metric])} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

type LabelProps = {
    x?: number | string;
    y?: number | string;
    width?: number | string;
    height?: number | string;
    value?: number | string;
};

// Label sits above the bar's top edge (the zero line for negative bars)
function ValueLabel({ x = 0, y = 0, width = 0, height = 0, value = 0 }: LabelProps) {
    const nx = Number(x);
    const ny = Number(y);
    const top = Math.min(ny, ny + Number(height));

    return (
        <text
            x={nx + Number(width) / 2}
            y={top - 8}
            textAnchor="middle"
            fill="var(--foreground)"
            fontSize={12}
            fontWeight={600}
        >
            {formatMillions(Number(value))}
        </text>
    );
}