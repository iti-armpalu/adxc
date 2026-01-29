'use client'

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, Check, TrendingUp } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";

const dataTypes = ['Consumer', 'Media', 'Retail', 'Brand', 'Strategy'];

interface ClientTier {
  name: string;
  label: string;
  min: number;
  max: number;
  defaultValue: number;
  revenueMultiplier: number;
}

const clientTiers: ClientTier[] = [
  { name: 'micro', label: 'Micro Clients', min: 500, max: 15000, defaultValue: 5000, revenueMultiplier: 0.8 },
  { name: 'small', label: 'Small Clients', min: 100, max: 3000, defaultValue: 800, revenueMultiplier: 2.5 },
  { name: 'medium', label: 'Medium Clients', min: 50, max: 1000, defaultValue: 200, revenueMultiplier: 8 },
];


export default function CalculatorDataProviders() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [revenueView, setRevenueView] = useState<'annual' | 'monthly'>('annual');
  const [clientCounts, setClientCounts] = useState<Record<string, number>>({
    micro: 5000,
    small: 800,
    medium: 200,
  });

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const updateClientCount = (tier: string, value: number) => {
    setClientCounts(prev => ({ ...prev, [tier]: value }));
  };

  // Calculate estimated revenue based on client counts and selected data types
  const typeMultiplier = Math.max(1, selectedTypes.length * 0.4 + 0.6);
  const estimatedRevenue = Math.round(
    clientTiers.reduce((total, tier) => {
      return total + (clientCounts[tier.name] * tier.revenueMultiplier);
    }, 0) * typeMultiplier
  );

  const displayRevenue = revenueView === 'annual' ? estimatedRevenue : Math.round(estimatedRevenue / 12);


  return (
    <Section size="lg">
      <Container>
        <div className="flex flex-col items-start">
          <SectionHeader
            title="Calculate your potential earnings"
            description="See how much you could earn by switching to ADXC's on-demand model."
            size="md"
            align="left"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Calculator Form */}
          <div className="flex-1 space-y-12">
            {/* Data Types */}
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-5">
                Your Data Types <span className="text-pink-600">(Multi-select)</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {dataTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => toggleType(type)}
                    className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${selectedTypes.includes(type)
                      ? 'bg-adxc text-primary-foreground shadow-md'
                      : 'bg-card border border-border text-muted-foreground hover:border-primary/50'
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Client Tiers Sliders */}
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-8">
                Number of Clients by Tier
              </label>

              <div className="space-y-10">
                {clientTiers.map(tier => (
                  <div key={tier.name} className="space-y-4">
                    <div className="flex items-end justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full bg-stone-300`} />
                        <span className="text-sm font-semibold text-foreground">{tier.label}</span>
                      </div>
                      <div className="text-2xl font-bold text-adxc tabular-nums">
                        {clientCounts[tier.name].toLocaleString()}
                      </div>
                    </div>

                    <div className="relative">

                      <Slider
                        value={[clientCounts[tier.name]]}
                        onValueChange={([v]) => updateClientCount(tier.name, v)}
                        min={tier.min}
                        max={tier.max}
                        step={1}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>{tier.min.toLocaleString()}</span>
                        <span>{tier.max.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Revenue Results Card */}
          <div className="lg:w-[496px] bg-adxc rounded-[32px] p-10 shadow-2xl relative overflow-hidden">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-black/10 rounded-full blur-3xl" />

            <div className="relative">
              {/* Header */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2">
                  <span className="text-primary-foreground/90 text-lg font-medium">Your Estimated Earnings</span>
                </div>
                <div className="flex bg-black/20 backdrop-blur border border-white/10 rounded-xl p-1.5">
                  <button
                    onClick={() => setRevenueView('annual')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${revenueView === 'annual'
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-primary-foreground/70 hover:text-primary-foreground'
                      }`}
                  >
                    Annual
                  </button>
                  <button
                    onClick={() => setRevenueView('monthly')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${revenueView === 'monthly'
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-primary-foreground/70 hover:text-primary-foreground'
                      }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              {/* Revenue Amount */}
              <div className="text-primary-foreground text-[72px] md:text-[80px] font-bold tracking-tight leading-none mb-4">
                ${displayRevenue.toLocaleString()}
              </div>

              {/* Description */}
              <p className="text-primary-foreground/70 text-sm font-light leading-relaxed mb-12">
                Estimated {revenueView} revenue based on your client distribution and data offerings through ADXC's marketplace.
              </p>

              {/* Benefits */}
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-7 h-7 bg-emerald-400 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-primary-foreground font-medium">Access to 500+ enterprise buyers</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-7 h-7 bg-emerald-400 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-primary-foreground font-medium">Automated billing & distribution</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-7 h-7 bg-emerald-400 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-primary-foreground font-medium">Real-time usage analytics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

