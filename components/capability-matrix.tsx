"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Marketing stages
const stages = [
    { id: "strategy", label: "Strategy / Brief", short: "Strategy", task: "Market understanding, audience sizing, category context" },
    { id: "creative", label: "Creative Development", short: "Creative", task: "Insights, tensions, cultural context, inspiration" },
    { id: "media", label: "Media Strategy / Planning", short: "Media", task: "Reach, frequency, channel effectiveness, planning" },
    { id: "activation", label: "Activation / Execution", short: "Activation", task: "Campaign delivery, retail media, execution" },
    { id: "measurement", label: "Measurement & Optimization", short: "Measurement", task: "ROI, effectiveness, sales impact, optimization" },
]

// Data sources with their usage across stages (0-5 scale, 0 = not used, 5 = heavily used)
const dataSources = [
    { name: "Kantar Worldpanel", data: [4, 2, 3, 1, 5], highlight: "measurement" },
    { name: "Nielsen / NielsenIQ", data: [4, 1, 4, 2, 5], highlight: "measurement" },
    { name: "Mintel", data: [5, 4, 2, 1, 2], highlight: "strategy" },
    { name: "Brandwatch", data: [3, 5, 2, 3, 3], highlight: "creative" },
    { name: "Amazon / Walmart", data: [0, 2, 3, 5, 4], highlight: "activation" },
    { name: "Meta / Google / TikTok", data: [0, 3, 4, 5, 4], highlight: "activation" },
    { name: "Ipsos", data: [4, 4, 2, 1, 4], highlight: "strategy" },
    { name: "WARC", data: [4, 3, 4, 2, 3], highlight: "strategy" },
    { name: "GWI", data: [5, 4, 3, 2, 2], highlight: "strategy" },
    { name: "YouGov", data: [4, 4, 2, 1, 3], highlight: "strategy" },
    { name: "Circana", data: [4, 2, 3, 3, 4], highlight: "measurement" },
    { name: "Numerator", data: [3, 2, 3, 3, 5], highlight: "measurement" },
]

export default function CapabilityMatrix() {
    // Calculate max value for scaling
    const maxValue = 5

    const getColorClass = (value: number) => {
        if (value <= 2) {
            return "bg-red-400"
        } else if (value <= 3) {
            return "bg-amber-400"
        } else {
            return "bg-emerald-400"
        }
    }

    return (
        <Card className="border-2">
            <CardHeader>
                <CardTitle className="text-2xl">Marketing Data Capabilities</CardTitle>
                <CardDescription className="text-base">
                    Visualize how each data source powers different stages of your marketing workflow
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">

                    {/* Stage headers */}
                    <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[200px_1fr] gap-2 sm:gap-4">
                        <div className="text-xs sm:text-sm font-medium text-muted-foreground">Data Source</div>
                        <div className="grid grid-cols-5 gap-1 sm:gap-2">
                            {stages.map((stage) => (
                                <div key={stage.id} className="text-xs font-medium text-center text-muted-foreground px-1">
                                    <span className="hidden sm:inline">{stage.label}</span>
                                    <span className="sm:hidden">{stage.short}</span>
                                    <p className="text-[8px] sm:text-[10px] text-muted-foreground/70 leading-tight">
                                        {stage.task}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Data rows */}
                    <div className="space-y-2">
                        {dataSources.map((source, idx) => (
                            <div key={idx} className="grid grid-cols-[200px_1fr] gap-4 items-center">
                                <div className="text-sm font-medium text-foreground truncate" title={source.name}>
                                    {source.name}
                                </div>
                                <div className="grid grid-cols-5 gap-6">
                                    {source.data.map((value, stageIdx) => {
                                        const isHighlighted = stages[stageIdx].id === source.highlight
                                        const widthPercent = (value / maxValue) * 100

                                        return (
                                            <div key={stageIdx} className="relative h-3 bg-muted rounded-full flex items-center">
                                                <div
                                                    className={`h-full rounded-full transition-all ${getColorClass(value)}`}
                                                    style={{ width: `${widthPercent}%` }}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
