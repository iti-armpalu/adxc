// components/ScaledSlider.tsx
"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";

export type ScaleSegment = {
  from: number; // inclusive
  to: number;   // inclusive
  step: number;
};

const DEFAULT_BUDGET_SEGMENTS: readonly ScaleSegment[] = [
  { from: 0, to: 100_000, step: 1_000 },
  { from: 100_000, to: 250_000, step: 10_000 },
  { from: 250_000, to: 500_000, step: 50_000 },
] as const;

type BudgetSliderProps = {
  value: number; // real budget value
  onValueChange: (value: number) => void;
  segments?: readonly ScaleSegment[]; // optional override
  disabled?: boolean;
  className?: string;
};

function buildValues(segments: readonly ScaleSegment[]): number[] {
  const vals: number[] = [];
  for (const s of segments) {
    if (s.step <= 0) continue;
    for (let v = s.from; v <= s.to; v += s.step) vals.push(v);
  }
  return Array.from(new Set(vals)).sort((a, b) => a - b);
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function nearestIndex(sorted: readonly number[], target: number): number {
  const last = sorted.length - 1;
  if (last <= 0) return 0;

  const t = clamp(target, sorted[0]!, sorted[last]!);

  let lo = 0;
  let hi = last;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const mv = sorted[mid]!;
    if (mv === t) return mid;
    if (mv < t) lo = mid + 1;
    else hi = mid - 1;
  }

  const above = clamp(lo, 0, last);
  const below = clamp(above - 1, 0, last);
  return t - sorted[below]! <= sorted[above]! - t ? below : above;
}

export function ScaledSlider({
  value,
  onValueChange,
  segments = DEFAULT_BUDGET_SEGMENTS,
  disabled,
  className,
}: BudgetSliderProps) {
  const values = React.useMemo(() => buildValues(segments), [segments]);
  const maxIndex = Math.max(0, values.length - 1);
  const index = React.useMemo(() => nearestIndex(values, value), [values, value]);

  return (
    <Slider
      className={className}
      disabled={disabled}
      value={[index]}
      onValueChange={([i]) => {
        const idx = clamp(i, 0, maxIndex);
        onValueChange(values[idx] ?? value);
      }}
      min={0}
      max={maxIndex}
      step={1}
    />
  );
}
