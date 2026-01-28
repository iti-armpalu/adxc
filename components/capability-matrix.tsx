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

export default function CapabilityMatrix() {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-2xl">Marketing Data Capabilities</CardTitle>
        <CardDescription className="text-base">
          Illustrates how individual data providers contribute to different stages of the marketing workflow, and why multiple sources are often required to complete a single task.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="relative overflow-x-auto">
          <Table className="table-fixed min-w-[960px] w-full [&_tr]:border-0">
            <TableHeader>
              <TableRow className="border-none">
                <TableHead className="sticky left-0 z-10 w-[140px] bg-background">
                  Data Source
                </TableHead>

                {stages.map((stage) => (
                  <TableHead
                    key={stage.id}
                    className="w-[140px] px-1 py-2 text-center text-xs font-medium text-muted-foreground whitespace-normal"
                  >
                    <span className="hidden sm:inline">{stage.label}</span>
                    <span className="sm:hidden">{stage.short}</span>
                    <p className="mt-1 text-[10px] leading-tight text-muted-foreground/70 whitespace-normal">
                      {stage.task}
                    </p>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {dataSources.map((source, idx) => (
                <TableRow
                  key={idx}
                >
                  <TableCell className="sticky left-0 z-10 w-[140px] bg-background text-sm font-medium">
                    {source.name}
                  </TableCell>

                  {source.data.map((value, stageIdx) => (
                    <TableCell key={stageIdx} className="w-[140px] px-2">
                      <div className="relative h-3 w-full rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full ${getColorClass(value)}`}
                          style={{ width: `${(value / MAX_VALUE) * 100}%` }}
                        />
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
