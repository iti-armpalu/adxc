"use client"

import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function AudiencePortalSelector() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const router = useRouter()

  const handleCardClick = (path: string) => {
    router.push(path)
  }

  return (
    <main className="relative flex items-center justify-center px-6 py-12 mb-24">

      <div className="relative z-10 w-full max-w-4xl">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance leading-tight mb-4">

            Explore How
            <br />
            ADXC Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => handleCardClick("/brands")}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
            className="bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 cursor-pointer group text-left active:scale-100 flex flex-col shadow-sm hover:shadow-lg"
          >
            <h3 className="text-gray-900 text-xl font-semibold mb-2 capitalize mt-4">Brands & SMEs</h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
              Connect ADXC to get decision-grade market and consumer insights on demand, without expensive annual licences.
            </p>
            <div className="flex items-center gap-2">
              <span
                className="text-gray-700 text-sm font-medium group-hover:opacity-100 transition-all"
              >
                Explore
              </span>
              <ArrowRight
                className="w-4 h-4 text-gray-700 group-hover:translate-x-1 transition-all"
              />
            </div>
          </button>

          <button
            onClick={() => handleCardClick("/data-providers")}
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
            className="bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 cursor-pointer group text-left active:scale-100 flex flex-col shadow-sm hover:shadow-lg"
          >
            <h3 className="text-gray-900 text-xl font-semibold mb-2 capitalize mt-4">Data Providers</h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
              Connect to ADXC to monetise your data with pay-per-use access for SMEs, without exposing raw datasets.
            </p>
            <div className="flex items-center gap-2">
              <span
                className="text-gray-700 text-sm font-medium group-hover:opacity-100 transition-all"
              >
                Explore
              </span>
              <ArrowRight
                className="w-4 h-4 text-gray-700 group-hover:translate-x-1 transition-all"
              />
            </div>
          </button>

          <button
            onClick={() => handleCardClick("/ai-platforms")}
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
            className="bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 cursor-pointer group text-left active:scale-100 flex flex-col shadow-sm hover:shadow-lg"
          >
            <h3 className="text-gray-900 text-xl font-semibold mb-2 capitalize mt-4">AI Platforms</h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
              Add ADXC to your marketplace to deliver dramatically better outcomes inside your workflows.
            </p>
            <div className="flex items-center gap-2">
              <span
                className="text-gray-700 text-sm font-medium group-hover:opacity-100 transition-all"
              >
                Explore
              </span>
              <ArrowRight
                className="w-4 h-4 text-gray-700 group-hover:translate-x-1 transition-all"
              />
            </div>
          </button>
        </div>
      </div>
    </main>
  )
}
