import type { LucideIcon } from "lucide-react";
import { Bot, Briefcase, Building2, Database, Search, Users } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { icon: LucideIcon; title: string; description: string };

const PREVIOUS: Item[] = [
    { icon: Users, title: "Human-centric data access", description: "Data accessed and interpreted by humans" },
    { icon: Database, title: "Full dataset requirement", description: "Full dataset visibility required for analysis" },
    { icon: Building2, title: "Enterprise-only economics", description: "Economically viable only for large enterprises" },
];

const NEW: Item[] = [
    { icon: Bot, title: "Agent-native data access", description: "Data accessed by AI agents" },
    { icon: Search, title: "Query-based retrieval", description: "Only the data required to answer a query is retrieved and seen" },
    { icon: Briefcase, title: "SME-enabled workflows", description: "Enables enterprise-grade workflows for SMEs, where decisions are made" },
];

export function StructuralShift() {
    return (
        <section>
            <div className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 sm:py-24">
                <h2 className="mx-auto max-w-3xl text-balance text-center text-heading">
                    AI agents make this SME market accessible
                </h2>

                <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
                    <RealityCard label="Previous reality" title="Human-centric data access" items={PREVIOUS} />

                    <div className="flex items-center gap-4 lg:flex-col">
                        <span aria-hidden className="h-px flex-1 bg-border lg:h-auto lg:w-px" />
                        <span className="whitespace-nowrap rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                            Structural shift
                        </span>
                        <span aria-hidden className="h-px flex-1 bg-border lg:h-auto lg:w-px" />
                    </div>

                    <RealityCard label="New reality" title="Agent-native data access" items={NEW} highlight />
                </div>
            </div>
        </section>
    );
}

function RealityCard({
    label,
    title,
    items,
    highlight = false,
}: {
    label: string;
    title: string;
    items: Item[];
    highlight?: boolean;
}) {
    return (
        <div
            className={cn(
                "rounded-xl border p-6 sm:p-8",
                highlight ? "border-primary-muted bg-primary-subtle" : "bg-card"
            )}
        >
            <span
                className={cn(
                    "inline-block rounded-full px-3 py-1 text-xs font-medium",
                    highlight ? "bg-primary text-primary-foreground" : "bg-muted text-mid-alt"
                )}
            >
                {label}
            </span>
            <h3 className={cn("mt-4", highlight ? "text-primary" : "text-foreground")}>{title}</h3>

            <ul className="mt-8 space-y-6">
                {items.map(({ icon: Icon, title: itemTitle, description }) => (
                    <li key={itemTitle} className="flex items-start gap-4">
                        <span
                            className={cn(
                                "flex size-10 shrink-0 items-center justify-center rounded-lg",
                                highlight ? "bg-card text-primary" : "bg-muted text-mid-alt"
                            )}
                        >
                            <Icon className="size-5" aria-hidden />
                        </span>
                        <div>
                            <p className="font-medium text-foreground">{itemTitle}</p>
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}