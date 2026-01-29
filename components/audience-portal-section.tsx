"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Building2, Database, Sparkles } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "./sections/section-header";

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
    title: "For brands",
    description:
      "Connect ADXC to get decision-grade market and consumer insights on demand, without expensive annual licences.",
    badge: "For SMEs",
    Icon: Building2,
  },
  {
    href: "/data-providers",
    title: "For data providers",
    description:
      "Connect to ADXC to monetise your data with pay-per-use access for SMEs, without exposing raw datasets.",
    badge: "For Data Providers",
    Icon: Database,
  },
  {
    href: "/ai-platforms",
    title: "For AI platforms",
    description:
      "Add ADXC to your marketplace to deliver dramatically better outcomes inside your workflows.",
    badge: "For AI Platforms",
    Icon: Sparkles,
  },
];

function PortalCard({ portal }: { portal: Portal }) {
  const { href, title, description, Icon } = portal;

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
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100 transition-colors group-hover:bg-pink-200">
        <Icon className="h-6 w-6 text-adxc" />
      </div>

      <h3 className="mt-4 text-xl font-semibold text-adxc">{title}</h3>

      <p className="mb-4 flex-grow text-sm leading-relaxed text-gray-600">
        {description}
      </p>

      <div className="mt-auto flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
          Explore
        </span>
        <ArrowRight className="h-4 w-4 text-gray-700 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

export function AudiencePortalSection() {
  const pathname = usePathname();

  const visiblePortals =
    pathname === "/"
      ? portals
      : portals.filter((portal) => portal.href !== pathname);

  // If only one portal would remain (edge case), hide the section entirely
  if (visiblePortals.length <= 1) return null;

  return (
    <Section size="md" className="mb-24">
      <Container size="lg">
        <SectionHeader
          title="Explore how ADXC works"
          size="md"
          align="left"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {visiblePortals.map((portal) => (
            <PortalCard key={portal.href} portal={portal} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
