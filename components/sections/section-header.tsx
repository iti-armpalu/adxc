import { ReactNode } from "react"
import { cn } from "@/lib/utils"

type Align = "center" | "left"
type ResponsiveAlign = Align | { base?: Align; md?: Align }

type SectionHeaderProps = {
  title: ReactNode
  description?: ReactNode
  align?: ResponsiveAlign
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeClasses: Record<
  NonNullable<SectionHeaderProps["size"]>,
  { wrapper: string; title: string; description: string }
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
    description: "text-lg md:text-2xl",
  },
}

function getAlignClasses(align: ResponsiveAlign) {
  if (typeof align === "string") {
    return align === "center"
      ? { wrapper: "mx-auto text-center max-w-5xl", p: "mx-auto" }
      : { wrapper: "text-left max-w-5xl", p: "" }
  }

  const base = align.base ?? "center"
  const md = align.md

  return {
    wrapper: cn(
      base === "center"
        ? "mx-auto text-center max-w-5xl"
        : "text-left max-w-5xl",
      md === "center" && "md:text-center md:mx-auto",
      md === "left" && "md:text-left md:mx-0" // ✅ key line
    ),
    p: cn(
      base === "center" ? "mx-auto" : "",
      md === "center" && "md:mx-auto",
      md === "left" && "md:mx-0"
    ),
  }
}


export function SectionHeader({
  title,
  description,
  align = "center",
  size = "md",
  className,
}: SectionHeaderProps) {
  const styles = sizeClasses[size]
  const alignClasses = getAlignClasses(align)

  return (
    <div className={cn(styles.wrapper, alignClasses.wrapper, className)}>
      <h2 className={cn("mb-4 font-black leading-tight tracking-tight", styles.title)}>
        {title}
      </h2>

      {description && (
        <p className={cn("text-muted-foreground", styles.description, alignClasses.p)}>
          {description}
        </p>
      )}
    </div>
  )
}
