"use client"

import { ArrowRight, Building2, Database, Sparkles } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function AudiencePortalSelector() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const router = useRouter()

  const handleCardClick = (path: string) => {
    router.push(path)
  }

  return (
    <main className="relative min-h-screen bg-white flex items-center justify-center p-6">
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: "#66023c" }}
      />

      <div className="relative z-10 w-full max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-7xl font-semibold text-gray-900 mb-3 text-balance">
            Get Started 
            <br />
            with ADXC
          </h1>
          <p className="text-gray-600 text-xl">Enterprise-grade data intelligence — without ever owning the raw data</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => handleCardClick("/brands")}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
            className="bg-white border border-gray-200 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer group text-left active:scale-100 flex flex-col shadow-sm hover:shadow-lg"
            style={{
              borderColor: hoveredCard === 1 ? "#66023c" : undefined,
            }}
          >
            <div className="flex items-start justify-between">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ backgroundColor: hoveredCard === 1 ? "rgba(102, 2, 60, 0.15)" : "rgba(102, 2, 60, 0.08)" }}
              >
                <Building2 className="w-6 h-6 transition-all" style={{ color: "#66023c" }} />
              </div>
              <div
                className="rounded-full px-2.5 py-1"
                style={{
                  backgroundColor: "rgba(102, 2, 60, 0.08)",
                  borderWidth: "1px",
                  borderColor: "rgba(102, 2, 60, 0.2)",
                }}
              >
                <span className="text-xs font-medium" style={{ color: "#66023c" }}>
                  For SMEs
                </span>
              </div>
            </div>
            <h3 className="text-gray-900 text-xl font-semibold mb-2 capitalize mt-4">Brands & SMEs</h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
              Access enterprise-grade data insights through your AI agents. Get intelligence without ever owning or
              seeing the raw data.
            </p>
            <div className="flex items-center gap-2">
              <span
                className="text-gray-700 text-sm font-medium group-hover:opacity-100 transition-all"
                style={{ color: hoveredCard === 1 ? "#66023c" : undefined }}
              >
                Enter portal
              </span>
              <ArrowRight
                className="w-4 h-4 text-gray-700 group-hover:translate-x-1 transition-all"
                style={{ color: hoveredCard === 1 ? "#66023c" : undefined }}
              />
            </div>
          </button>

          <button
            onClick={() => handleCardClick("/data-providers")}
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
            className="bg-white border border-gray-200 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer group text-left active:scale-100 flex flex-col shadow-sm hover:shadow-lg"
            style={{
              borderColor: hoveredCard === 2 ? "#66023c" : undefined,
            }}
          >
            <div className="flex items-start justify-between">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ backgroundColor: hoveredCard === 2 ? "rgba(102, 2, 60, 0.15)" : "rgba(102, 2, 60, 0.08)" }}
              >
                <Database className="w-6 h-6 transition-all" style={{ color: "#66023c" }} />
              </div>
              <div
                className="rounded-full px-2.5 py-1"
                style={{
                  backgroundColor: "rgba(102, 2, 60, 0.08)",
                  borderWidth: "1px",
                  borderColor: "rgba(102, 2, 60, 0.2)",
                }}
              >
                <span className="text-xs font-medium" style={{ color: "#66023c" }}>
                  For Providers
                </span>
              </div>
            </div>
            <h3 className="text-gray-900 text-xl font-semibold mb-2 capitalize mt-4">Data Providers</h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
              Securely share your valuable datasets via ADXC. Maintain full control while enabling AI agents to
              synthesize insights in a protected environment.
            </p>
            <div className="flex items-center gap-2">
              <span
                className="text-gray-700 text-sm font-medium group-hover:opacity-100 transition-all"
                style={{ color: hoveredCard === 2 ? "#66023c" : undefined }}
              >
                Enter portal
              </span>
              <ArrowRight
                className="w-4 h-4 text-gray-700 group-hover:translate-x-1 transition-all"
                style={{ color: hoveredCard === 2 ? "#66023c" : undefined }}
              />
            </div>
          </button>

          <button
            onClick={() => handleCardClick("/ai-platforms")}
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
            className="bg-white border border-gray-200 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer group text-left active:scale-100 flex flex-col shadow-sm hover:shadow-lg"
            style={{
              borderColor: hoveredCard === 3 ? "#66023c" : undefined,
            }}
          >
            <div className="flex items-start justify-between">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ backgroundColor: hoveredCard === 3 ? "rgba(102, 2, 60, 0.15)" : "rgba(102, 2, 60, 0.08)" }}
              >
                <Sparkles className="w-6 h-6 transition-all" style={{ color: "#66023c" }} />
              </div>
              <div
                className="rounded-full px-2.5 py-1"
                style={{
                  backgroundColor: "rgba(102, 2, 60, 0.08)",
                  borderWidth: "1px",
                  borderColor: "rgba(102, 2, 60, 0.2)",
                }}
              >
                <span className="text-xs font-medium" style={{ color: "#66023c" }}>
                  For AI Platforms
                </span>
              </div>
            </div>
            <h3 className="text-gray-900 text-xl font-semibold mb-2 capitalize mt-4">AI Platforms</h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
              Connect your AI agents to ADXC. Securely access data providers, synthesize insights in controlled
              environments, and deliver intelligence — not raw data.
            </p>
            <div className="flex items-center gap-2">
              <span
                className="text-gray-700 text-sm font-medium group-hover:opacity-100 transition-all"
                style={{ color: hoveredCard === 3 ? "#66023c" : undefined }}
              >
                Enter portal
              </span>
              <ArrowRight
                className="w-4 h-4 text-gray-700 group-hover:translate-x-1 transition-all"
                style={{ color: hoveredCard === 3 ? "#66023c" : undefined }}
              />
            </div>
          </button>
        </div>
      </div>
    </main>
  )
}
