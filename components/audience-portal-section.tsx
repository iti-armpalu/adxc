"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Building2, Database, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";

type Portal = {
  href: string;
  title: string;
  description: string;
  badge: string;
  Icon: LucideIcon;
};

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
];

function PortalCard({ portal }: { portal: Portal }) {
  const { href, title, description, badge, Icon } = portal;

  return (
    <Link
      href={href}
      aria-label={`Explore ${title}`}
      className="
        group flex flex-col text-left
        rounded-2xl border border-gray-200 bg-white p-6 shadow-sm
        transition-all duration-300 hover:shadow-lg
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2
      "
    >
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 transition-colors group-hover:bg-pink-200">
          <Icon className="h-6 w-6 text-adxc" />
        </div>

        <Badge
          variant="outline"
          className="border-adxc/30 bg-pink-100 px-3 py-1"
        >
          <span className="text-xs font-medium text-adxc">{badge}</span>
        </Badge>
      </div>

      <h3 className="mt-4 text-xl font-semibold text-gray-900">{title}</h3>

      <p className="mb-4 flex-grow text-sm leading-relaxed text-gray-600">
        {description}
      </p>

      <div className="mt-auto flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700 transition-colors group-hover:text-gray-900">
          Explore
        </span>
        <ArrowRight className="h-4 w-4 text-gray-700 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

export function AudiencePortalSection() {
  return (
    <Section size="md" className="mb-24">
      <Container size="lg">
        <header className="mb-12">
          <h2
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
      </Container>
    </Section>
  );
}
