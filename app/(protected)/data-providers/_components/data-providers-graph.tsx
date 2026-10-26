'use client'

import { useMemo, useState, useCallback } from "react"
import { Database } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type SubtaskRoute = {
  label: string
  providerIndex: number[]
}

type TaskColumn = {
  task: string
  subtasks: SubtaskRoute[]
}

const PROVIDERS = [
  { name: "Kantar" },
  { name: "Nielsen" },
  { name: "Experian" },
  { name: "GWI" },
  { name: "Comscore" },
  { name: "Your data" },
] as const

const WORKFLOW_TASKS: TaskColumn[] = [
  {
    task: "Strategy / Brief",
    subtasks: [
      { label: "Market understanding", providerIndex: [0, 1, 2, 5] },
      { label: "Audience sizing", providerIndex: [1, 2] },
      { label: "Category context", providerIndex: [0, 3] },
    ],
  },
  {
    task: "Creative Development",
    subtasks: [
      { label: "Cultural tensions, insights", providerIndex: [0, 4] },
      { label: "Inspiration", providerIndex: [4] },
      { label: "Messaging development", providerIndex: [0] },
    ],
  },
  {
    task: "Media Strategy / Planning",
    subtasks: [
      { label: "Reach, frequency", providerIndex: [4] },
      { label: "Channel effectiveness", providerIndex: [4] },
      { label: "Planning", providerIndex: [4] },
    ],
  },
  {
    task: "Activation / Execution",
    subtasks: [
      { label: "Campaign activation", providerIndex: [2, 5] },
      { label: "Retail media", providerIndex: [3] },
      { label: "Execution", providerIndex: [3] },
    ],
  },
  {
    task: "Measurement & Optimization",
    subtasks: [
      { label: "Effectiveness", providerIndex: [0, 1, 5] },
      { label: "Sales impact", providerIndex: [3] },
      { label: "Optimization", providerIndex: [0, 1, 3] },
    ],
  },
]

function makeSubtaskId(task: string, label: string) {
  return `${task}__${label}`
}

export default function DataProvidersGraph() {
  // one selected subtask at a time
  const [selectedSubtaskId, setSelectedSubtaskId] = useState<string | null>(() => {
    const firstTask = WORKFLOW_TASKS[0]
    const firstSubtask = firstTask.subtasks[0]
    return makeSubtaskId(firstTask.task, firstSubtask.label)
  })

  const handleSubtaskClick = useCallback((subtaskId: string) => {
    setSelectedSubtaskId((prev) => (prev === subtaskId ? null : subtaskId))
  }, [])

  // build a quick lookup: subtaskId -> providerIndex[]
  const subtaskProvidersById = useMemo(() => {
    const map = new Map<string, number[]>()
    for (const col of WORKFLOW_TASKS) {
      for (const st of col.subtasks) {
        map.set(makeSubtaskId(col.task, st.label), st.providerIndex)
      }
    }
    return map
  }, [])

  const highlightedProviders = useMemo<number[]>(() => {
    if (!selectedSubtaskId) return []
    return subtaskProvidersById.get(selectedSubtaskId) ?? []
  }, [selectedSubtaskId, subtaskProvidersById])

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
                  Click a subtask to see which data providers it uses
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-border/20 bg-stone-50/30 p-2 overflow-x-auto">
              <div className="grid grid-cols-5 gap-1 min-w-[900px]">
                {WORKFLOW_TASKS.map((item) => (
                  <div key={item.task} className="p-2">
                    <p className="mb-3 flex min-h-[40px] w-full items-center justify-center rounded-full bg-stone-200 px-2 text-center text-xs font-semibold text-adxc">
                      {item.task}
                    </p>

                    <div className="flex flex-col items-center gap-2">
                      {item.subtasks.map((subtask) => {
                        const id = makeSubtaskId(item.task, subtask.label)
                        const isSelected = selectedSubtaskId === id

                        return (
                          <button
                            type="button"
                            key={id}
                            onClick={() => handleSubtaskClick(id)}
                            className={[
                              "relative flex w-full cursor-pointer items-center justify-center rounded-full border px-2 py-1 text-center text-xs transition-colors duration-200",
                              isSelected
                                ? "border-adxc bg-adxc/10 text-adxc"
                                : "border-transparent bg-stone-50 text-stone-600 hover:border-adxc hover:bg-adxc/10",
                            ].join(" ")}
                          >
                            <span className="relative">{subtask.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Data Providers - Bottom */}
          <div className="mt-8 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs text-muted-foreground uppercase tracking-wider">
                Data Providers
              </h3>
            </div>

            <div className="relative bg-stone-50/30 rounded-xl p-2 border border-border/20">
              <div className="flex gap-4 sm:gap-8 md:gap-16 justify-center">
                {PROVIDERS.map((provider, index) => {
                  const isHighlighted = highlightedProviders.includes(index)
                  const boxShadow = isHighlighted
                    ? "0 0 40px 15px rgba(102, 2, 60, 0.15), 0 0 60px 25px rgba(102, 2, 60, 0.08), 0 0 80px 35px rgba(102, 2, 60, 0.04)"
                    : "0 4px 6px -1px rgba(0, 0, 0, 0.10), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"

                  return (
                    <div key={provider.name} className="flex flex-col items-center gap-3">
                      <div
                        className={[
                          "w-8 h-8 md:w-14 md:h-14 rounded-lg shadow-lg flex items-center justify-center transition-colors duration-300",
                          isHighlighted
                            ? "bg-adxc/20 border-2 border-adxc"
                            : "bg-stone-200 border border-stone-300",
                        ].join(" ")}
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
                        <p className={["text-xs font-medium", isHighlighted ? "text-[#66023C]" : "text-foreground"].join(" ")}>
                          {provider.name}
                        </p>
                      </div>
                    </div>
                  )
                })}
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
