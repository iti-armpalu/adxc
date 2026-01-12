"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Zap, Star, Heart, Diamond, Flame } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { HeroSection } from "./hero-section"

// Configuration constants
const SCROLL_THRESHOLD = 15 // px - threshold to trigger animation
const ANIMATION_DURATION = 0.35 // 350ms
const ANIMATION_EASING = [0.32, 0.72, 0, 1] as const // Custom ease-out
const SQUARE_SIZE = 56 // px
const SLOT_SIZE = 56 // px

// Scattered positions (percentage based for responsiveness)
const SCATTERED_POSITIONS = [
  { x: "8%", y: "15%", rotate: -12 },
  { x: "78%", y: "8%", rotate: 18 },
  { x: "5%", y: "35%", rotate: 8 },
  { x: "82%", y: "55%", rotate: -15 },
  { x: "25%", y: "57%", rotate: 22 },
]

// Square colors matching design system
const SQUARE_COLORS = ["bg-square-1", "bg-square-2", "bg-square-3", "bg-square-4", "bg-square-5"]

// Icons for each square
const SQUARE_ICONS = [Zap, Star, Heart, Diamond, Flame]

type AnimationState = "scattered" | "slotted"

interface SquarePosition {
  x: number
  y: number
  rotate: number
  scale: number
}

export default function SquaresScatterToCard() {
  const containerRef = useRef<HTMLDivElement>(null)
  const slotRefs = useRef<(HTMLDivElement | null)[]>([])
  const prefersReducedMotion = useReducedMotion()

  // Store calculated positions
  const scatteredPositions = useRef<SquarePosition[]>([])
  const slottedPositions = useRef<SquarePosition[]>([])

  // Current animation state
  const [animationState, setAnimationState] = useState<AnimationState>("scattered")
  const currentStateRef = useRef<AnimationState>("scattered")

  // Current square positions for animation
  const [squarePositions, setSquarePositions] = useState<SquarePosition[]>([])
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

  // Initialize positions and determine initial state based on scroll
  useEffect(() => {
    const initPositions = () => {
      if (!containerRef.current) return

      // Calculate both position sets
      const scattered = calculateScatteredPositions()
      const slotted = calculateSlottedPositions()

      if (scattered.length === 0 || slotted.length === 0) return

      scatteredPositions.current = scattered
      slottedPositions.current = slotted

      // Determine initial state based on current scroll position
      const initialScrollY = window.scrollY
      const initialState: AnimationState = initialScrollY > SCROLL_THRESHOLD ? "slotted" : "scattered"

      currentStateRef.current = initialState
      setAnimationState(initialState)
      setSquarePositions(initialState === "scattered" ? scattered : slotted)
      setIsReady(true)
    }

    // Wait for layout to stabilize
    requestAnimationFrame(() => {
      requestAnimationFrame(initPositions)
    })

    // Handle resize - recalculate positions
    const handleResize = () => {
      const scattered = calculateScatteredPositions()
      const slotted = calculateSlottedPositions()

      if (scattered.length > 0) scatteredPositions.current = scattered
      if (slotted.length > 0) slottedPositions.current = slotted

      // Update current positions based on current state
      setSquarePositions(currentStateRef.current === "scattered" ? scattered : slotted)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [calculateScatteredPositions, calculateSlottedPositions])

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

        const targetPositions = newState === "scattered" ? scatteredPositions.current : slottedPositions.current

        if (targetPositions.length > 0) {
          setSquarePositions(targetPositions)
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

  return (
    <div ref={containerRef} className="relative w-full min-h-[150vh] overflow-hidden bg-gradient-main">
      {/* Hero text */}
      {/* <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-10 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 tracking-tight">Scroll to Collect</h1>
        <p className="text-muted-foreground text-lg transition-opacity duration-300">
          {animationState === "slotted" ? "Scroll back to top to scatter" : "Start scrolling to see the magic"}
        </p>
      </div> */}
      <HeroSection />

      {/* Animated squares */}
      {isReady &&
        squarePositions.map((pos, index) => {
          const Icon = SQUARE_ICONS[index]
          return (
            <motion.div
              key={index}
              className={`absolute z-20 rounded-xl shadow-lg ${SQUARE_COLORS[index]} flex items-center justify-center`}
              style={{
                width: SQUARE_SIZE,
                height: SQUARE_SIZE,
                willChange: isAnimating.current ? "transform" : "auto",
              }}
              initial={false}
              animate={{
                x: pos.x,
                y: pos.y,
                rotate: pos.rotate,
                scale: pos.scale,
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

      {/* Card with slots */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">

        <Card className="bg-card/80 backdrop-blur-xl shadow-2xl border-border/50 py-0">
          <CardContent className="p-8">

            <div>
              <p className="text-center text-muted-foreground text-sm mb-4 transition-opacity duration-300">
                {animationState === "slotted" ? "Data providers connected" : "Waiting for connection"}
              </p>
              <div className="flex gap-4">
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
            <div className="mt-6 w-full bg-primary rounded-xl flex items-center justify-center py-6">
              <span className="text-primary-foreground text-3xl font-bold tracking-widest">ADXC</span>
            </div>

            <div className="mt-4 w-full bg-secondary rounded-xl flex items-center justify-center py-4 border border-border/30">
              <span className="text-secondary-foreground text-xl font-semibold">your AI agent</span>
            </div>

            <div className="flex gap-4 mt-6">
              {[0, 1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className={`rounded-xl border-2 border-dashed transition-all duration-300`}
                  style={{
                    width: SLOT_SIZE,
                    height: SLOT_SIZE,
                  }}
                />
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
          pointerEvents: animationState === "scattered" ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-muted-foreground text-sm">Scroll down</span>
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/40 flex items-start justify-center p-1"
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
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
    </div>
  )
}
