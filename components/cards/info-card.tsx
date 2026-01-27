import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type InfoCardTone = "problem" | "solution";

const toneStyles: Record<
  InfoCardTone,
  {
    dot: string;
    label: string;
    border: string;
  }
> = {
  problem: {
    dot: "bg-red-500",
    label: "text-red-400",
    border: "border-red-500/20",
  },
  solution: {
    dot: "bg-green-500",
    label: "text-green-400",
    border: "border-green-500/20",
  },
};

type InfoCardProps = {
  tone: InfoCardTone;
  label: string;
  children: ReactNode;
  className?: string;
};

export function InfoCard({ tone, label, children, className }: InfoCardProps) {
  const t = toneStyles[tone];

  return (
    <div
      className={cn(
        "bg-card/80 backdrop-blur-xl rounded-xl border p-6 shadow-lg",
        t.border,
        className
      )}
    >
      <div className="mb-4 flex items-center gap-2">
        <div className={cn("h-2 w-2 rounded-full", t.dot)} />
        <h4 className={cn("text-sm font-semibold uppercase tracking-wider", t.label)}>
          {label}
        </h4>
      </div>

      {children}
    </div>
  );
}
