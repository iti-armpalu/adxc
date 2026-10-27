import type { LucideIcon } from "lucide-react";
import { Cpu, Database, TrendingUp, Users } from "lucide-react";

export type Persona = {
    href: string;
    label: string;
    description: string;
    Icon: LucideIcon;
    color: string; // icon circle, persona's main colour
};

export const PERSONAS: Persona[] = [
    {
        href: "/brands",
        label: "For brands",
        description:
            "Connect ADXC to get decision-grade market and consumer insights on demand, without expensive annual licences.",
        Icon: TrendingUp,
        color: "var(--color-purple-700)",
    },
    {
        href: "/agencies",
        label: "For agencies",
        description:
            "Monetise your clients' marketing data usage, and cut your own data budget in half.",
        Icon: Users,
        color: "var(--color-orange-700)",
    },
    {
        href: "/data-providers",
        label: "For data providers",
        description:
            "Connect to ADXC to monetise your data with pay-per-use access for SMEs, without exposing raw datasets.",
        Icon: Database,
        color: "var(--color-blue-600)",
    },
    {
        href: "/ai-platforms",
        label: "For AI platforms",
        description:
            "Add ADXC to your marketplace to deliver dramatically better outcomes inside your workflows.",
        Icon: Cpu,
        color: "var(--color-cyan-600)",
    },
];

export function getPersona(pathname: string): Persona | null {
    return (
        PERSONAS.find((p) => pathname === p.href || pathname.startsWith(`${p.href}/`)) ?? null
    );
}