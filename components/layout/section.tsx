// Section controls vertical rhythm
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses: Record<
  NonNullable<SectionProps["size"]>,
  string
> = {
  sm: "py-8",
  md: "py-12 md:py-16",
  lg: "py-20 md:py-28",
};

export function Section({
  children,
  className,
  size = "md",
}: SectionProps) {
  return (
    <section
      className={cn(
        sizeClasses[size],
        className
      )}
    >
      {children}
    </section>
  );
}
