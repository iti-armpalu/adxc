import { ReactNode } from "react"

type SectionHeaderProps = {
  title: ReactNode
  description: ReactNode
  align?: "center" | "left"
  size?: "sm" | "md" | "lg"
}

const sizeClasses: Record<
  NonNullable<SectionHeaderProps["size"]>,
  {
    wrapper: string
    title: string
    description: string
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
}

export function SectionHeader({
  title,
  description,
  align = "center",
  size = "md",
}: SectionHeaderProps) {
  const styles = sizeClasses[size]

  return (
    <div
      className={[
        "mx-auto",
        styles.wrapper,
        align === "center"
          ? "text-center max-w-5xl"
          : "text-left max-w-3xl",
      ].join(" ")}
    >
      <h2
        className={[
          "mb-4 font-black leading-tight tracking-tight",
          styles.title,
        ].join(" ")}
      >
        {title}
      </h2>

      <p
        className={[
          "mx-auto text-muted-foreground",
          styles.description,
          align === "left" && "mx-0",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {description}
      </p>
    </div>
  )
}
