'use client'

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, Check, TrendingUp } from "lucide-react";

const usageActivities = ['Strategy', 'Brief Writing', 'Media Planning', 'Creative Ideation', 'Audience Profiles']


export default function Calculator() {
  const calculatorRef = useRef<HTMLElement>(null)
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const [acquisitionApproach, setAcquisitionApproach] = useState<string>('seat-based')
  const [dataSpend, setDataSpend] = useState(245000)
  const [savingsView, setSavingsView] = useState<'annual' | 'monthly'>('annual')

  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const toggleActivity = (activity: string) => {
    setSelectedActivities(prev =>
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    )
  }

  // Calculate estimated savings based on spend
  const estimatedSavings = Math.round(dataSpend * 0.35)
  const displaySavings = savingsView === 'annual' ? estimatedSavings : Math.round(estimatedSavings / 12)


  return (
    <section ref={calculatorRef} className="bg-white px-6 py-24 scroll-mt-24">
      <div className="mx-auto">
        <div className="flex items-start justify-between mb-16">

          <div className="max-w-5xl mb-16 text-left">
            <h2 className="mb-4 text-3xl md:text-5xl font-black">
              Calculate Your Potential Savings
            </h2>
            <p className="max-w-2xl text-lg text-muted-foreground">
              See how much you could save by switching to ADXC's on-demand model.
            </p>
          </div>

        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Calculator Form */}
          <div className="flex-1 space-y-12">
            {/* Data Usage Activities */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-5">
                Your Data Usage Activities <span className="text-pink-600">(Multi-select)</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {usageActivities.map(activity => (
                  <button
                    key={activity}
                    onClick={() => toggleActivity(activity)}
                    className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${selectedActivities.includes(activity)
                      ? 'bg-[#66023c] text-white shadow-md'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                  >
                    {activity}
                  </button>
                ))}
              </div>
            </div>

            {/* Acquisition Approach */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-5">
                Your Approach to Data Acquisition
              </label>
              <div className="flex flex-col md:flex-row gap-5">
                <button
                  onClick={() => setAcquisitionApproach('seat-based')}
                  className={`relative flex-1 p-6 rounded-xl border-2 transition-all ${acquisitionApproach === 'seat-based'
                    ? 'border-[#66023c] bg-pink-50/30'
                    : 'border-gray-200 bg-white'
                    }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${acquisitionApproach === 'seat-based' ? 'bg-pink-100' : 'bg-gray-100'
                      }`}>
                      <svg className={`w-5 h-5 ${acquisitionApproach === 'seat-based' ? 'text-[#66023c]' : 'text-gray-500'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                      </svg>
                    </div>
                    <div className={`font-bold ${acquisitionApproach === 'seat-based' ? 'text-gray-900' : 'text-gray-600'}`}>
                      Seat-Based<br />Subscription
                    </div>
                  </div>
                  {acquisitionApproach === 'seat-based' && (
                    <div className="absolute top-3 right-3">
                      <Check className="w-5 h-5 text-[#66023c]" />
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setAcquisitionApproach('api')}
                  className={`relative flex-1 p-6 rounded-xl border-2 transition-all ${acquisitionApproach === 'api'
                    ? 'border-[#66023c] bg-pink-50/30'
                    : 'border-gray-200 bg-white'
                    }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${acquisitionApproach === 'api' ? 'bg-pink-100' : 'bg-gray-100'
                      }`}>
                      <svg className={`w-5 h-5 ${acquisitionApproach === 'api' ? 'text-[#66023c]' : 'text-gray-500'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 20V10M12 20V4M6 20v-6" />
                      </svg>
                    </div>
                    <div className={`font-medium ${acquisitionApproach === 'api' ? 'text-gray-900' : 'text-gray-600'}`}>
                      API Subscription
                    </div>
                  </div>
                  {acquisitionApproach === 'api' && (
                    <div className="absolute top-3 right-3">
                      <Check className="w-5 h-5 text-[#66023c]" />
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setAcquisitionApproach('report')}
                  className={`relative flex-1 p-6 rounded-xl border-2 transition-all ${acquisitionApproach === 'report'
                    ? 'border-[#66023c] bg-pink-50/30'
                    : 'border-gray-200 bg-white'
                    }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${acquisitionApproach === 'report' ? 'bg-pink-100' : 'bg-gray-100'
                      }`}>
                      <svg className={`w-5 h-5 ${acquisitionApproach === 'report' ? 'text-[#66023c]' : 'text-gray-500'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                    </div>
                    <div className={`font-medium ${acquisitionApproach === 'report' ? 'text-gray-900' : 'text-gray-600'}`}>
                      Report Purchase
                    </div>
                  </div>
                  {acquisitionApproach === 'report' && (
                    <div className="absolute top-3 right-3">
                      <Check className="w-5 h-5 text-[#66023c]" />
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Data Spend Slider */}
            <div className="pt-2">
              <div className="flex items-end justify-between mb-8">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Current Data Spend (Annual)
                </label>
                <div className="text-4xl font-bold text-[#66023c] tracking-tight">
                  ${dataSpend.toLocaleString()}
                </div>
              </div>

              <div className="relative pt-5">
                <input
                  type="range"
                  min="1000"
                  max="500000"
                  value={dataSpend}
                  onChange={(e) => setDataSpend(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#66023c] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:bg-[#66023c] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-white"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-4">
                  <span>$1k</span>
                  <span>$500k</span>
                </div>
              </div>
            </div>
          </div>

          {/* Savings Results Card */}
          <div className="lg:w-[496px] bg-[#66023c] border border-pink-700 rounded-[32px] p-10 shadow-2xl relative overflow-hidden">
            {/* Decorative blurs */}

            <div className="relative">
              {/* Header */}
              <div className="flex items-center justify-between mb-10">
                <span className="text-pink-100 text-lg font-medium">Your Estimated Savings</span>
                <div className="flex bg-[#500724]/40 backdrop-blur border border-pink-700/50 rounded-xl p-2">
                  <button
                    onClick={() => setSavingsView('annual')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold ${savingsView === 'annual' ? 'bg-white text-[#66023c]' : 'text-pink-300'
                      }`}
                  >
                    Annual
                  </button>
                  <button
                    onClick={() => setSavingsView('monthly')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold ${savingsView === 'monthly' ? 'bg-white text-[#66023c]' : 'text-pink-300'
                      }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              {/* Savings Amount */}
              <div className="text-white text-[80px] font-bold tracking-tight leading-none mb-4">
                ${displaySavings.toLocaleString()}
              </div>

              {/* Description */}
              <p className="text-pink-200/90 text-sm font-light leading-relaxed mb-12 opacity-90">
                Based on typical efficiency gains using ADXC's targeted acquisition strategy vs traditional seat-based models.
              </p>

              {/* Benefits */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-7 h-7 bg-emerald-400 rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-white font-medium">Reduce wasted data spend by 35%</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-7 h-7 bg-emerald-400 rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-white font-medium">Pay only for specific answers needed</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-7 h-7 bg-emerald-400 rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-white font-medium">Zero implementation overhead</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

