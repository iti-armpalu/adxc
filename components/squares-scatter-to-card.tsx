"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Zap, Star, Heart, Diamond, Flame, Bot, Sparkles, Cpu } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { HeroSection } from "./hero-section"

// Configuration constants
const SCROLL_THRESHOLD = 15 // px - threshold to trigger animation
const ANIMATION_DURATION = 0.35 // 350ms
const ANIMATION_EASING = [0.32, 0.72, 0, 1] as const // Custom ease-out
const SQUARE_SIZE = 56 // px
const SLOT_SIZE = 56 // px
const AGENT_SQUARE_SIZE = 44
const AGENT_SLOT_SIZE = 44

// Scattered positions (percentage based for responsiveness)
const SCATTERED_POSITIONS = [
  { x: "8%", y: "15%", rotate: -12 },
  { x: "78%", y: "8%", rotate: 18 },
  { x: "5%", y: "35%", rotate: 8 },
  { x: "82%", y: "52%", rotate: -15 },
  { x: "21%", y: "47%", rotate: 22 },
]

// Agent scattered positions (percentage based, scattered across full container)
const AGENT_SCATTERED_POSITIONS = [
  { x: "15%", y: "35%", rotate: -15 },
  { x: "72%", y: "28%", rotate: 20 },
  { x: "88%", y: "46%", rotate: -8 },
];

// Square colors matching design system
const SQUARE_COLORS = ["bg-[#66023c]", "bg-[#66023c]", "bg-[#66023c]", "bg-[#66023c]", "bg-[#66023c]"]

// Agent square colors
const AGENT_COLORS = [
  "bg-[#e95014]",
  "bg-[#e95014]",
  "bg-[#e95014]"
];

// Icons for each square
const SQUARE_ICONS = [Zap, Star, Heart, Diamond, Flame]

// Icons for agent squares
const AGENT_ICONS = [Bot, Sparkles, Cpu];

type AnimationState = "scattered" | "slotted"

interface HoverState {
  isHovering: boolean;
  highlightedAgentIndex: number;
  highlightedSquareIndices: number[];
}

interface SquarePosition {
  x: number
  y: number
  rotate: number
  scale: number
}

export default function SquaresScatterToCard() {
  const containerRef = useRef<HTMLDivElement>(null)
  const slotRefs = useRef<(HTMLDivElement | null)[]>([])
  const agentSlotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const agentCardRef = useRef<HTMLDivElement>(null);
  const adxcRef = useRef<HTMLDivElement>(null);
  const squareRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion()

  // Hover state for connection lines
  const [hoverState, setHoverState] = useState<HoverState>({
    isHovering: false,
    highlightedAgentIndex: 0,
    highlightedSquareIndices: [],
  });

  // Generate random indices for highlights
  const getRandomHighlights = useCallback(() => {
    const agentIndex = Math.floor(Math.random() * 3);
    const squareIndices: number[] = [];
    while (squareIndices.length < 2) {
      const idx = Math.floor(Math.random() * 5);
      if (!squareIndices.includes(idx)) squareIndices.push(idx);
    }
    return { agentIndex, squareIndices };
  }, []);

  // Store calculated positions
  const scatteredPositions = useRef<SquarePosition[]>([])
  const slottedPositions = useRef<SquarePosition[]>([])

  // Agent square positions
  const agentScatteredPositions = useRef<SquarePosition[]>([]);
  const agentSlottedPositions = useRef<SquarePosition[]>([]);

  // Current animation state
  const [animationState, setAnimationState] = useState<AnimationState>("scattered")
  const currentStateRef = useRef<AnimationState>("scattered")

  // Current square positions for animation
  const [squarePositions, setSquarePositions] = useState<SquarePosition[]>([])
  const [agentSquarePositions, setAgentSquarePositions] = useState<SquarePosition[]>([]);
  const [isReady, setIsReady] = useState(false)

  // Calculate scattered positions based on container size
  const calculateScatteredPositions = useCallback((): SquarePosition[] => {
    if (!containerRef.current) return []

    const containerRect = containerRef.current.getBoundingClientRect()

    return SCATTERED_POSITIONS.map((pos) => ({
      x: (Number.parseFloat(pos.x) / 100) * containerRect.width - SQUARE_SIZE / 2,
      y: (Number.parseFloat(pos.y) / 100) * containerRect.height - SQUARE_SIZE / 2,
      rotate: pos.rotate,
      scale: 1,
    }))
  }, [])

  // Calculate slotted positions based on slot elements
  const calculateSlottedPositions = useCallback((): SquarePosition[] => {
    if (!containerRef.current) return []

    const containerRect = containerRef.current.getBoundingClientRect()

    return slotRefs.current.map((slot) => {
      if (!slot) {
        return { x: 0, y: 0, rotate: 0, scale: 1 }
      }
      const slotRect = slot.getBoundingClientRect()
      return {
        x: slotRect.left - containerRect.left + (SLOT_SIZE - SQUARE_SIZE) / 2,
        y: slotRect.top - containerRect.top + (SLOT_SIZE - SQUARE_SIZE) / 2,
        rotate: 0,
        scale: 1,
      }
    })
  }, [])



  // Calculate agent scattered positions across the full container
  const calculateAgentScatteredPositions = useCallback((): SquarePosition[] => {
    if (!containerRef.current) return [];

    const containerRect = containerRef.current.getBoundingClientRect();

    return AGENT_SCATTERED_POSITIONS.map((pos) => ({
      x: (parseFloat(pos.x) / 100) * containerRect.width - AGENT_SQUARE_SIZE / 2,
      y: (parseFloat(pos.y) / 100) * containerRect.height - AGENT_SQUARE_SIZE / 2,
      rotate: pos.rotate,
      scale: 1,
    }));
  }, []);

  // Calculate agent slotted positions
  const calculateAgentSlottedPositions = useCallback((): SquarePosition[] => {
    if (!containerRef.current) return [];

    const containerRect = containerRef.current.getBoundingClientRect();

    return agentSlotRefs.current.map((slot) => {
      if (!slot) {
        return { x: 0, y: 0, rotate: 0, scale: 1 };
      }
      const slotRect = slot.getBoundingClientRect();
      return {
        x: slotRect.left - containerRect.left + (AGENT_SLOT_SIZE - AGENT_SQUARE_SIZE) / 2,
        y: slotRect.top - containerRect.top + (AGENT_SLOT_SIZE - AGENT_SQUARE_SIZE) / 2,
        rotate: 0,
        scale: 1,
      };
    });
  }, []);


  // Initialize positions and determine initial state based on scroll
  useEffect(() => {
    const initPositions = () => {
      if (!containerRef.current) return

      // Calculate both position sets
      const scattered = calculateScatteredPositions()
      const slotted = calculateSlottedPositions()
      const agentScattered = calculateAgentScatteredPositions();
      const agentSlotted = calculateAgentSlottedPositions();

      if (scattered.length === 0 || slotted.length === 0) return

      scatteredPositions.current = scattered;
      slottedPositions.current = slotted;
      agentScatteredPositions.current = agentScattered;
      agentSlottedPositions.current = agentSlotted;

      // Determine initial state based on current scroll position
      const initialScrollY = window.scrollY
      const initialState: AnimationState = initialScrollY > SCROLL_THRESHOLD ? "slotted" : "scattered"

      currentStateRef.current = initialState;
      setAnimationState(initialState);
      setSquarePositions(initialState === "scattered" ? scattered : slotted);
      setAgentSquarePositions(initialState === "scattered" ? agentScattered : agentSlotted);
      setIsReady(true);
    }

    // Wait for layout to stabilize
    requestAnimationFrame(() => {
      requestAnimationFrame(initPositions)
    })

    // Handle resize - recalculate positions
    const handleResize = () => {
      const scattered = calculateScatteredPositions();
      const slotted = calculateSlottedPositions();
      const agentScattered = calculateAgentScatteredPositions();
      const agentSlotted = calculateAgentSlottedPositions();

      if (scattered.length > 0) scatteredPositions.current = scattered;
      if (slotted.length > 0) slottedPositions.current = slotted;
      if (agentScattered.length > 0) agentScatteredPositions.current = agentScattered;
      if (agentSlotted.length > 0) agentSlottedPositions.current = agentSlotted;

      // Update current positions based on current state
      setSquarePositions(
        currentStateRef.current === "scattered" ? scattered : slotted
      );
      setAgentSquarePositions(
        currentStateRef.current === "scattered" ? agentScattered : agentSlotted
      );
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [calculateScatteredPositions, calculateSlottedPositions, calculateAgentScatteredPositions, calculateAgentSlottedPositions])

  // Handle scroll-based state transitions
  useEffect(() => {
    if (!isReady) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const newState: AnimationState = scrollY > SCROLL_THRESHOLD ? "slotted" : "scattered"

      // Only transition if state actually changed
      if (newState !== currentStateRef.current) {
        currentStateRef.current = newState
        setAnimationState(newState)

        const targetPositions = newState === "scattered"
          ? scatteredPositions.current
          : slottedPositions.current;

        const agentTargetPositions = newState === "scattered"
          ? agentScatteredPositions.current
          : agentSlottedPositions.current;

        if (targetPositions.length > 0) {
          setSquarePositions(targetPositions)
        }

        if (agentTargetPositions.length > 0) {
          setAgentSquarePositions(agentTargetPositions);
        }
      }
    }

    // Use passive listener for performance
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isReady])

  // Determine if currently animating (for will-change optimization)
  const isAnimating = useRef(false)

  // Handle subtask hover
  // Handle subtask hover
  const handleSubtaskHover = useCallback((isHovering: boolean) => {
    if (isHovering) {
      const { agentIndex, squareIndices } = getRandomHighlights();
      setHoverState({
        isHovering: true,
        highlightedAgentIndex: agentIndex,
        highlightedSquareIndices: squareIndices,
      });
    } else {
      setHoverState({
        isHovering: false,
        highlightedAgentIndex: 0,
        highlightedSquareIndices: [],
      });
    }
  }, [getRandomHighlights]);

  return (
    <div ref={containerRef} className="relative w-full min-h-[180vh] overflow-hidden bg-gradient-main">
      {/* Hero text */}
      <HeroSection />

      {/* Animated squares */}
      {isReady &&
        squarePositions.map((pos, index) => {
          const Icon = SQUARE_ICONS[index]
          const isHighlighted =
            hoverState.isHovering && hoverState.highlightedSquareIndices.includes(index)

          const defaultShadow =
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"

          const scatteredShadow =
            "0 0 40px 15px rgba(102, 2, 60, 0.15), 0 0 60px 25px rgba(102, 2, 60, 0.08), 0 0 80px 35px rgba(102, 2, 60, 0.04)"

          const boxShadow =
            isHighlighted || animationState === "scattered" ? scatteredShadow : defaultShadow

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
              animate={{
                x: pos.x,
                y: pos.y,
                rotate: pos.rotate,
                scale: isHighlighted ? 1.1 : pos.scale,
              }}
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
              <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
            </motion.div>
          )
        })}

      {/* Agent animated squares */}
      {isReady &&
        agentSquarePositions.map((pos, index) => {
          const Icon = AGENT_ICONS[index];
          const isHighlighted =
            hoverState.isHovering && hoverState.highlightedSquareIndices.includes(index)

          const defaultShadow =
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"

          const scatteredShadow =
            "0 0 40px 15px rgba(233, 80, 20, 0.15), 0 0 60px 25px rgba(233, 80, 20, 0.08), 0 0 80px 35px rgba(233, 80, 20, 0.04)"

          const boxShadow =
            isHighlighted || animationState === "scattered" ? scatteredShadow : defaultShadow

          return (
            <motion.div
              key={`agent-${index}`}
              className={`absolute z-20 rounded-lg shadow-lg ${AGENT_COLORS[index]} flex items-center justify-center`}
              style={{
                width: AGENT_SQUARE_SIZE,
                height: AGENT_SQUARE_SIZE,
                willChange: isAnimating.current ? "transform" : "auto",
                boxShadow
              }}
              initial={false}
              animate={{
                x: pos.x,
                y: pos.y,
                rotate: pos.rotate,
                scale: isHighlighted ? 1.1 : pos.scale,
              }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                    duration: ANIMATION_DURATION,
                    ease: ANIMATION_EASING,
                  }
              }
              onAnimationStart={() => { isAnimating.current = true; }}
              onAnimationComplete={() => { isAnimating.current = false; }}
            >
              <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
            </motion.div>
          );
        })
      }

      {/* Card with slots */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">

        <Card className="bg-card/80 backdrop-blur-xl shadow-2xl border-border/50 py-0">
          <CardContent className="p-8">

            <div>
              <p className="text-center text-muted-foreground text-sm mb-4 transition-opacity duration-300">
                {animationState === "slotted" ? "Data providers connected" : "Waiting for connection"}
              </p>
              <div className="flex items-center justify-center gap-8">
                {[0, 1, 2, 3, 4].map((index) => (
                  <div
                    key={index}
                    ref={(el) => {
                      slotRefs.current[index] = el
                    }}
                    className={`rounded-xl border-2 border-dashed transition-all duration-300 ${animationState === "slotted" ? "border-transparent" : "border-border/60"
                      }`}
                    style={{
                      width: SLOT_SIZE,
                      height: SLOT_SIZE,
                    }}
                  />
                ))}
              </div>
            </div>


            {/* Large ADXC box */}
            <motion.div
              ref={adxcRef}
              className="mt-12 w-full bg-primary rounded-xl flex items-center justify-center py-6"
              animate={{
                scale: hoverState.isHovering ? 1.02 : 1,
                boxShadow: hoverState.isHovering
                  ? "0 0 40px 15px rgba(0, 0, 0, 0.15), 0 0 60px 25px rgba(0, 0, 0, 0.08), 0 0 80px 35px rgba(0, 0, 0, 0.04)"
                  : "0 10px 20px rgba(0,0,0,0.15)",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 22,
              }}
            >
              <span className="text-primary-foreground text-3xl font-bold tracking-widest">
                ADXC
              </span>
            </motion.div>


            {/* AI Agent frosted glass card */}
            <div
              className="relative mt-12 bg-card/40 backdrop-blur-lg rounded-xl p-5 border border-border/30 shadow-lg"
            >
              <p className="text-center text-foreground font-semibold text-lg mb-4">
                Your AI Agentic Ecosystem
              </p>

              <p className="text-center text-muted-foreground text-sm mb-4 transition-opacity duration-300">
                {animationState === "slotted" ? "Agents connected" : "Waiting for connection"}
              </p>
              <div className="flex gap-6 justify-center">
                {[0, 1, 2].map((index) => {
                  const isHighlighted = hoverState.isHovering && hoverState.highlightedAgentIndex === index;
                  return (
                    <div
                      key={index}
                      ref={(el) => { agentSlotRefs.current[index] = el; }}
                      className={`relative rounded-lg border-2 border-dashed transition-all duration-300 ${animationState === "slotted"
                        ? "border-transparent"
                        : "border-border/50"
                        } ${isHighlighted ? "shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)]" : ""}`}
                      style={{
                        width: AGENT_SLOT_SIZE,
                        height: AGENT_SLOT_SIZE,
                      }}
                    >
                      {isHighlighted && (
                        <div className="absolute inset-0 rounded-lg bg-primary/20 animate-pulse" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Marketing Tasks Row */}
            <div className="mt-6 flex gap-3">
              {[
                { task: "SEO Audit", subtasks: ["Keyword research", "Meta optimization", "Backlink analysis"] },
                { task: "Content", subtasks: ["Blog strategy", "Social posts", "Email copy"] },
                { task: "Ads", subtasks: ["Campaign setup", "A/B testing", "Budget allocation"] },
                { task: "Analytics", subtasks: ["Traffic report", "Conversion tracking", "ROI analysis"] },
                { task: "Social", subtasks: ["Engagement plan", "Influencer outreach", "Community mgmt"] },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex-1 bg-muted/50 rounded-lg p-3 border border-border/30"
                >
                  <p className="text-foreground font-medium text-sm text-center mb-2">
                    {item.task}
                  </p>
                  <div className="space-y-1.5">
                    {item.subtasks.map((subtask, subIndex) => (
                      <div
                        key={subIndex}
                        className="bg-card/60 rounded px-2 py-1 text-xs text-muted-foreground text-center truncate cursor-pointer hover:bg-primary/20 hover:text-primary transition-all duration-200"
                        onMouseEnter={() => handleSubtaskHover(true)}
                        onMouseLeave={() => handleSubtaskHover(false)}
                      >
                        {subtask}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>








          </CardContent>
        </Card>
      </div>



      {/* Scroll indicator - only show when scattered */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: animationState === "scattered" ? 1 : 0,
          y: animationState === "scattered" ? 0 : 10,
          pointerEvents: animationState === "scattered" ? "auto" : "none"
        }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-muted-foreground text-sm">Scroll down</span>
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/40 flex items-start justify-center p-1"
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <div className="w-1.5 h-2.5 rounded-full bg-muted-foreground/60" />
        </motion.div>
      </motion.div>

      {/* Scroll-to-top hint - only show when slotted and scrolled down */}
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
