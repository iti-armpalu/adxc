"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Zap, Star, Heart, Diamond, Flame, Bot, Sparkles, Cpu, Database } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"

// --- Animation config
const ANIMATION_DURATION = 1
const ANIMATION_EASING = [0.32, 0.72, 0, 1] as const

// Keep sizes unchanged (per your request)
const SQUARE_SIZE = 56
const SLOT_SIZE = 56
const AGENT_SQUARE_SIZE = 44
const AGENT_SLOT_SIZE = 44

// Desktop scattered positions (5)
const SCATTERED_POSITIONS = [
  { x: "8%", y: "10%", rotate: -12 },
  { x: "95%", y: "8%", rotate: 18 },
  { x: "5%", y: "35%", rotate: 8 },
  { x: "82%", y: "52%", rotate: -15 },
  { x: "21%", y: "47%", rotate: 22 },
]

// Mobile scattered positions (3) — tuned for narrow screens
const SCATTERED_POSITIONS_MOBILE = [
  { x: "12%", y: "10%", rotate: -12 },
  { x: "86%", y: "12%", rotate: 18 },
  { x: "50%", y: "26%", rotate: 10 },
]

// Agent scattered positions (3)
const AGENT_SCATTERED_POSITIONS = [
  { x: "15%", y: "35%", rotate: -15 },
  { x: "72%", y: "28%", rotate: 20 },
  { x: "88%", y: "46%", rotate: -8 },
]

const SQUARE_COLORS = ["bg-[#66023c]", "bg-[#66023c]", "bg-[#66023c]", "bg-[#66023c]", "bg-[#66023c]"]
const AGENT_COLORS = ["bg-[#e95014]", "bg-[#e95014]", "bg-[#e95014]"]

const SQUARE_ICONS = [Database, Database, Database, Database, Database]
const AGENT_ICONS = [Sparkles, Sparkles, Sparkles]

// Providers (5 on desktop, 3 on mobile)
const PROVIDERS_ALL = [
  { name: "Kantar", role: "Market Research" },
  { name: "Nielsen", role: "Audience Data" },
  { name: "Experian", role: "Consumer Insights" },
  { name: "Circana (IRI)", role: "Retail & CPG Data" },
  { name: "Comscore", role: "Digital Measurement" },
] as const

type AnimationState = "scattered" | "slotted"

interface HoverState {
  isHovering: boolean
  highlightedAgentIndex: number
  highlightedSquareIndices: number[]
}

interface SquarePosition {
  x: number
  y: number
  rotate: number
  scale: number
}

// Small helper: detect <= sm screens in JS (so we can change rendering + measurements)
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

  // Only show 3 providers on mobile
  const providers = isSm ? PROVIDERS_ALL.slice(0, 3) : PROVIDERS_ALL
  const providerCount = providers.length

  const containerRef = useRef<HTMLDivElement>(null)
  const cardWrapRef = useRef<HTMLDivElement>(null) // observed by IntersectionObserver
  const slotRefs = useRef<(HTMLDivElement | null)[]>([])
  const agentSlotRefs = useRef<(HTMLDivElement | null)[]>([])
  const agentCardRef = useRef<HTMLDivElement>(null)
  const adxcRef = useRef<HTMLDivElement>(null)

  const [hoverState, setHoverState] = useState<HoverState>({
    isHovering: false,
    highlightedAgentIndex: 0,
    highlightedSquareIndices: [],
  })

  // Random highlight indices (agents: 3, squares: providerCount)
  const getRandomHighlights = useCallback(() => {
    const agentIndex = Math.floor(Math.random() * 3)
    const squareIndices: number[] = []
    while (squareIndices.length < 2) {
      const idx = Math.floor(Math.random() * providerCount)
      if (!squareIndices.includes(idx)) squareIndices.push(idx)
    }
    return { agentIndex, squareIndices }
  }, [providerCount])

  // Cached position sets
  const scatteredPositions = useRef<SquarePosition[]>([])
  const slottedPositions = useRef<SquarePosition[]>([])
  const agentScatteredPositions = useRef<SquarePosition[]>([])
  const agentSlottedPositions = useRef<SquarePosition[]>([])

  const [animationState, setAnimationState] = useState<AnimationState>("scattered")
  const currentStateRef = useRef<AnimationState>("scattered")

  const [squarePositions, setSquarePositions] = useState<SquarePosition[]>([])
  const [agentSquarePositions, setAgentSquarePositions] = useState<SquarePosition[]>([])
  const [isReady, setIsReady] = useState(false)

  // Keep refs aligned with rendered provider slots
  useEffect(() => {
    slotRefs.current = slotRefs.current.slice(0, providerCount)
  }, [providerCount])

  // Scattered positions depend on container size + breakpoint (3 vs 5)
  const calculateScatteredPositions = useCallback((): SquarePosition[] => {
    if (!containerRef.current) return []
    const containerRect = containerRef.current.getBoundingClientRect()

    const scatter = (isSm ? SCATTERED_POSITIONS_MOBILE : SCATTERED_POSITIONS).slice(0, providerCount)

    return scatter.map((pos) => ({
      x: (Number.parseFloat(pos.x) / 100) * containerRect.width - SQUARE_SIZE / 2,
      y: (Number.parseFloat(pos.y) / 100) * containerRect.height - SQUARE_SIZE / 2,
      rotate: pos.rotate,
      scale: 1,
    }))
  }, [isSm, providerCount])

  // Slotted positions come from measuring the rendered slots
  const calculateSlottedPositions = useCallback((): SquarePosition[] => {
    if (!containerRef.current) return []
    const containerRect = containerRef.current.getBoundingClientRect()

    return slotRefs.current.slice(0, providerCount).map((slot) => {
      if (!slot) return { x: 0, y: 0, rotate: 0, scale: 1 }
      const slotRect = slot.getBoundingClientRect()
      return {
        x: slotRect.left - containerRect.left + (SLOT_SIZE - SQUARE_SIZE) / 2,
        y: slotRect.top - containerRect.top + (SLOT_SIZE - SQUARE_SIZE) / 2,
        rotate: 0,
        scale: 1,
      }
    })
  }, [providerCount])

  const calculateAgentScatteredPositions = useCallback((): SquarePosition[] => {
    if (!containerRef.current) return []
    const containerRect = containerRef.current.getBoundingClientRect()

    return AGENT_SCATTERED_POSITIONS.map((pos) => ({
      x: (parseFloat(pos.x) / 100) * containerRect.width - AGENT_SQUARE_SIZE / 2,
      y: (parseFloat(pos.y) / 100) * containerRect.height - AGENT_SQUARE_SIZE / 2,
      rotate: pos.rotate,
      scale: 1,
    }))
  }, [])

  const calculateAgentSlottedPositions = useCallback((): SquarePosition[] => {
    if (!containerRef.current) return []
    const containerRect = containerRef.current.getBoundingClientRect()

    return agentSlotRefs.current.map((slot) => {
      if (!slot) return { x: 0, y: 0, rotate: 0, scale: 1 }
      const slotRect = slot.getBoundingClientRect()
      return {
        x: slotRect.left - containerRect.left + (AGENT_SLOT_SIZE - AGENT_SQUARE_SIZE) / 2,
        y: slotRect.top - containerRect.top + (AGENT_SLOT_SIZE - AGENT_SQUARE_SIZE) / 2,
        rotate: 0,
        scale: 1,
      }
    })
  }, [])

  // Init (and re-init when breakpoint/provider count changes)
  useEffect(() => {
    const initPositions = () => {
      if (!containerRef.current) return

      const scattered = calculateScatteredPositions()
      const slotted = calculateSlottedPositions()
      const agentScattered = calculateAgentScatteredPositions()
      const agentSlotted = calculateAgentSlottedPositions()

      // If slotted is empty, refs likely haven't attached yet
      if (scattered.length === 0 || slotted.length === 0) return

      scatteredPositions.current = scattered
      slottedPositions.current = slotted
      agentScatteredPositions.current = agentScattered
      agentSlottedPositions.current = agentSlotted

      // Start scattered; IntersectionObserver will set the correct state immediately
      currentStateRef.current = "scattered"
      setAnimationState("scattered")
      setSquarePositions(scattered)
      setAgentSquarePositions(agentScattered)

      setIsReady(true)
    }

    // Wait for layout to settle (refs, wrapping)
    requestAnimationFrame(() => requestAnimationFrame(initPositions))

    // Recalculate on resize
    const handleResize = () => {
      const scattered = calculateScatteredPositions()
      const slotted = calculateSlottedPositions()
      const agentScattered = calculateAgentScatteredPositions()
      const agentSlotted = calculateAgentSlottedPositions()

      if (scattered.length > 0) scatteredPositions.current = scattered
      if (slotted.length > 0) slottedPositions.current = slotted
      if (agentScattered.length > 0) agentScatteredPositions.current = agentScattered
      if (agentSlotted.length > 0) agentSlottedPositions.current = agentSlotted

      setSquarePositions(currentStateRef.current === "scattered" ? scattered : slotted)
      setAgentSquarePositions(currentStateRef.current === "scattered" ? agentScattered : agentSlotted)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [
    calculateScatteredPositions,
    calculateSlottedPositions,
    calculateAgentScatteredPositions,
    calculateAgentSlottedPositions,
  ])

  // IntersectionObserver drives scattered <-> slotted (no scroll listener)
  useEffect(() => {
    if (!isReady) return
    if (!cardWrapRef.current) return

    // Mobile triggers later (more card visible before slotting)
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

        const targetPositions = newState === "scattered" ? scatteredPositions.current : slottedPositions.current
        const agentTargetPositions =
          newState === "scattered" ? agentScatteredPositions.current : agentSlottedPositions.current

        if (targetPositions.length > 0) setSquarePositions(targetPositions)
        if (agentTargetPositions.length > 0) setAgentSquarePositions(agentTargetPositions)
      },
      {
        root: null,
        // multiple thresholds => more reliable ratio updates across browsers
        threshold: [0, 0.1, 0.2, 0.35, 0.5, 0.75, 1],
      }
    )

    observer.observe(cardWrapRef.current)
    return () => observer.disconnect()
  }, [isReady, isSm])

  const isAnimating = useRef(false)

  // Hover highlight handler (desktop UX; harmless on mobile)
  const handleSubtaskHover = useCallback(
    (isHovering: boolean) => {
      if (isHovering) {
        const { agentIndex, squareIndices } = getRandomHighlights()
        setHoverState({
          isHovering: true,
          highlightedAgentIndex: agentIndex,
          highlightedSquareIndices: squareIndices,
        })
      } else {
        setHoverState({
          isHovering: false,
          highlightedAgentIndex: 0,
          highlightedSquareIndices: [],
        })
      }
    },
    [getRandomHighlights]
  )

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Provider squares (only 3 on mobile, 5 on desktop) */}
      {isReady &&
        squarePositions.slice(0, providerCount).map((pos, index) => {
          const Icon = SQUARE_ICONS[index]
          const isHighlighted = hoverState.isHovering && hoverState.highlightedSquareIndices.includes(index)

          const defaultShadow =
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"

          const scatteredShadow =
            "0 0 40px 15px rgba(102, 2, 60, 0.15), 0 0 60px 25px rgba(102, 2, 60, 0.08), 0 0 80px 35px rgba(102, 2, 60, 0.04)"

          const boxShadow = isHighlighted || animationState === "scattered" ? scatteredShadow : defaultShadow

          return (
            <motion.div
              key={index}
              className={`absolute z-20 rounded-xl shadow-lg ${SQUARE_COLORS[index]} flex items-center justify-center`}
              style={{
                width: SQUARE_SIZE,
                height: SQUARE_SIZE,
                willChange: isAnimating.current ? "transform" : "auto",
                boxShadow,
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
              {/* <Icon className="w-6 h-6 text-white" strokeWidth={2.5} /> */}
              <span className="relative w-6 h-6 text-white relative flex items-center">

                {isHighlighted && !prefersReducedMotion && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-800 opacity-75"></span>
                )}
                <Icon className="" strokeWidth={2.5} />
              </span>
            </motion.div>
          )
        })}

      {/* Agent squares */}
      {isReady &&
        agentSquarePositions.map((pos, index) => {
          const Icon = AGENT_ICONS[index]
          const isHighlighted = hoverState.isHovering && hoverState.highlightedSquareIndices.includes(index)

          const defaultShadow =
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"

          const scatteredShadow =
            "0 0 40px 15px rgba(233, 80, 20, 0.15), 0 0 60px 25px rgba(233, 80, 20, 0.08), 0 0 80px 35px rgba(233, 80, 20, 0.04)"

          const boxShadow = isHighlighted || animationState === "scattered" ? scatteredShadow : defaultShadow

          return (
            <motion.div
              key={`agent-${index}`}
              className={`absolute z-20 rounded-lg shadow-lg ${AGENT_COLORS[index]} flex items-center justify-center`}
              style={{
                width: AGENT_SQUARE_SIZE,
                height: AGENT_SQUARE_SIZE,
                willChange: isAnimating.current ? "transform" : "auto",
                boxShadow,
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
              {/* <Icon className="w-5 h-5 text-white" strokeWidth={2.5} /> */}
              <span className="relative w-5 h-5 text-white relative flex items-center">

                {isHighlighted && !prefersReducedMotion && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                )}
                <Icon className="" strokeWidth={2.5} />
              </span>

            </motion.div>
          )
        })}

      {/* Card in normal flow (container grows naturally; no min-h hacks) */}
      <div ref={cardWrapRef} className="relative z-0 flex justify-center pt-0">
        <Card className="bg-card/80 backdrop-blur-xl shadow-2xl border-border/50 py-0 w-[900px] max-w-[90vw]">
          <CardContent className="p-4 sm:p-8">
            {/* Data Providers */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs text-muted-foreground uppercase tracking-wider">Data Providers</h3>
                {/* <span
                  className={`text-xs px-2.5 py-1 rounded-full transition-all duration-300 ${animationState === "slotted"
                    ? "bg-green-500/15 text-green-400"
                    : "bg-muted text-muted-foreground"
                    }`}
                >
                  {animationState === "slotted" ? "Connected" : "Waiting"}
                </span> */}
              </div>

              <div className="flex items-center justify-center gap-6 py-4 bg-muted/30 rounded-xl border border-border/20">
                {providers.map((provider, index) => (
                  <div key={provider.name} className="flex flex-col items-center gap-3">
                    <div
                      ref={(el) => {
                        slotRefs.current[index] = el
                      }}
                      className={`rounded-xl border-2 border-dashed transition-all duration-300 ${animationState === "slotted" ? "border-transparent" : "border-border/50"
                        }`}
                      style={{ width: SLOT_SIZE, height: SLOT_SIZE }}
                    />
                    <div className="text-center">
                      <p className="text-xs font-medium text-foreground">{provider.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bridge + internal data */}
            <div className="mt-8 relative">
              <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-0 items-stretch">

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs text-muted-foreground uppercase tracking-wider">Infrastructure Bridge</h3>
                  </div>
                  <motion.div
                    ref={adxcRef}
                    className="w-full bg-gradient-to-r from-primary/90 to-primary rounded-xl flex items-center justify-center py-5 border-2 border-transparent"
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-xl sm:text-3xl text-primary-foreground font-bold tracking-[0.3em]">ADXC</span>
                  </motion.div>
                </div>

                <div className="hidden sm:flex items-center justify-center px-4 mt-6">
                  <div className="flex items-center">
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[10px] border-l-primary/60" />
                    <div className="w-16 h-[2px] animated-flow-line" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs text-muted-foreground uppercase tracking-wider">Your Internal Data</h3>
                    {/* <span
                      className={`text-xs px-2.5 py-1 rounded-full transition-all duration-300 ${animationState === "slotted"
                        ? "bg-green-500/15 text-green-400"
                        : "bg-muted text-muted-foreground"
                        }`}
                    >
                      {animationState === "slotted" ? "Linked" : "Waiting"}
                    </span> */}
                  </div>


                  <div
                    className="w-full bg-muted rounded-xl flex items-center justify-center py-5 border-2 border-transparent"
                  >
                    <span className="text-sm font-medium text-foreground">Internal / 1P Data</span>
                  </div>

                </div>
              </div>
            </div>

            {/* AI Agentic Ecosystem */}
            <div className="mt-8 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs text-muted-foreground uppercase tracking-wider">Your AI Agentic Ecosystem</h3>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full transition-all duration-300 ${animationState === "slotted"
                    ? "bg-green-500/15 text-green-400"
                    : "bg-muted text-muted-foreground"
                    }`}
                >
                  {animationState === "slotted" ? "Connected" : "Waiting"}
                </span>
              </div>

              <div ref={agentCardRef} className="relative bg-muted/30 rounded-xl p-4 border border-border/20">
                <div className="flex gap-8 justify-center">
                  {[
                    { name: "Miro Sidekick", role: "Visual Collaboration" },
                    { name: "Jasper AI", role: "Content Creation" },
                    { name: "Salesforce Einstein", role: "CRM Intelligence" },
                  ].map((agent, index) => {
                    const isHighlighted = hoverState.isHovering && hoverState.highlightedAgentIndex === index
                    return (
                      <div key={agent.name} className="flex flex-col items-center gap-3">
                        <div
                          ref={(el) => {
                            agentSlotRefs.current[index] = el
                          }}
                          className={`relative rounded-xl border-2 border-dashed transition-all duration-300 ${animationState === "slotted" ? "border-transparent" : "border-border/40"
                            } ${isHighlighted ? "shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)]" : ""}`}
                          style={{ width: AGENT_SLOT_SIZE, height: AGENT_SLOT_SIZE }}
                        >
                          {isHighlighted && <div className="absolute inset-0 rounded-xl bg-primary/20 animate-pulse" />}
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-medium text-foreground">{agent.name}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Workflow Tasks */}
            <div className="mt-8 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs text-muted-foreground uppercase tracking-wider">Workflow Tasks</h3>
                <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">Marketing Flow</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-1 sm:gap-1">
                {[
                  { task: "Strategy / Brief", subtasks: ["Market understanding", "Audience sizing", "Category context"] },
                  { task: "Creative  Development", subtasks: ["Tensions", "Cultural context", "Inspiration"] },
                  { task: "Media Strategy / Planning", subtasks: ["Reach, frequency", "Channel effectiveness", "Planning"] },
                  { task: "Activation / Execution", subtasks: ["Campaign delivery", "Retail media", "Execution"] },
                  { task: "Measurement & Optimization", subtasks: ["Effectiveness", "Sales impact", "Optimization"] },
                ].map((item) => (
                  <div
                    key={item.task}
                    className="p-2"
                  >
                    <p className="w-full px-2 py-2 rounded-full min-h-[50px] bg-violet-600 text-white   font-semibold text-xs text-center mb-3 flex items-center justify-center">
                      {item.task}
                    </p>
                    <div className="flex flex-col items-center gap-2">
                      {item.subtasks.map((subtask) => (
                        <span
                          key={subtask}
                          className="w-full px-1 py-1 rounded-full bg-violet-100 text-violet-700 text-xs text-center cursor-pointer border border-transparent hover:bg-violet-200 hover:border-violet-400 transition-colors duration-200"
                          onMouseEnter={() => handleSubtaskHover(true)}
                          onMouseLeave={() => handleSubtaskHover(false)}
                        >
                          {subtask}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="mx-auto mt-12 max-w-3xl text-center text-xs italic text-muted-foreground">
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
    </div>
  )
}