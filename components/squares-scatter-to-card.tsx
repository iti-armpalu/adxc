"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Sparkles, Database } from "lucide-react"
import { Card, CardContent } from "./ui/card"

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

// Agents
const AGENTS_ALL = [
  { name: "Miro Sidekick", role: "Visual Collaboration" },
  { name: "Jasper AI", role: "Content Creation" },
  { name: "Salesforce Einstein", role: "CRM Intelligence" },
] as const

type AnimationState = "scattered" | "slotted"

interface HoverState {
  isHovering: boolean
  highlightedAgentIndex: number
  highlightedProviderIndex: number[]
  hoveredSubtaskRef: HTMLElement | null
  hoveredTaskColumnRef: HTMLElement | null

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
  const adxcRef = useRef<HTMLDivElement>(null)
  const squareRefs = useRef<(HTMLDivElement | null)[]>([]);
  const agentSquareRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Outer container refs (square + name) for connection line targeting
  const providerContainerRefs = useRef<(HTMLDivElement | null)[]>([])
  const agentContainerRefs = useRef<(HTMLDivElement | null)[]>([])

  const [hoverState, setHoverState] = useState<HoverState>({
    isHovering: false,
    highlightedAgentIndex: 0,
    highlightedProviderIndex: [],
    hoveredSubtaskRef: null,
    hoveredTaskColumnRef: null,

  })

  // Track which elements should pulse (triggered when dot arrives)
  const [pulsingAgent, setPulsingAgent] = useState<number | null>(null)
  const [pulsingProviders, setPulsingProviders] = useState<number[]>([])
  const [pulsingADXC, setPulsingADXC] = useState(false)

  // Timing constants for dot arrival pulses
  const DOT_TRAVEL_TIME = 3000 // 3s matches animateMotion dur
  const PATH_STAGGER = 150 // 0.15s delay between paths
  const INITIAL_DELAY = 400 // 0.4s initial delay



  // Set up pulse timers when hover state changes
  useEffect(() => {
    if (!hoverState.isHovering) {
      setPulsingAgent(null)
      setPulsingProviders([])
      setPulsingADXC(false)
      return
    }

    const timers: NodeJS.Timeout[] = []

    // Function to trigger pulse cycle
    const startPulseCycle = () => {
      // Agent pulse (path 0 arrives)
      const agentDelay = INITIAL_DELAY + DOT_TRAVEL_TIME
      timers.push(setTimeout(() => {
        setPulsingAgent(hoverState.highlightedAgentIndex)
        setTimeout(() => setPulsingAgent(null), 300)
      }, agentDelay))

      // ADXC pulse (path 1 arrives)
      const adxcDelay = INITIAL_DELAY + PATH_STAGGER + DOT_TRAVEL_TIME
      timers.push(setTimeout(() => {
        setPulsingADXC(true)
        setTimeout(() => setPulsingADXC(false), 300)
      }, adxcDelay))

      // Provider pulses (paths 2 and 3 arrive)
      hoverState.highlightedProviderIndex.forEach((providerIndex, i) => {
        const providerDelay = INITIAL_DELAY + (2 + i) * PATH_STAGGER + DOT_TRAVEL_TIME
        timers.push(setTimeout(() => {
          setPulsingProviders(prev => [...prev, providerIndex])
          setTimeout(() => setPulsingProviders(prev => prev.filter(p => p !== providerIndex)), 300)
        }, providerDelay))
      })
    }

    // Start initial cycle
    startPulseCycle()

    // Repeat every DOT_TRAVEL_TIME
    const intervalId = setInterval(startPulseCycle, DOT_TRAVEL_TIME)
    timers.push(intervalId as unknown as NodeJS.Timeout)

    return () => {
      timers.forEach(t => clearTimeout(t))
      clearInterval(intervalId)
    }
  }, [hoverState.isHovering, hoverState.highlightedAgentIndex, hoverState.highlightedProviderIndex])



  // Randomly highlight one agent and two provider squares
  const getRandomHighlights = useCallback(() => {
    // Random agent (3 total)
    const agentIndex = Math.floor(Math.random() * 3)

    // Random set of provider indices (no duplicates)
    const providerIndex: number[] = []
    while (providerIndex.length < 2) {
      const idx = Math.floor(Math.random() * providerCount)
      if (!providerIndex.includes(idx)) providerIndex.push(idx)
    }

    return { agentIndex, providerIndex }
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

  useEffect(() => {
    if (animationState !== "slotted" && hoverState.isHovering) {
      setHoverState({
        isHovering: false,
        highlightedAgentIndex: 0,
        highlightedProviderIndex: [],
        hoveredSubtaskRef: null,
        hoveredTaskColumnRef: null
      });
    }
  }, [animationState, hoverState.isHovering]);

  const isAnimating = useRef(false)

  // Hover highlight handler (desktop UX; harmless on mobile)
  const handleSubtaskHover = useCallback(
    (isHovering: boolean, subtaskElement?: HTMLElement | null, taskColumnElement?: HTMLElement | null) => {
      // block all hover interactions until slotted
      if (currentStateRef.current !== "slotted") return;

      if (isHovering && subtaskElement && taskColumnElement) {
        const { agentIndex, providerIndex } = getRandomHighlights();
        setHoverState({
          isHovering: true,
          highlightedAgentIndex: agentIndex,
          highlightedProviderIndex: providerIndex,
          hoveredSubtaskRef: subtaskElement,
          hoveredTaskColumnRef: taskColumnElement,
        });
      } else {
        setHoverState({
          isHovering: false,
          highlightedAgentIndex: 0,
          highlightedProviderIndex: [],
          hoveredSubtaskRef: null,
          hoveredTaskColumnRef: null,
        });
      }
    },
    [getRandomHighlights]
  );



  return (
    <div ref={containerRef} className="relative w-full">


      {/* SVG Connection Lines */}
      {hoverState.isHovering && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-30">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <ConnectionLines
            containerRef={containerRef}
            adxcRef={adxcRef}
            providerContainerRefs={providerContainerRefs}
            agentContainerRefs={agentContainerRefs}
            highlightedAgentIndex={hoverState.highlightedAgentIndex}
            highlightedProviderIndex={hoverState.highlightedProviderIndex}
            hoveredSubtaskRef={hoverState.hoveredSubtaskRef}
            hoveredTaskColumnRef={hoverState.hoveredTaskColumnRef}
          />
        </svg>
      )}







      {/* Provider squares (only 3 on mobile, 5 on desktop) */}
      {isReady &&
        squarePositions.slice(0, providerCount).map((pos, index) => {
          const Icon = SQUARE_ICONS[index]
          const isHighlighted = hoverState.isHovering && hoverState.highlightedProviderIndex.includes(index)

          const defaultShadow =
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"

          const scatteredShadow =
            "0 0 40px 15px rgb(var(--glow-color) / 0.15), 0 0 60px 25px rgb(var(--glow-color) / 0.08), 0 0 80px 35px rgb(var(--glow-color) / 0.04)";


          const boxShadow = isHighlighted || animationState === "scattered" ? scatteredShadow : defaultShadow

          return (
            <motion.div
              key={index}
              ref={(el) => { squareRefs.current[index] = el; }}
              className={`absolute z-20 rounded-xl shadow-lg bg-green-300 flex items-center justify-center`}
              style={{
                width: SQUARE_SIZE,
                height: SQUARE_SIZE,
                willChange: isAnimating.current ? "transform" : "auto",
                boxShadow,
                "--glow-color": "134 239 172",
              } as React.CSSProperties}
              initial={false}
              animate={{ x: pos.x, y: pos.y, rotate: pos.rotate }}
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
              <span className="relative w-6 h-6 text-green-600 relative flex items-center">
                {pulsingProviders.includes(index) && !prefersReducedMotion && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-600 opacity-75"></span>
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
          const isHighlighted = hoverState.isHovering && hoverState.highlightedAgentIndex === index

          const defaultShadow =
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"

          const scatteredShadow =
            "0 0 40px 15px rgba(233, 80, 20, 0.15), 0 0 60px 25px rgba(233, 80, 20, 0.08), 0 0 80px 35px rgba(233, 80, 20, 0.04)"

          const boxShadow = isHighlighted || animationState === "scattered" ? scatteredShadow : defaultShadow

          return (
            <motion.div
              key={`agent-${index}`}
              ref={(el) => { agentSquareRefs.current[index] = el; }}
              className={`absolute z-20 rounded-lg shadow-lg bg-orange-600 flex items-center justify-center`}
              style={{
                width: AGENT_SQUARE_SIZE,
                height: AGENT_SQUARE_SIZE,
                willChange: isAnimating.current ? "transform" : "auto",
                boxShadow,
              }}
              initial={false}
              animate={{ x: pos.x, y: pos.y, rotate: pos.rotate }}
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
              <span className="relative w-5 h-5 text-orange-200 relative flex items-center">

                {/* {isHighlighted && !prefersReducedMotion && ( */}
                {pulsingAgent === index && !prefersReducedMotion && (
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
              </div>

              {/* <div className="flex items-center justify-center gap-6 py-4 bg-muted/30 rounded-xl border border-border/20"> */}
              <div className="relative bg-muted/30 rounded-xl p-4 border border-border/20">
                <div className="flex gap-8 justify-center">
                  {providers.map((provider, index) => (
                    <div
                      key={provider.name}
                      className="flex flex-col items-center gap-3"
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
                        style={{ width: SLOT_SIZE, height: SLOT_SIZE }}
                      />
                      <div className="text-center">
                        <p className="text-xs font-medium text-foreground">{provider.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bridge + internal data */}
            <div className="mt-8 relative">
              <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-0 items-center">

                <div>
                  <div className="flex items-center justify-between">
                  </div>
                  <motion.div
                    ref={adxcRef}
                    className="w-full bg-adxc rounded-xl flex items-center justify-center py-5 border-2 border-transparent"
                  >
                    {/* <span className="relative w-8 h-8 relative flex items-center"> */}
                    {pulsingADXC && !prefersReducedMotion && (
                      <span className="absolute w-8 h-8 animate-ping rounded-full bg-pink-700 opacity-75"></span>
                    )}
                    <span className="text-xl sm:text-3xl text-primary-foreground font-bold tracking-[0.3em]">ADXC</span>
                    {/* </span> */}
                  </motion.div>
                </div>

                <div className="hidden sm:flex items-center justify-center px-4">
                  <div className="flex items-center">
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[10px] border-l-primary/60" />
                    <div className="w-16 h-[2px] animated-flow-line" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between ">
                  </div>


                  <div
                    className="w-full bg-green-100 rounded-xl flex items-center justify-center py-5 border-2 border-transparent"
                  >
                    <span className="text-sm font-medium text-green-600">Internal / 1P Data</span>
                  </div>

                </div>
              </div>
            </div>


            {/* AI Agentic Ecosystem */}
            <div className="mt-8 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs text-muted-foreground uppercase tracking-wider">Your AI Agentic Ecosystem</h3>
              </div>

              <div className="relative bg-muted/30 rounded-xl p-4 border border-border/20">
                <div className="flex gap-8 justify-center">
                  {AGENTS_ALL.map((agent, index) => {
                    // const isHighlighted = hoverState.isHovering && hoverState.highlightedAgentIndex === index
                    return (
                      <div
                        key={agent.name}
                        className="flex flex-col items-center gap-3"
                        ref={(el) => {
                          agentContainerRefs.current[index] = el
                        }}
                      >
                        <div
                          ref={(el) => {
                            agentSlotRefs.current[index] = el
                          }}
                          className={`relative rounded-xl border-2 border-dashed transition-all duration-300 ${animationState === "slotted" ? "border-transparent" : "border-border/40"}`}
                          style={{ width: AGENT_SLOT_SIZE, height: AGENT_SLOT_SIZE }}
                        >
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
                {/* <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">Marketing Flow</span> */}
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
                    <p className="w-full px-2 py-2 rounded-full min-h-[50px] bg-blue-300 text-blue-600 font-semibold text-xs text-center mb-3 flex items-center justify-center">
                      {item.task}
                    </p>
                    <div className="flex flex-col items-center gap-2">
                      {item.subtasks.map((subtask) => (
                        <span
                          key={subtask}
                          className="w-full px-1 py-1 rounded-full bg-blue-50 text-blue-500 text-xs text-center cursor-pointer border border-transparent hover:bg-blue-100 hover:border-blue-300 transition-colors duration-200"


                          // onMouseEnter={(e) => handleSubtaskHover(true, e.currentTarget)}

                          onMouseEnter={(e) => {
                            const taskColumn = e.currentTarget.closest('.p-2') as HTMLElement
                            handleSubtaskHover(true, e.currentTarget, taskColumn)
                          }}

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



// Connection Lines Component
function ConnectionLines({
  containerRef,
  adxcRef,
  providerContainerRefs,
  agentContainerRefs,
  highlightedAgentIndex,
  highlightedProviderIndex,
  hoveredSubtaskRef,
  hoveredTaskColumnRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>
  adxcRef: React.RefObject<HTMLDivElement | null>
  providerContainerRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  agentContainerRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  highlightedAgentIndex: number
  highlightedProviderIndex: number[]
  hoveredSubtaskRef: HTMLElement | null
  hoveredTaskColumnRef: HTMLElement | null
}) {
  const [paths, setPaths] = useState<{ d: string; color: string }[]>([])

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

  useEffect(() => {
    const container = containerRef.current
    const adxc = adxcRef.current
    const agentContainer = agentContainerRefs.current[highlightedAgentIndex]

    // if (!container || !adxc || !agentContainer || !hoveredSubtaskRef) return
    if (!container || !adxc || !agentContainer || !hoveredSubtaskRef || !hoveredTaskColumnRef) return


    const containerRect = container.getBoundingClientRect()
    const adxcRect = adxc.getBoundingClientRect()

    const taskColumnRect = hoveredTaskColumnRef.getBoundingClientRect()




    const subtaskRect = hoveredSubtaskRef.getBoundingClientRect()
    const agentContainerRect = agentContainer.getBoundingClientRect()

    const newPaths: { d: string; color: string }[] = []

    // const subtaskCenterX = subtaskRect.left - containerRect.left + subtaskRect.width / 2
    // const subtaskTopY = subtaskRect.top - containerRect.top

    // Use task column center and top for the starting point
    const taskColumnCenterX = taskColumnRect.left - containerRect.left + taskColumnRect.width / 2
    const taskColumnTopY = taskColumnRect.top - containerRect.top


    // Use outer container (square + name) bounds for agent
    const agentCenterX = agentContainerRect.left - containerRect.left + agentContainerRect.width / 2
    const agentBottomY = agentContainerRect.bottom - containerRect.top
    const agentTopY = agentContainerRect.top - containerRect.top

    const adxcCenterX = adxcRect.left - containerRect.left + adxcRect.width / 2
    const adxcTopY = adxcRect.top - containerRect.top
    const adxcBottomY = adxcRect.bottom - containerRect.top

    // Path 1: Subtask → AI Agent outer container
    // newPaths.push({
    //   d: createCurvedPath(subtaskCenterX, subtaskTopY, agentCenterX, agentBottomY + 5),
    //   color: `hsl(var(--agent-${highlightedAgentIndex + 1}))`,
    // })

    // Path 1: Task column top → AI Agent outer container
    newPaths.push({
      d: createCurvedPath(taskColumnCenterX, taskColumnTopY, agentCenterX, agentBottomY + 5),
      color: `hsl(var(--agent-${highlightedAgentIndex + 1}))`,
    })

    // Path 2: AI Agent outer container → ADXC
    newPaths.push({
      d: createCurvedPath(agentCenterX, agentTopY - 5, adxcCenterX, adxcBottomY + 5),
      color: "hsl(var(--primary))",
    })

    // Paths 3 & 4: ADXC → Provider outer containers
    highlightedProviderIndex.forEach((providerIndex) => {
      const providerContainer = providerContainerRefs.current[providerIndex]
      if (providerContainer) {
        const providerRect = providerContainer.getBoundingClientRect()
        const providerCenterX = providerRect.left - containerRect.left + providerRect.width / 2
        const providerBottomY = providerRect.bottom - containerRect.top

        newPaths.push({
          d: createCurvedPath(adxcCenterX, adxcTopY - 5, providerCenterX, providerBottomY + 5),
          color: `hsl(var(--square-${providerIndex + 1}))`,
        })
      }
    })

    setPaths(newPaths)
  }, [
    containerRef,
    adxcRef,
    providerContainerRefs,
    agentContainerRefs,
    highlightedAgentIndex,
    highlightedProviderIndex,
    hoveredSubtaskRef,
  ])

  return (
    <>
      {paths.map((path, index) => (
        <g key={index}>
          {/* Main path */}
          <motion.path
            id={`connection-path-${index}`}
            d={path.d}
            fill="none"
            stroke="#e5e7eb"
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
          {/* Animated traveling dot */}
          <circle r="5" fill={path.color}>
            <animateMotion
              dur="3s"
              repeatCount="indefinite"
              begin={`${index * 0.15 + 0.4}s`}
            >
              <mpath href={`#connection-path-${index}`} />
            </animateMotion>
          </circle>
        </g>
      ))}
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
              r="4"
              fill={path.color}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, delay: index * 0.15 }}
            />
            <motion.circle
              cx={endX}
              cy={endY}
              r="4"
              fill={path.color}
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
