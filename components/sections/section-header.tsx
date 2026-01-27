import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses: Record<
  NonNullable<SectionHeaderProps["size"]>,
  {
    wrapper: string;
    title: string;
    description: string;
  }
> = {
  sm: {
    wrapper: "mb-10",
    title: "text-2xl md:text-3xl",
    description: "text-base md:text-lg",
  },
  md: {
    wrapper: "mb-14 md:mb-16",
    title: "text-3xl md:text-5xl",
    description: "text-lg",
  },
  lg: {
    wrapper: "mb-16 md:mb-20",
    title: "text-4xl md:text-6xl",
    description: "text-lg md:text-xl",
  },
};

export function SectionHeader({
  title,
  description,
  align = "center",
  size = "md",
  className,
}: SectionHeaderProps) {
  const styles = sizeClasses[size];

  return (
    <div
      className={cn(
        styles.wrapper,
        align === "center"
          ? "mx-auto text-center max-w-5xl"
          : "text-left max-w-5xl",
        className
      )}
    >
      <h2
        className={cn(
          "mb-4 font-black leading-tight tracking-tight",
          styles.title
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={[
            "text-muted-foreground",
            styles.description,
            align === "center" ? "mx-auto" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {description}
        </p>
      )}
    </div>
  );
}
