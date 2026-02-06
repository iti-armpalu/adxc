"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

const GAP_THRESHOLD = 2; // Values at or below this are considered "gaps"

// Marketing stages
const stages = [
  {
    id: "strategy",
    label: "Strategy / Brief",
    short: "Strategy",
    task: "Market understanding, audience sizing, category context",
  },
  {
    id: "creative",
    label: "Creative Development",
    short: "Creative",
    task: "Insights, tensions, cultural context, inspiration",
  },
  {
    id: "media",
    label: "Media Strategy / Planning",
    short: "Media",
    task: "Reach, frequency, channel effectiveness, planning",
  },
  {
    id: "activation",
    label: "Activation / Execution",
    short: "Activation",
    task: "Campaign delivery, retail media, execution",
  },
  {
    id: "measurement",
    label: "Measurement & Optimization",
    short: "Measurement",
    task: "ROI, effectiveness, sales impact, optimization",
  },
];

// Data sources
const dataSources = [
  { name: "Kantar Worldpanel", data: [4, 2, 3, 1, 5] },
  { name: "Nielsen / NielsenIQ", data: [4, 1, 4, 2, 5] },
  { name: "Mintel", data: [5, 4, 2, 1, 2] },
  { name: "Brandwatch", data: [3, 5, 2, 3, 3] },
  { name: "Amazon / Walmart", data: [0, 2, 3, 5, 4] },
  { name: "Meta / Google / TikTok", data: [0, 3, 4, 5, 4] },
  { name: "Ipsos", data: [4, 4, 2, 1, 4] },
  { name: "WARC", data: [4, 3, 4, 2, 3] },
  { name: "GWI", data: [5, 4, 3, 2, 2] },
  { name: "YouGov", data: [4, 4, 2, 1, 3] },
  { name: "Circana", data: [4, 2, 3, 3, 4] },
  { name: "Numerator", data: [3, 2, 3, 3, 5] },
];

const MAX_VALUE = 5;

function getColorClass(value: number) {
  if (value <= 2) return "bg-red-400";
  if (value <= 3) return "bg-amber-400";
  return "bg-emerald-400";
}

export default function DataCoverageMatrix() {
  const [activeRow, setActiveRow] = useState<number | null>(null)

  const visibleRow = activeRow

  // Determine if a cell should be highlighted as a gap
  const isGapHighlighted = (rowIdx: number, value: number) => {
    const isGap = value <= GAP_THRESHOLD
    return visibleRow === rowIdx && isGap
  }

  // Determine if a cell should be dimmed
  const isDimmed = (rowIdx: number, value: number) => {
    const isGap = value <= GAP_THRESHOLD
    return visibleRow === rowIdx && !isGap
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-2xl">Marketing Data Coverage</CardTitle>
        <CardDescription className="text-base">
          Each data provider covers part of the marketing process, but none cover it all.
        </CardDescription>

        <div className="mt-3 flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-adxc opacity-60"></span>
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-adxc"></span>
          </span>

          <p className="text-xs text-muted-foreground/80">
            <span className="hidden sm:inline">Click on different data providers to highlight gaps</span>
            <span className="sm:hidden">Tap a data provider to highlight gaps</span>
          </p>
        </div>

      </CardHeader>

      <CardContent>
        <div className="relative overflow-x-auto">
          <Table className="table-fixed min-w-[960px] w-full [&_tr]:border-0">
            <TableHeader>
              <TableRow className="border-none">
                <TableHead className="sticky left-0 z-10 w-[120px] sm:w-[140px] bg-background">
                  Data Source
                </TableHead>

                {stages.map((stage) => (
                  <TableHead
                    key={stage.id}
                    className="w-[140px] px-1 py-2 text-center text-xs font-medium whitespace-normal text-muted-foreground"
                  >
                    <span className="hidden sm:inline">{stage.label}</span>
                    <span className="sm:hidden">{stage.short}</span>
                    <span className="mt-1 block text-[10px] leading-tight whitespace-normal text-muted-foreground/70">
                      {stage.task}
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {dataSources.map((source, rowIdx) => (
                <TableRow
                  key={rowIdx}
                  className={`cursor-pointer transition-colors duration-200 ${visibleRow === rowIdx ? "bg-muted/30" : ""
                    }`}
                  onClick={() => {
                    setActiveRow((prev) => (prev === rowIdx ? null : rowIdx))
                  }}
                >
                  <TableCell
                    className={`sticky left-0 z-10 w-[120px] sm:w-[140px] text-xs sm:text-sm font-medium transition-colors duration-200 ${visibleRow === rowIdx
                      ? "bg-muted/50 text-foreground"
                      : "bg-background"
                      }`}
                  >
                    {source.name}
                  </TableCell>

                  {source.data.map((value, colIdx) => {
                    const gapHighlighted = isGapHighlighted(rowIdx, value);
                    const dimmed = isDimmed(rowIdx, value);

                    return (
                      <TableCell
                        key={colIdx}
                        className={`w-[120px] sm:w-[140px] px-2 transition-all duration-200 ${gapHighlighted ? "bg-red-100 dark:bg-red-950/40" : ""
                          }`}
                      >
                        <div className="relative h-2 sm:h-3 w-full rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-200 ${getColorClass(value)} ${dimmed ? "opacity-30" : ""} ${gapHighlighted ? "animate-pulse" : ""}`}
                            style={{ width: `${(value / MAX_VALUE) * 100}%` }}
                          />
                          {gapHighlighted && (
                            <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] text-red-600 dark:text-red-400 font-medium">
                              Gap
                            </span>
                          )}
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
