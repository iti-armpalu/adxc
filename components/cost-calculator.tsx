'use client'

import { useState, useCallback, useMemo } from "react"
import { Database } from "lucide-react"
import { Card, CardContent } from "./ui/card"

const PROVIDERS = [
    { name: "Kantar", cost: 200000 },
    { name: "Nielsen", cost: 100000 },
    { name: "Experian", cost: 50000 },
    { name: "GWI", cost: 75000 },
    { name: "Comscore", cost: 100000 },
] as const

const WORKFLOW_TASKS = [
    { task: "Strategy / Brief", subtasks: ["Market understanding", "Audience sizing", "Category context"], providerIndex: [0, 1, 2] },
    { task: "Creative Development", subtasks: ["Tensions", "Cultural context", "Inspiration"], providerIndex: [0, 4] },
    { task: "Media Strategy / Planning", subtasks: ["Reach, frequency", "Channel effectiveness", "Planning"], providerIndex: [4] },
    { task: "Activation / Execution", subtasks: ["Campaign delivery", "Retail media", "Execution"], providerIndex: [2, 3] },
    { task: "Measurement & Optimization", subtasks: ["Effectiveness", "Sales impact", "Optimization"], providerIndex: [0, 1] },
] as const

// UI-only: force "$" (not "US$") and round to whole dollars
const formatUsdUI = (n: number) =>
    n.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        currencyDisplay: "narrowSymbol",
        maximumFractionDigits: 0,
    });

export default function CostCalculator() {
    const [selectedTasks, setSelectedTasks] = useState<Set<string>>(
        () => new Set([WORKFLOW_TASKS[0].task])
    )

    const handleTaskClick = useCallback((taskName: string) => {
        setSelectedTasks((prev) => {
            const next = new Set(prev)
            if (next.has(taskName)) next.delete(taskName)
            else next.add(taskName)
            return next
        })
    }, [])

    const highlightedProviders = useMemo<number[]>(() => {
        const indices = new Set<number>()

        for (const item of WORKFLOW_TASKS) {
            if (!selectedTasks.has(item.task)) continue
            for (const idx of item.providerIndex) indices.add(idx)
        }

        return Array.from(indices).sort((a, b) => a - b)
    }, [selectedTasks])

    const totalCost = useMemo(() => {
        return highlightedProviders.reduce((sum, idx) => sum + PROVIDERS[idx].cost, 0)
    }, [highlightedProviders])

    return (
        <div className="w-full flex justify-center">
            <Card className="py-0 max-w-full">
                <CardContent className="p-4 sm:p-8">
                    {/* Workflow Tasks - Top */}
                    <div className="space-y-2">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-xs text-muted-foreground uppercase tracking-wider">
                                Example marketing tasks by stage
                            </h3>
                            <div className="flex xl:hidden items-center gap-2">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-adxc opacity-60"></span>
                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-adxc"></span>
                                </span>
                                <p className="text-xs text-muted-foreground/80">
                                    Click a marketing workflow task to see which data providers it uses and the associated costs
                                </p>
                            </div>
                        </div>

                        <div className="rounded-xl border border-border/20 bg-stone-50/30 p-2 overflow-x-auto">
                            <div className="grid grid-cols-5 gap-1 min-w-[900px]">
                                {WORKFLOW_TASKS.map((item) => {
                                    const isSelected = selectedTasks.has(item.task)

                                    return (
                                        <div key={item.task} className="p-2" data-task-column>
                                            <button
                                                onClick={() => handleTaskClick(item.task)}
                                                className={[
                                                    "mb-3 flex min-h-[40px] w-full items-center justify-center rounded-full px-2 text-center text-xs font-semibold border",
                                                    isSelected
                                                        ? "bg-adxc/10 border-adxc text-adxc"
                                                        : "bg-stone-200 border-transparent text-adxc hover:bg-stone-300",
                                                ].join(" ")}
                                            >
                                                {item.task}
                                            </button>


                                            <div className="flex flex-col items-center gap-2">
                                                {item.subtasks.map((subtask) => (
                                                    <span
                                                        key={subtask}
                                                        className="relative flex w-full items-center justify-center rounded-full border px-1 py-1 text-center text-xs border-transparent bg-stone-50 text-stone-600"
                                                    >
                                                        <span className="relative">{subtask}</span>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Data Providers - Bottom */}
                    <div className="mt-8 space-y-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs text-muted-foreground uppercase tracking-wider">
                                Data Provider Subscription Costs (Entry Level)
                            </h3>
                        </div>

                        <div className="flex flex-col md:flex-row items-stretch gap-4">
                            <div className="flex-1 flex items-center justify-between gap-4 sm:gap-8 lg:gap-16 py-2 px-4 sm:py-4 sm:px-12 lg:px-16 bg-stone-50/30 rounded-xl border border-border/20">
                                {PROVIDERS.map((provider, index) => {
                                    const isHighlighted = highlightedProviders.includes(index)
                                    const boxShadow = isHighlighted
                                        ? "0 0 40px 15px rgba(102, 2, 60, 0.15), 0 0 60px 25px rgba(102, 2, 60, 0.08), 0 0 80px 35px rgba(102, 2, 60, 0.04)"
                                        : "0 4px 6px -1px rgba(0, 0, 0, 0.10), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"

                                    return (
                                        <div key={provider.name} className="flex flex-col items-center gap-3">
                                            <div
                                                className={`w-8 h-8 md:w-14 md:h-14 rounded-lg shadow-lg flex items-center justify-center transition-colors duration-300 ${isHighlighted
                                                    ? "bg-adxc/20 border-2 border-adxc"
                                                    : "bg-stone-200 border border-stone-300"
                                                    }`}
                                                style={{ boxShadow }}
                                            >
                                                <span
                                                    className={[
                                                        "w-5 h-5 flex items-center transition-colors duration-300",
                                                        isHighlighted ? "text-adxc" : "text-stone-600",
                                                    ].join(" ")}
                                                >
                                                    <Database strokeWidth={2} />
                                                </span>
                                            </div>

                                            <div className="text-center">
                                                <p className={`text-xs font-medium ${isHighlighted ? "text-[#66023C]" : "text-foreground"}`}>
                                                    {provider.name}
                                                </p>

                                                {/* Cost appears when highlighted */}
                                                <div className="h-5 mt-1">
                                                    {isHighlighted && (
                                                        <p className="text-xs font-bold text-adxc animate-in fade-in duration-300">
                                                            {formatUsdUI(provider.cost)}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Total cost area */}
                            <div
                                className={[
                                    "flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-4 min-w-[120px] transition-all duration-300",
                                    selectedTasks.size > 0 ? "border-adxc bg-adxc/5" : "border-stone-300 bg-stone-50",
                                ].join(" ")}
                            >
                                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                    Total Cost
                                </p>
                                <div className="mt-0 flex items-center justify-center w-[110px]">
                                    <p className={[
                                        "text-xl font-bold tabular-nums transition-colors duration-300",
                                        selectedTasks.size > 0 ? "text-adxc" : "text-stone-400",
                                    ].join(" ")}>
                                        {selectedTasks.size > 0 ? formatUsdUI(totalCost) : "—"}
                                    </p>
                                </div>

                                {selectedTasks.size > 0 && (
                                    <p className="text-[10px] text-muted-foreground mt-1">
                                        {highlightedProviders.length} provider{highlightedProviders.length !== 1 ? "s" : ""}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <p className="mx-auto mt-8 max-w-3xl text-center text-xs italic text-muted-foreground">
                        For illustrative purposes only
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
