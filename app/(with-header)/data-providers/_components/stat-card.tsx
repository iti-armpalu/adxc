import { cn } from "@/lib/utils";

interface StatCardProps {
  stat: string;
  description: string;
  variant?: "default" | "gradient" | "outlined";
  className?: string;
}

export function StatCard({ stat, description, variant = "default", className }: StatCardProps) {
  return (
    <div 
      className={cn(
        "text-center p-8 rounded-2xl transition-all duration-300",
        variant === "gradient" && "bg-adxc text-background shadow-xl",
        variant === "outlined" && "border-2 border-foreground/20 hover:border-foreground/40 bg-background",
        variant === "default" && "bg-secondary/50",
        className
      )}
    >
      <div 
        className={cn(
          "text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 tracking-tight",
          variant === "gradient" ? "text-background" : "text-foreground"
        )}
      >
        {stat}
      </div>
      <p className={cn(
        "text-base md:text-lg max-w-xs mx-auto leading-relaxed",
        variant === "gradient" ? "text-background/80" : "text-muted-foreground"
      )}>
        {description}
      </p>
    </div>
  );
}
