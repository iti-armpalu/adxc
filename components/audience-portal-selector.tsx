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
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-50 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-7xl font-semibold text-gray-900 mb-3 text-balance">
            Get Started
            <br />
            with ADXC
          </h1>
          <p className="text-gray-600 text-sm">Enterprise-grade data intelligence — without ever owning the raw data</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => handleCardClick("/brands")}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
            className="bg-white border border-gray-200 hover:border-emerald-300 hover:shadow-lg rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer group text-left active:scale-100 flex flex-col shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="bg-emerald-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-emerald-100">
                <Building2 className="w-6 h-6 text-emerald-600 group-hover:text-emerald-700" />
              </div>
              <div className="bg-emerald-50 rounded-full px-2.5 py-1 border border-emerald-200">
                <span className="text-emerald-700 text-xs font-medium">For SMEs</span>
              </div>
            </div>
            <h3 className="text-gray-900 text-xl font-semibold mb-2 capitalize mt-4">Brands & SMEs</h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
              Access enterprise-grade data insights through your AI agents. Get intelligence without ever owning or
              seeing the raw data.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-gray-700 text-sm font-medium group-hover:text-emerald-600">Enter portal</span>
              <ArrowRight className="w-4 h-4 text-gray-700 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
            </div>
          </button>

          <button
            onClick={() => handleCardClick("/data-providers")}
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
            className="bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer group text-left active:scale-100 flex flex-col shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-blue-100">
                <Database className="w-6 h-6 text-blue-600 group-hover:text-blue-700" />
              </div>
              <div className="bg-blue-50 rounded-full px-2.5 py-1 border border-blue-200">
                <span className="text-blue-700 text-xs font-medium">For Providers</span>
              </div>
            </div>
            <h3 className="text-gray-900 text-xl font-semibold mb-2 capitalize mt-4">Data Providers</h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
              Securely share your valuable datasets via ADXC. Maintain full control while enabling AI agents to
              synthesize insights in a protected environment.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-gray-700 text-sm font-medium group-hover:text-blue-600">Enter portal</span>
              <ArrowRight className="w-4 h-4 text-gray-700 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </div>
          </button>

          <button
            onClick={() => handleCardClick("/ai-platforms")}
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
            className="bg-white border border-gray-200 hover:border-purple-300 hover:shadow-lg rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer group text-left active:scale-100 flex flex-col shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="bg-purple-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-purple-100">
                <Sparkles className="w-6 h-6 text-purple-600 group-hover:text-purple-700" />
              </div>
              <div className="bg-purple-50 rounded-full px-2.5 py-1 border border-purple-200">
                <span className="text-purple-700 text-xs font-medium">For AI Platforms</span>
              </div>
            </div>
            <h3 className="text-gray-900 text-xl font-semibold mb-2 capitalize mt-4">AI Platforms</h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
              Connect your AI agents to ADXC. Securely access data providers, synthesize insights in controlled
              environments, and deliver intelligence — not raw data.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-gray-700 text-sm font-medium group-hover:text-purple-600">Enter portal</span>
              <ArrowRight className="w-4 h-4 text-gray-700 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
            </div>
          </button>
        </div>
      </div>
    </main>
  )
}
