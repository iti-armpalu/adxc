'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, TrendingUp } from "lucide-react";

const Calculator = () => {
  const [dataSources, setDataSources] = useState([3]);
  const [avgCostPerSource, setAvgCostPerSource] = useState([75000]);
  const [utilizationRate, setUtilizationRate] = useState([10]);
  
  const [traditionalCost, setTraditionalCost] = useState(0);
  const [adxcCost, setAdxcCost] = useState(0);
  const [savings, setSavings] = useState(0);
  const [savingsPercent, setSavingsPercent] = useState(0);

  useEffect(() => {
    const sources = dataSources[0];
    const costPerSource = avgCostPerSource[0];
    const utilization = utilizationRate[0] / 100;
    
    const traditional = sources * costPerSource;
    const adxc = traditional * utilization * 1.2; // 20% markup on utilized data
    const saved = traditional - adxc;
    const percent = (saved / traditional) * 100;
    
    setTraditionalCost(traditional);
    setAdxcCost(adxc);
    setSavings(saved);
    setSavingsPercent(percent);
  }, [dataSources, avgCostPerSource, utilizationRate]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section id="calculator" className="relative py-24">
      <div className="container">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-black md:text-5xl">
            Calculate Your <span className="text-gradient">Savings</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            See how much you could save by switching to pay-per-answer pricing.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-border bg-gradient-card p-8 shadow-card md:p-12">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Inputs */}
              <div className="space-y-8">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <label className="text-sm font-medium">Number of Data Sources</label>
                    <span className="rounded-lg bg-secondary px-3 py-1 text-sm font-bold">{dataSources[0]}</span>
                  </div>
                  <Slider
                    value={dataSources}
                    onValueChange={setDataSources}
                    max={12}
                    min={1}
                    step={1}
                    className="py-2"
                  />
                </div>

                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <label className="text-sm font-medium">Avg. Cost Per Source</label>
                    <span className="rounded-lg bg-secondary px-3 py-1 text-sm font-bold">
                      {formatCurrency(avgCostPerSource[0])}
                    </span>
                  </div>
                  <Slider
                    value={avgCostPerSource}
                    onValueChange={setAvgCostPerSource}
                    max={200000}
                    min={10000}
                    step={5000}
                    className="py-2"
                  />
                </div>

                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <label className="text-sm font-medium">Your Estimated Data Utilization</label>
                    <span className="rounded-lg bg-secondary px-3 py-1 text-sm font-bold">{utilizationRate[0]}%</span>
                  </div>
                  <Slider
                    value={utilizationRate}
                    onValueChange={setUtilizationRate}
                    max={50}
                    min={5}
                    step={5}
                    className="py-2"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Most enterprises utilize less than 10% of their purchased data
                  </p>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                <div className="rounded-2xl bg-background/50 p-6">
                  <div className="mb-2 text-sm text-muted-foreground">Traditional Annual Cost</div>
                  <div className="text-3xl font-black text-destructive line-through opacity-70">
                    {formatCurrency(traditionalCost)}
                  </div>
                </div>

                <div className="rounded-2xl bg-background/50 p-6">
                  <div className="mb-2 text-sm text-muted-foreground">With ADXC</div>
                  <div className="text-3xl font-black text-success">
                    {formatCurrency(adxcCost)}
                  </div>
                </div>

                <div className="rounded-2xl border-2 border-success/30 bg-success/5 p-6">
                  <div className="mb-2 flex items-center gap-2 text-sm text-success">
                    <TrendingUp className="h-4 w-4" />
                    Annual Savings
                  </div>
                  <div className="text-4xl font-black text-gradient">
                    {formatCurrency(savings)}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {savingsPercent.toFixed(0)}% reduction in data costs
                  </div>
                </div>

                <Button size="lg" className="w-full">
                  Start Saving Today
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
