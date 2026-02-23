"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Database, Sparkles } from "lucide-react"
import { Card, CardContent } from "./ui/card"

/**
 * Single source of truth:
 * - WORKFLOW_TASKS defines the UI + the routing (agentIndex/providerIndex) per subtask.
 * - No separate map needed.
 */

type SubtaskRoute = {
  label: string
  agentIndex: number
  providerIndex: number[]
}

type TaskColumn = {
  task: string
  subtasks: SubtaskRoute[]
}

// --- Animation config
const ANIMATION_DURATION = 1
const ANIMATION_EASING = [0.32, 0.72, 0, 1] as const

// --- Scattered positions
const PROVIDER_SCATTERED_POSITIONS = [
  { x: "8%", y: "10%", rotate: -12 },
  { x: "95%", y: "8%", rotate: 18 },
  { x: "5%", y: "35%", rotate: 8 },
  { x: "82%", y: "52%", rotate: -15 },
  { x: "21%", y: "47%", rotate: 22 },
] as const

const AGENT_SCATTERED_POSITIONS = [
  { x: "15%", y: "35%", rotate: -15 },
  { x: "72%", y: "28%", rotate: 20 },
  { x: "88%", y: "46%", rotate: -8 },
  { x: "72%", y: "38%", rotate: 4 },
] as const

// Providers
const PROVIDERS_ALL = [
  { name: "Kantar", role: "Market Research" },
  { name: "Nielsen", role: "Audience Data" },
  { name: "Experian", role: "Consumer Insights" },
  { name: "Circana (IRI)", role: "Retail & CPG Data" },
  { name: "Comscore", role: "Digital Measurement" },
] as const

// Agents
const AGENTS_ALL = [
  { name: "Miro Sidekick", role: "Visual Collaboration" },
  { name: "Jasper AI", role: "Content Creation" },
  { name: "Salesforce Einstein", role: "CRM Intelligence" },
  { name: "Your agent", role: "X" },
] as const

// Single source of truth for tasks + selection routes
const WORKFLOW_TASKS: TaskColumn[] = [
  {
    task: "Strategy / Brief",
    subtasks: [
      { label: "Market understanding", agentIndex: 0, providerIndex: [0, 1, 2] },
      { label: "Audience sizing", agentIndex: 0, providerIndex: [1, 2] },
      { label: "Category context", agentIndex: 0, providerIndex: [0, 3] },
    ],
  },
  {
    task: "Creative Development",
    subtasks: [
      { label: "Cultural tensions, insights", agentIndex: 1, providerIndex: [0, 4] },
      { label: "Inspiration", agentIndex: 1, providerIndex: [4] },
      { label: "Messaging development", agentIndex: 1, providerIndex: [0] },
    ],
  },
  {
    task: "Media Strategy / Planning",
    subtasks: [
      { label: "Reach, frequency", agentIndex: 0, providerIndex: [4] },
      { label: "Channel effectiveness", agentIndex: 0, providerIndex: [4] },
      { label: "Planning", agentIndex: 0, providerIndex: [4] },
    ],
  },
  {
    task: "Activation / Execution",
    subtasks: [
      { label: "Campaign activation", agentIndex: 3, providerIndex: [2] },
      { label: "Retail media", agentIndex: 3, providerIndex: [3] },
      { label: "Execution", agentIndex: 3, providerIndex: [3] },
    ],
  },
  {
    task: "Measurement & Optimization",
    subtasks: [
      { label: "Effectiveness", agentIndex: 2, providerIndex: [0, 1] },
      { label: "Sales impact", agentIndex: 2, providerIndex: [3] },
      { label: "Optimization", agentIndex: 2, providerIndex: [0, 1, 3] },
    ],
  },
]

const DEFAULT_SUBTASK_LABEL = "Market understanding"

type AnimationState = "scattered" | "slotted"

type SquarePosition = { x: number; y: number; rotate: number; scale: number }

// Small helper: detect <= sm screens (only used to scale sizes)
function useIsSm() {
  const [isSm, setIsSm] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)")
    const onChange = () => setIsSm(mq.matches)
    onChange()
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])
  return isSm
}

export default function SquaresScatterToCard() {
  const isSm = useIsSm()
  const prefersReducedMotion = useReducedMotion()

  // Responsive size (same size used for squares + slots)
  const SIZE = isSm ? 36 : 52

  // Show all providers on mobile
  const providers = isSm ? PROVIDERS_ALL.slice(0, 5) : PROVIDERS_ALL
  const providerCount = providers.length

  // --- Refs for measuring layout
  const containerRef = useRef<HTMLDivElement>(null)
  const cardWrapRef = useRef<HTMLDivElement>(null)
  const slotRefs = useRef<(HTMLDivElement | null)[]>([])
  const agentSlotRefs = useRef<(HTMLDivElement | null)[]>([])
  const providerContainerRefs = useRef<(HTMLDivElement | null)[]>([])
  const agentContainerRefs = useRef<(HTMLDivElement | null)[]>([])
  const adxcRef = useRef<HTMLDivElement>(null)
  const internalDataRef = useRef<HTMLDivElement>(null)
  const taskColumnRefs = useRef<(HTMLDivElement | null)[]>([])
  const tasksScrollRef = useRef<HTMLDivElement>(null)


  // --- Selection state (click to lock)
  const [selectedSubtaskLabel, setSelectedSubtaskLabel] = useState<string | null>(null)
  const [selectedTaskColumnEl, setSelectedTaskColumnEl] = useState<HTMLElement | null>(null)
  const [highlightedAgentIndex, setHighlightedAgentIndex] = useState(0)
  const [highlightedProviderIndex, setHighlightedProviderIndex] = useState<number[]>([])

  const isActive = !!selectedSubtaskLabel && !!selectedTaskColumnEl


  // --- Animation state + cached positions
  const scatteredPositions = useRef<SquarePosition[]>([])
  const slottedPositions = useRef<SquarePosition[]>([])
  const agentScatteredPositions = useRef<SquarePosition[]>([])
  const agentSlottedPositions = useRef<SquarePosition[]>([])

  const [animationState, setAnimationState] = useState<AnimationState>("scattered")
  const currentStateRef = useRef<AnimationState>("scattered")
  const [providerSquarePositions, setProviderSquarePositions] = useState<SquarePosition[]>([])
  const [agentSquarePositions, setAgentSquarePositions] = useState<SquarePosition[]>([])
  const [isReady, setIsReady] = useState(false)

  // Keep refs aligned
  useEffect(() => {
    slotRefs.current = slotRefs.current.slice(0, providerCount)
    providerContainerRefs.current = providerContainerRefs.current.slice(0, providerCount)
    agentSlotRefs.current = agentSlotRefs.current.slice(0, AGENTS_ALL.length)
    agentContainerRefs.current = agentContainerRefs.current.slice(0, AGENTS_ALL.length)
  }, [providerCount])

  // --- Helpers: compute positions from DOM measurements
  const calculateProviderScattered = useCallback((): SquarePosition[] => {
    if (!containerRef.current) return []
    const rect = containerRef.current.getBoundingClientRect()

    return PROVIDER_SCATTERED_POSITIONS.slice(0, providerCount).map((pos) => ({
      x: (parseFloat(pos.x) / 100) * rect.width - SIZE / 2,
      y: (parseFloat(pos.y) / 100) * rect.height - SIZE / 2,
      rotate: pos.rotate,
      scale: 1,
    }))
  }, [providerCount, SIZE])

  const calculateProviderSlotted = useCallback((): SquarePosition[] => {
    if (!containerRef.current) return []
    const containerRect = containerRef.current.getBoundingClientRect()

    return slotRefs.current.slice(0, providerCount).map((slot) => {
      if (!slot) return { x: 0, y: 0, rotate: 0, scale: 1 }
      const r = slot.getBoundingClientRect()
      return { x: r.left - containerRect.left, y: r.top - containerRect.top, rotate: 0, scale: 1 }
    })
  }, [providerCount])

  const calculateAgentScattered = useCallback((): SquarePosition[] => {
    if (!containerRef.current) return []
    const rect = containerRef.current.getBoundingClientRect()

    return AGENT_SCATTERED_POSITIONS.slice(0, AGENTS_ALL.length).map((pos) => ({
      x: (parseFloat(pos.x) / 100) * rect.width - SIZE / 2,
      y: (parseFloat(pos.y) / 100) * rect.height - SIZE / 2,
      rotate: pos.rotate,
      scale: 1,
    }))
  }, [SIZE])

  const calculateAgentSlotted = useCallback((): SquarePosition[] => {
    if (!containerRef.current) return []
    const containerRect = containerRef.current.getBoundingClientRect()

    return agentSlotRefs.current.map((slot) => {
      if (!slot) return { x: 0, y: 0, rotate: 0, scale: 1 }
      const r = slot.getBoundingClientRect()
      return { x: r.left - containerRect.left, y: r.top - containerRect.top, rotate: 0, scale: 1 }
    })
  }, [])

  // --- Init positions + resize
  useEffect(() => {
    const init = () => {
      if (!containerRef.current) return

      const pScatter = calculateProviderScattered()
      const pSlot = calculateProviderSlotted()
      const aScatter = calculateAgentScattered()
      const aSlot = calculateAgentSlotted()

      if (pScatter.length === 0 || pSlot.length === 0) return

      scatteredPositions.current = pScatter
      slottedPositions.current = pSlot
      agentScatteredPositions.current = aScatter
      agentSlottedPositions.current = aSlot

      currentStateRef.current = "scattered"
      setAnimationState("scattered")
      setProviderSquarePositions(pScatter)
      setAgentSquarePositions(aScatter)
      setIsReady(true)
    }

    requestAnimationFrame(() => requestAnimationFrame(init))

    const onResize = () => {
      const pScatter = calculateProviderScattered()
      const pSlot = calculateProviderSlotted()
      const aScatter = calculateAgentScattered()
      const aSlot = calculateAgentSlotted()

      if (pScatter.length) scatteredPositions.current = pScatter
      if (pSlot.length) slottedPositions.current = pSlot
      if (aScatter.length) agentScatteredPositions.current = aScatter
      if (aSlot.length) agentSlottedPositions.current = aSlot

      setProviderSquarePositions(currentStateRef.current === "scattered" ? pScatter : pSlot)
      setAgentSquarePositions(currentStateRef.current === "scattered" ? aScatter : aSlot)
    }

    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [calculateProviderScattered, calculateProviderSlotted, calculateAgentScattered, calculateAgentSlotted])

  // --- IntersectionObserver drives scattered <-> slotted
  useEffect(() => {
    if (!isReady || !cardWrapRef.current) return

    const triggerRatio = isSm ? 0.35 : 0.6

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return

        const shouldSlot = entry.isIntersecting && entry.intersectionRatio >= triggerRatio
        const newState: AnimationState = shouldSlot ? "slotted" : "scattered"
        if (newState === currentStateRef.current) return

        currentStateRef.current = newState
        setAnimationState(newState)

        const p = newState === "scattered" ? scatteredPositions.current : slottedPositions.current
        const a = newState === "scattered" ? agentScatteredPositions.current : agentSlottedPositions.current

        if (p.length) setProviderSquarePositions(p)
        if (a.length) setAgentSquarePositions(a)
      },
      { threshold: [0, 0.1, 0.2, 0.35, 0.5, 0.75, 1] }
    )

    observer.observe(cardWrapRef.current)
    return () => observer.disconnect()
  }, [isReady, isSm])

  // --- If we leave "slotted", clear selection (so nothing triggers off-screen)
  useEffect(() => {
    if (animationState !== "slotted" && isActive) {
      setSelectedSubtaskLabel(null)
      setSelectedTaskColumnEl(null)
      setHighlightedProviderIndex([])
      setHighlightedAgentIndex(0)
    }
  }, [animationState, isActive])

  // --- Subtask lookup (single source of truth)
  const getRouteForSubtask = useCallback((label: string) => {
    const flat = WORKFLOW_TASKS.flatMap((t) => t.subtasks)
    return flat.find((s) => s.label === label) ?? null
  }, [])

  // --- Auto-select the default once everything is slotted
  useEffect(() => {
    // Only apply once we're slotted, and only if nothing is selected yet.
    if (animationState !== "slotted") return
    if (selectedSubtaskLabel) return

    const route = getRouteForSubtask(DEFAULT_SUBTASK_LABEL)
    if (!route) return

    // Find which task column contains the default subtask.
    const taskIdx = WORKFLOW_TASKS.findIndex((t) =>
      t.subtasks.some((s) => s.label === DEFAULT_SUBTASK_LABEL)
    )
    if (taskIdx === -1) return

    const colEl = taskColumnRefs.current[taskIdx]
    if (!colEl) return

    setSelectedSubtaskLabel(DEFAULT_SUBTASK_LABEL)
    setSelectedTaskColumnEl(colEl)
    setHighlightedAgentIndex(route.agentIndex)
    setHighlightedProviderIndex(route.providerIndex)
  }, [animationState, selectedSubtaskLabel, getRouteForSubtask])


  // --- Click handler: click to lock / click again to clear
  const handleSubtaskSelect = useCallback(
    (subtaskLabel: string, taskColumnEl: HTMLElement) => {
      // Block interaction until slotted
      if (currentStateRef.current !== "slotted") return

      // Toggle off if clicking same subtask
      if (selectedSubtaskLabel === subtaskLabel) {
        setSelectedSubtaskLabel(null)
        setSelectedTaskColumnEl(null)
        setHighlightedProviderIndex([])
        setHighlightedAgentIndex(0)
        return
      }

      const route = getRouteForSubtask(subtaskLabel)
      if (!route) return

      setSelectedSubtaskLabel(subtaskLabel)
      setSelectedTaskColumnEl(taskColumnEl)
      setHighlightedAgentIndex(route.agentIndex)
      setHighlightedProviderIndex(route.providerIndex)
    },
    [getRouteForSubtask, selectedSubtaskLabel]
  )

  // --- Shadows
  const defaultShadow =
    "0 4px 6px -1px rgba(0, 0, 0, 0.10), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
  const scatteredShadow =
    "0 0 40px 15px rgba(102, 2, 60, 0.15), 0 0 60px 25px rgba(102, 2, 60, 0.08), 0 0 80px 35px rgba(102, 2, 60, 0.04)"

  const isAnimating = useRef(false)

  return (
    <div
      ref={containerRef}
      className="relative w-full"
    >

      {/* Only show lines when slotted + a selection exists */}
      {animationState === "slotted" && isActive && (
        <svg className="pointer-events-none absolute inset-0 z-30 h-full w-full">
          <ConnectionLines
            containerRef={containerRef}
            adxcRef={adxcRef}
            internalDataRef={internalDataRef}
            providerContainerRefs={providerContainerRefs}
            agentContainerRefs={agentContainerRefs}
            highlightedAgentIndex={highlightedAgentIndex}
            highlightedProviderIndex={highlightedProviderIndex}
            taskColumnEl={selectedTaskColumnEl}
            tasksScrollRef={tasksScrollRef}
          />
        </svg>
      )}

      {/* --- Provider squares */}
      {isReady &&
        providerSquarePositions.slice(0, providerCount).map((pos, index) => {
          const isHighlighted = isActive && highlightedProviderIndex.includes(index)

          const boxShadow = isHighlighted || animationState === "scattered" ? scatteredShadow : defaultShadow

          return (
            <motion.div
              key={`provider-${index}`}
              // ref={(el) => { squareRefs.current[index] = el; }}
              className={`absolute z-20 rounded-lg shadow-lg flex items-center justify-center transition-colors duration-300 ${isHighlighted
                ? "bg-adxc/20 border-2 border-adxc"
                : "bg-stone-200 border border-stone-300"
                }`}
              style={{
                width: SIZE,
                height: SIZE,
                willChange: isAnimating.current ? "transform" : "auto",
                boxShadow
              }}
              initial={false}
              animate={{ x: pos.x, y: pos.y, rotate: pos.rotate, scale: isHighlighted ? 1.1 : pos.scale }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                    duration: ANIMATION_DURATION,
                    ease: ANIMATION_EASING,
                  }
              }
              onAnimationStart={() => {
                isAnimating.current = true
              }}
              onAnimationComplete={() => {
                isAnimating.current = false
              }}
            >
              <span
                className={`relative w-5 h-5 relative flex items-center transition-colors duration-300 ${isHighlighted
                  ? "text-adxc"
                  : "text-stone-600"
                  }`}
              >
                <Database strokeWidth={2} />
              </span>

            </motion.div>
          )
        })}

      {/* --- Agent squares */}
      {isReady &&
        agentSquarePositions.map((pos, index) => {
          const isHighlighted = isActive && highlightedAgentIndex === index

          const boxShadow = isHighlighted || animationState === "scattered" ? scatteredShadow : defaultShadow

          return (
            <motion.div
              key={`agent-${index}`}
              className={`absolute z-20 rounded-lg shadow-lg flex items-center justify-center transition-colors duration-300 ${isHighlighted
                ? "bg-adxc/20 border-2 border-adxc"
                : "bg-stone-200 border border-stone-300"
                }`}
              style={{
                width: SIZE,
                height: SIZE,
                willChange: isAnimating.current ? "transform" : "auto",
                boxShadow
              }}
              initial={false}
              animate={{ x: pos.x, y: pos.y, rotate: pos.rotate, scale: isHighlighted ? 1.1 : pos.scale }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                    duration: ANIMATION_DURATION,
                    ease: ANIMATION_EASING,
                  }
              }
              onAnimationStart={() => {
                isAnimating.current = true
              }}
              onAnimationComplete={() => {
                isAnimating.current = false
              }}
            >
              <span
                className={`relative w-5 h-5 relative flex items-center transition-colors duration-300 ${isHighlighted
                  ? "text-adxc"
                  : "text-stone-600"
                  }`}
              >
                {/* <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#66023C] opacity-75"></span> */}
                <Sparkles strokeWidth={2} />
              </span>

            </motion.div>
          )
        })}

      {/* --- Card in normal flow */}
      <div ref={cardWrapRef} className="relative z-0 flex justify-center pt-0">
        <Card className="bg-card/80 backdrop-blur-xl shadow-2xl border-border/50 py-0 max-w-full">
          <CardContent className="relative p-4 md:p-8">

            {/* Data Providers */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs text-muted-foreground uppercase tracking-wider">Data Providers</h3>
              </div>
              <div className="relative bg-stone-50/30 rounded-xl p-2 border border-border/20">
                <div className="flex gap-4 sm:gap-8 md:gap-16 justify-center">
                  {providers.map((provider, index) => (
                    <div
                      key={provider.name}
                      className="flex flex-col items-center gap-3 w-[50px] md:w-[70px]"
                      ref={(el) => {
                        providerContainerRefs.current[index] = el
                      }}
                    >
                      <div
                        ref={(el) => {
                          slotRefs.current[index] = el
                        }}
                        className={`rounded-xl border-2 border-dashed transition-all duration-300 ${animationState === "slotted" ? "border-transparent" : "border-border/50"
                          }`}
                        style={{ width: SIZE, height: SIZE }}
                      />
                      {/* <div className="text-center"> */}
                      <p className="text-[10px] sm:text-xs text-stone-600 text-center">{provider.name}</p>
                      {/* </div> */}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bridge + internal data */}
            <div className="mt-16 sm:mt-12 relative">
              <div className="grid grid-cols-[2fr_auto_1fr] gap-0 items-center">

                <div>
                  <div className="flex items-center justify-between">
                  </div>
                  <motion.div
                    ref={adxcRef}
                    className="w-full bg-adxc rounded-xl flex items-center justify-center p-2 sm:p-4 border-2 border-transparent"
                  >

                    {/* <span className="absolute w-8 h-8 animate-ping rounded-full bg-pink-700 opacity-75"></span> */}

                    <span className="text-xl sm:text-3xl text-primary-foreground font-bold tracking-[0.3em]">ADXC</span>
                  </motion.div>
                </div>

                <div className="flex items-center justify-center px-4">
                  <div className="w-4 sm:w-16 h-[1px] rounded-full bg-stone-300" style={{ background: 'repeating-linear-gradient(90deg, #d6d3d1 0, #d6d3d1 4px, transparent 4px, transparent 12px)' }} />
                </div>

                <div ref={internalDataRef}>
                  <div className="w-full bg-stone-100 rounded-xl flex items-center justify-center p-2 sm:p-4 border-2 border-stone-200">
                    <span className="text-xs md:text-sm font-medium text-stone-600 text-center">Internal / 1P Data</span>
                  </div>
                </div>
              </div>
            </div>


            {/* AI Agentic Ecosystem */}
            <div className="mt-12 sm:mt-8 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs text-muted-foreground uppercase tracking-wider">Your AI Agentic Ecosystem</h3>
              </div>

              <div className="relative bg-stone-50/30 rounded-xl p-2 border border-border/20">
                <div className="flex gap-4 sm:gap-8 md:gap-16 justify-center">
                  {AGENTS_ALL.map((agent, index) => (
                    <div
                      key={agent.name}
                      className="flex flex-col items-center gap-3 w-[60px] md:w-[60px]"
                      ref={(el) => {
                        agentContainerRefs.current[index] = el
                      }}
                    >
                      <div
                        ref={(el) => {
                          agentSlotRefs.current[index] = el
                        }}
                        className={`relative rounded-xl border-2 border-dashed transition-all duration-300 ${animationState === "slotted" ? "border-transparent" : "border-border/40"
                          }`}
                        style={{ width: SIZE, height: SIZE }}
                      />

                      <p className="text-[10px] sm:text-xs text-stone-600 text-center">
                        {agent.name}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Workflow Tasks (click to lock selection) */}
            <div className="mt-12 sm:mt-8 space-y-2">

              <div className="flex flex-col gap-1">
                <h3 className="text-xs text-muted-foreground uppercase tracking-wider">
                  Example marketing tasks by stage
                </h3>
              </div>


              <div className="relative rounded-xl border border-border/20 bg-stone-50/30 p-2">
                <div ref={tasksScrollRef} className="-mx-2 overflow-x-auto px-2">
                  <div className="grid grid-cols-5 gap-1" style={{ minWidth: 900 }}>
                    {WORKFLOW_TASKS.map((item, taskIdx) => (
                      <div
                        key={item.task}
                        className="p-2"
                        data-task-column
                        ref={(el) => {
                          taskColumnRefs.current[taskIdx] = el
                        }}
                      >
                        <p className="mb-3 flex min-h-[40px] w-full items-center justify-center rounded-full bg-stone-200 px-2 text-center text-xs font-semibold text-adxc">
                          {item.task}
                        </p>

                        <div className="flex flex-col items-center gap-2">
                          {item.subtasks.map((subtask) => {
                            const isSelected = selectedSubtaskLabel === subtask.label

                            return (
                              <span
                                key={subtask.label}
                                className={`relative flex w-full cursor-pointer items-center justify-center rounded-full border px-1 py-1 text-center text-xs transition-colors duration-200 ${isSelected
                                  ? "border-adxc bg-adxc/10 text-adxc"
                                  : "border-transparent bg-stone-50 text-stone-600 hover:border-adxc hover:bg-adxc/10"
                                  }`}
                                onClick={(e) => {
                                  const col = e.currentTarget.closest("[data-task-column]") as HTMLElement | null
                                  if (!col) return
                                  handleSubtaskSelect(subtask.label, col)
                                }}
                              >
                                {/* <span className="absolute h-4 w-4 animate-ping rounded-full bg-[#66023C] opacity-75" /> */}
                                <span className="relative">{subtask.label}</span>
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-2 flex lg:hidden items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-adxc opacity-60"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-adxc"></span>
                </span>
                <p className="text-xs text-muted-foreground/80">
                  Click on different subtasks to see how data flows change
                </p>
              </div>

            </div>



            <p className="mx-auto mt-6 max-w-3xl text-center text-xs italic text-muted-foreground">
              For illustrative purposes only
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Scroll-to-top (still useful even without scroll threshold logic) */}
      <motion.div
        className="fixed bottom-8 right-8 z-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: animationState === "slotted" ? 1 : 0,
          scale: animationState === "slotted" ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-card/90 backdrop-blur-sm rounded-full p-4 shadow-lg border border-border/50 hover:bg-card transition-colors"
          aria-label="Scroll to top"
        >
          <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </motion.div>
    </div >
  )
}


/* ------------------------------------------
   Connection Lines (dotted, light grey)
------------------------------------------ */
function ConnectionLines({
  containerRef,
  adxcRef,
  internalDataRef,
  providerContainerRefs,
  agentContainerRefs,
  highlightedAgentIndex,
  highlightedProviderIndex,
  taskColumnEl,
  tasksScrollRef
}: {
  containerRef: React.RefObject<HTMLDivElement | null>
  adxcRef: React.RefObject<HTMLDivElement | null>
  internalDataRef: React.RefObject<HTMLDivElement | null>
  providerContainerRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  agentContainerRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  highlightedAgentIndex: number
  highlightedProviderIndex: number[]
  taskColumnEl: HTMLElement | null
  tasksScrollRef: React.RefObject<HTMLDivElement | null>
}) {
  const [paths, setPaths] = useState<{ d: string; isOneWay?: boolean }[]>([])

  // Generate soft-cornered angled path (L-shape with rounded corner)
  const createCurvedPath = (x1: number, y1: number, x2: number, y2: number): string => {
    // Go vertical first, then horizontal with a soft corner
    const midY = y1 + (y2 - y1) * 0.5
    const cornerRadius = Math.min(Math.abs(x2 - x1) * 0.3, Math.abs(y2 - y1) * 0.3, 30)

    // Determine direction
    const goingUp = y2 < y1
    const goingRight = x2 > x1

    if (goingUp) {
      // Path goes upward: start → go up → soft corner → go horizontal to end
      const cornerY = midY + cornerRadius * (goingUp ? 1 : -1)
      const cornerEndY = midY - cornerRadius * (goingUp ? 1 : -1)

      return `M ${x1} ${y1} 
              L ${x1} ${cornerY} 
              Q ${x1} ${midY}, ${x1 + (goingRight ? cornerRadius : -cornerRadius)} ${midY}
              L ${x2 - (goingRight ? cornerRadius : -cornerRadius)} ${midY}
              Q ${x2} ${midY}, ${x2} ${cornerEndY}
              L ${x2} ${y2}`
    } else {
      // Path goes downward
      const cornerY = midY - cornerRadius
      const cornerEndY = midY + cornerRadius

      return `M ${x1} ${y1} 
              L ${x1} ${cornerY} 
              Q ${x1} ${midY}, ${x1 + (goingRight ? cornerRadius : -cornerRadius)} ${midY}
              L ${x2 - (goingRight ? cornerRadius : -cornerRadius)} ${midY}
              Q ${x2} ${midY}, ${x2} ${cornerEndY}
              L ${x2} ${y2}`
    }
  }

  // useEffect(() => {
  //   const container = containerRef.current
  //   const adxc = adxcRef.current
  //   const internalData = internalDataRef.current
  //   const agentContainer = agentContainerRefs.current[highlightedAgentIndex]

  //   // if (!container || !adxc || !agentContainer || !hoveredSubtaskRef) return
  //   if (!container || !adxc || !agentContainer || !taskColumnEl) return

  //   const containerRect = container.getBoundingClientRect()
  //   const adxcRect = adxc.getBoundingClientRect()
  //   const taskRect = taskColumnEl.getBoundingClientRect()
  //   const agentRect = agentContainer.getBoundingClientRect()

  //   const newPaths: { d: string; isOneWay?: boolean }[] = []

  //   // Start point = task column top center (stable + looks clean)
  //   const taskX = taskRect.left - containerRect.left + taskRect.width / 2
  //   const taskY = taskRect.top - containerRect.top

  //   // Agent point = agent container bottom center
  //   const agentX = agentRect.left - containerRect.left + agentRect.width / 2
  //   const agentTopY = agentRect.top - containerRect.top
  //   const agentBottomY = agentRect.bottom - containerRect.top

  //   // ADXC points
  //   const adxcX = adxcRect.left - containerRect.left + adxcRect.width / 2
  //   const adxcTopY = adxcRect.top - containerRect.top
  //   const adxcBottomY = adxcRect.bottom - containerRect.top

  //   // Path 1: Task → Agent
  //   newPaths.push({
  //     d: createCurvedPath(taskX, taskY, agentX, agentBottomY + 5),
  //   })

  //   // Path 2: Agent → ADXC
  //   newPaths.push({
  //     d: createCurvedPath(agentX, agentTopY - 5, adxcX, adxcBottomY + 5),
  //   })

  //   // Path 3: ADXC → Providers
  //   highlightedProviderIndex.forEach((providerIndex) => {
  //     const providerContainer = providerContainerRefs.current[providerIndex]
  //     if (!providerContainer) return
  //     const r = providerContainer.getBoundingClientRect()
  //     const px = r.left - containerRect.left + r.width / 2
  //     const py = r.bottom - containerRect.top

  //     newPaths.push({
  //       d: createCurvedPath(adxcX, adxcTopY - 5, px, py + 5),
  //     })
  //   })


  //   // Path 4: Internal Data → ADXC (one-way)
  //   if (internalData) {
  //     const internalRect = internalData.getBoundingClientRect()
  //     const internalLeftX = internalRect.left - containerRect.left
  //     const adxcRightX = adxcRect.right - containerRect.left
  //     const adxcCenterY = adxcRect.top - containerRect.top + adxcRect.height / 2
  //     newPaths.push({
  //       d: `M ${internalLeftX - 5} ${adxcCenterY} L ${adxcRightX + 5} ${adxcCenterY}`,
  //       isOneWay: true,
  //     })
  //   }

  //   setPaths(newPaths)
  // }, [
  //   containerRef,
  //   adxcRef,
  //   internalDataRef,
  //   providerContainerRefs,
  //   agentContainerRefs,
  //   highlightedAgentIndex,
  //   highlightedProviderIndex,
  //   taskColumnEl,
  // ])

  const recalc = useCallback(() => {
    const container = containerRef.current
    const adxc = adxcRef.current
    const internalData = internalDataRef.current
    const agentContainer = agentContainerRefs.current[highlightedAgentIndex]

    if (!container || !adxc || !agentContainer || !taskColumnEl) return

    const containerRect = container.getBoundingClientRect()
    const adxcRect = adxc.getBoundingClientRect()
    const taskRect = taskColumnEl.getBoundingClientRect()
    const agentRect = agentContainer.getBoundingClientRect()

    const newPaths: { d: string; isOneWay?: boolean }[] = []

    const taskX = taskRect.left - containerRect.left + taskRect.width / 2
    const taskY = taskRect.top - containerRect.top

    const agentX = agentRect.left - containerRect.left + agentRect.width / 2
    const agentTopY = agentRect.top - containerRect.top
    const agentBottomY = agentRect.bottom - containerRect.top

    const adxcX = adxcRect.left - containerRect.left + adxcRect.width / 2
    const adxcTopY = adxcRect.top - containerRect.top
    const adxcBottomY = adxcRect.bottom - containerRect.top

    newPaths.push({ d: createCurvedPath(taskX, taskY, agentX, agentBottomY + 5) })
    newPaths.push({ d: createCurvedPath(agentX, agentTopY - 5, adxcX, adxcBottomY + 5) })

    highlightedProviderIndex.forEach((providerIndex) => {
      const providerContainer = providerContainerRefs.current[providerIndex]
      if (!providerContainer) return
      const r = providerContainer.getBoundingClientRect()
      const px = r.left - containerRect.left + r.width / 2
      const py = r.bottom - containerRect.top
      newPaths.push({ d: createCurvedPath(adxcX, adxcTopY - 5, px, py + 5) })
    })

    if (internalData) {
      const internalRect = internalData.getBoundingClientRect()
      const internalLeftX = internalRect.left - containerRect.left
      const adxcRightX = adxcRect.right - containerRect.left
      const adxcCenterY = adxcRect.top - containerRect.top + adxcRect.height / 2
      newPaths.push({
        d: `M ${internalLeftX - 5} ${adxcCenterY} L ${adxcRightX + 5} ${adxcCenterY}`,
        isOneWay: true,
      })
    }

    setPaths(newPaths)
  }, [
    containerRef,
    adxcRef,
    internalDataRef,
    providerContainerRefs,
    agentContainerRefs,
    highlightedAgentIndex,
    highlightedProviderIndex,
    taskColumnEl,
  ])


  useEffect(() => {
    recalc()
  }, [recalc])


  useEffect(() => {
    const scroller = tasksScrollRef.current
    if (!scroller) return

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(recalc)
    }

    scroller.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      scroller.removeEventListener("scroll", onScroll)
    }
  }, [tasksScrollRef, recalc])


  return (
    <>
      {paths.map((path, index) => {
        // Internal Data → ADXC path is one-way (index === paths.length - 1, added last)
        const isOneWay = path.isOneWay

        return (
          <g key={index}>
            {/* Main path */}
            <motion.path
              id={`connection-path-${index}`}
              d={path.d}
              fill="none"
              stroke="#77244d"
              strokeWidth="3"
              strokeDasharray="1 8"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{
                duration: 0.4,
                delay: index * 0.15,
                ease: [0.32, 0.72, 0, 1],
              }}
            />
            {/* Forward traveling dot - muted light color */}
            <circle r="5" fill="#f1e5ea">
              <animateMotion
                dur="3s"
                repeatCount="indefinite"
                begin={`${index * 0.15 + 0.4}s`}
              >
                <mpath href={`#connection-path-${index}`} />
              </animateMotion>
            </circle>
            {/* Reverse traveling dot - burgundy (only for bidirectional paths) */}
            {!isOneWay && (
              <circle r="5" fill="#66023C">
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  begin={`${index * 0.15 + 0.4 + 1.5}s`}
                  keyPoints="1;0"
                  keyTimes="0;1"
                >
                  <mpath href={`#connection-path-${index}`} />
                </animateMotion>
              </circle>
            )}
          </g>
        )
      })}
      {/* Endpoint dots */}
      {paths.map((path, index) => {
        const parts = path.d
          .split(/[MLQ,\s]+/)
          .filter(Boolean)
          .map(Number)
        const startX = parts[0]
        const startY = parts[1]
        const endX = parts[parts.length - 2]
        const endY = parts[parts.length - 1]

        return (
          <g key={`dots-${index}`}>
            <motion.circle
              cx={startX}
              cy={startY}
              r="3"
              fill="#f1e5ea"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, delay: index * 0.15 }}
            />
            <motion.circle
              cx={endX}
              cy={endY}
              r="3"
              fill="#f1e5ea"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, delay: index * 0.15 + 0.35 }}
            />
          </g>
        )
      })}
    </>
  )
}
