"use client"

import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { ArrowRight, Building2, Database, Sparkles } from "lucide-react"
import { Badge } from "./ui/badge"

type Portal = {
  href: string
  title: string
  description: string
  badge: string
  Icon: LucideIcon
}

const portals: Portal[] = [
  {
    href: "/brands",
    title: "Brands & SMEs",
    description:
      "Connect ADXC to get decision-grade market and consumer insights on demand, without expensive annual licences.",
    badge: "For SMEs",
    Icon: Building2,
  },
  {
    href: "/data-providers",
    title: "Data Providers",
    description:
      "Connect to ADXC to monetise your data with pay-per-use access for SMEs, without exposing raw datasets.",
    badge: "For Data Providers",
    Icon: Database,
  },
  {
    href: "/ai-platforms",
    title: "AI Platforms",
    description:
      "Add ADXC to your marketplace to deliver dramatically better outcomes inside your workflows.",
    badge: "For AI Platforms",
    Icon: Sparkles,
  },
]

const styles = {
  card: [
    "group flex flex-col text-left",
    "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm",
    "transition-all duration-300 hover:shadow-lg",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2",
  ].join(" "),
  iconWrap: "flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 transition-all duration-300",
  badge: "bg-pink-100 border-adxc px-4 py-2",
  title: "mt-4 text-xl font-semibold text-gray-900",
  desc: "mb-4 flex-grow text-sm leading-relaxed text-gray-600",
  explore: "flex items-center gap-2",
  exploreText: "text-sm font-medium text-gray-700 transition-all",
  exploreIcon: "h-4 w-4 text-gray-700 transition-all group-hover:translate-x-1",
} as const

function PortalCard({ portal }: { portal: Portal }) {
  const { href, title, description, badge, Icon } = portal

  return (
    <Link href={href} className={styles.card} aria-label={`Explore ${title}`}>
      <div className="flex items-center justify-between">
        <div className={styles.iconWrap}>
          <Icon className="h-6 w-6 text-adxc" />
        </div>

        <Badge variant="outline" className={styles.badge}>
          <span className="text-xs font-medium text-adxc">{badge}</span>
        </Badge>
      </div>

      <h3 className={styles.title}>{title}</h3>

      <p className={styles.desc}>{description}</p>

      <div className={styles.explore}>
        <span className={styles.exploreText}>Explore</span>
        <ArrowRight className={styles.exploreIcon} />
      </div>
    </Link>
  )
}

export function AudiencePortalSelector() {
  return (
    <section
      aria-labelledby="audience-portal-heading"
      className="relative mb-24 flex items-center justify-center px-6 py-12"
    >
      <div className="relative z-10 w-full max-w-4xl">
        <header className="mb-12">
          <h2
            id="audience-portal-heading"
            className="mb-4 text-balance text-2xl font-bold leading-tight text-foreground sm:text-3xl md:text-4xl"
          >
            Explore How
            <br />
            ADXC Works
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {portals.map((portal) => (
            <PortalCard key={portal.href} portal={portal} />
          ))}
        </div>
      </div>
    </section>
  )
}

