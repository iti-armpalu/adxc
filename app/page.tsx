'use client'

import { useEffect, useRef, useState } from "react"

import SquaresScatterToCard from "@/components/squares-scatter-to-card";
import CapabilityMatrix from "@/components/capability-matrix";


export default function Home() {

  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const fullHeight = containerRef.current.scrollHeight - windowHeight

      const progress = Math.min(scrollPosition / (fullHeight * 0.3), 1)
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div>
      <SquaresScatterToCard />



      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-24">
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground text-balance leading-tight px-4">
            The data exists. Access doesn't.
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground text-balance leading-relaxed px-4">
            SMEs need insight from multiple providers, but high costs and low usage make full licenses unrealistic.
          </p>
        </div>
        <CapabilityMatrix />
      </section>

    </div>
  );
}
