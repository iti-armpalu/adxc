import type { LucideIcon } from "lucide-react";
import { BriefcaseBusiness, Building2, Database, Sparkles } from "lucide-react";

export type Persona = {
    href: string;
    label: string;
    description: string;
    Icon: LucideIcon;
    color?: string; // icon circle; falls back to --primary
};

export const PERSONAS: Persona[] = [
    {
        href: "/data-providers",
        label: "For data providers",
        description:
            "Connect to ADXC to monetise your data with pay-per-use access for SMEs, without exposing raw datasets.",
        Icon: Database,
    },
    {
        href: "/brands",
        label: "For brands",
        description:
            "Connect ADXC to get decision-grade market and consumer insights on demand, without expensive annual licences.",
        Icon: BriefcaseBusiness,
    },
    {
        href: "/ai-platforms",
        label: "For AI platforms",
        description:
            "Add ADXC to your marketplace to deliver dramatically better outcomes inside your workflows.",
        Icon: Sparkles,
    },
    {
        href: "/agencies",
        label: "For agencies",
        description:
            "Monetise your clients' marketing data usage, and cut your own data budget in half.",
        Icon: Building2,
    },
];

export function getPersona(pathname: string): Persona | null {
    return (
        PERSONAS.find((p) => pathname === p.href || pathname.startsWith(`${p.href}/`)) ?? null
    );
}