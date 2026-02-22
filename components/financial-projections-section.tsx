'use client'

import { Container } from "./layout/container"
import { Section } from "./layout/section"
import { SectionHeader } from "./sections/section-header"

import { Card, CardContent } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Cell, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const FINANCIALS = [
    { year: "2026", revenue: 588000, costs: 1200000, profit: -655000 },
    { year: "2027", revenue: 5500000, costs: 6100000, profit: -598000 },
    { year: "2028", revenue: 19200000, costs: 17100000, profit: 2200000 },
]

export default function FinancialProjectionsSection() {

    function formatMillions(v: number) {
        return `$${(Math.abs(v) / 1_000_000).toFixed(1)}M`
    }

    return (
        <Section size="md">
            <Container size="lg">

                <div className="text-center mb-8">
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-adxc bg-pink-50 px-3 py-1 rounded-full mb-3">Financial Projections</span>
                    <SectionHeader
                        title="Servicing this market can scale quickly"
                        size="sm"
                        align="center"
                    />
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Revenue */}
                    <Card className="border-border bg-card shadow-sm py-0">
                        <CardContent className="p-6">
                            <h3 className="text-base font-semibold text-foreground text-center mb-4">Revenue</h3>
                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart data={FINANCIALS} margin={{ top: 25, right: 20, left: 20, bottom: 5 }}>

                                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                                    <XAxis dataKey="year" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                                    <Bar
                                        dataKey="revenue"
                                        radius={[4, 4, 0, 0]}
                                        fill="hsl(var(--primary))"
                                        label={(props: any) => {
                                            const { x, y, width, value } = props
                                            const formatted = `${value < 0 ? "-" : ""}${formatMillions(value)}`

                                            return (
                                                <text
                                                    x={x + width / 2}
                                                    y={y - 8}
                                                    textAnchor="middle"
                                                    fill="hsl(var(--foreground))"
                                                    fontSize={12}
                                                    fontWeight={600}
                                                >
                                                    {formatted}
                                                </text>
                                            )
                                        }}
                                    />

                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Expenses & Costs */}
                    <Card className="border-border bg-card shadow-sm py-0">
                        <CardContent className="p-6">
                            <h3 className="text-base font-semibold text-foreground text-center mb-4">Expenses &amp; Costs</h3>
                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart data={FINANCIALS} margin={{ top: 25, right: 20, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                                    <XAxis dataKey="year" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                                    <Bar
                                        dataKey="costs"
                                        radius={[4, 4, 0, 0]}
                                        fill="hsl(0 84.2% 60.2%)"
                                        label={(props: any) => {
                                            const { x, y, width, value } = props
                                            const formatted = `${value < 0 ? "-" : ""}${formatMillions(value)}`

                                            return (
                                                <text
                                                    x={x + width / 2}
                                                    y={y - 8}
                                                    textAnchor="middle"
                                                    fill="hsl(var(--foreground))"
                                                    fontSize={12}
                                                    fontWeight={600}
                                                >
                                                    {formatted}
                                                </text>
                                            )
                                        }}
                                    />

                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Profit */}
                    <Card className="border-border bg-card shadow-sm py-0">
                        <CardContent className="p-6">
                            <h3 className="text-base font-semibold text-foreground text-center mb-4">Profit</h3>
                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart data={FINANCIALS} margin={{ top: 25, right: 20, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                                    <XAxis dataKey="year" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                                    <ReferenceLine y={0} className="stroke-muted-foreground" />
                                    <Bar dataKey="profit" radius={[4, 4, 0, 0]}
                                        label={(props: any) => {
                                            const { x, y, width, height, value } = props
                                            const isNegative = value < 0

                                            const formatted = `${value < 0 ? "-" : ""}${formatMillions(value)}`

                                            return (
                                                <text
                                                    x={x + width / 2}
                                                    y={isNegative
                                                        ? Math.min(y + height - 6, y + height / 2 + 10)
                                                        : y - 8
                                                    }
                                                    textAnchor="middle"
                                                    fill="hsl(var(--foreground))"
                                                    fontSize={12}
                                                    fontWeight={600}
                                                >
                                                    {formatted}
                                                </text>
                                            )
                                        }}
                                    >

                                        {FINANCIALS.map((entry, index) => (
                                            <Cell key={index} fill={entry.profit < 0 ? "hsl(0 84.2% 60.2%)" : "hsl(var(--primary))"} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

            </Container>
        </Section>
    )
}
