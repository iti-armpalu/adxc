import type { LucideIcon } from "lucide-react";
import { ArrowDown, Cpu, Database, TrendingUp } from "lucide-react";
import { getPersona } from "@/lib/personas";
import { cn } from "@/lib/utils";

type Group = {
    title: string;
    icon: LucideIcon;
    persona: string; // route, used for the persona colour
    chain: string[];
    example: string;
};

const GROUPS: Group[] = [
    {
        title: "Businesses",
        icon: TrendingUp,
        persona: "/brands",
        chain: ["Affordable trusted data", "Better decisions", "Faster growth"],
        example: "ADXC helps DEPT's AI use marketing data without breaking the bank.",
    },
    {
        title: "Data providers",
        icon: Database,
        persona: "/data-providers",
        chain: ["Unlock SME market", "Monetising an $11B opportunity"],
        example: "ADXC helps YouGov reach SMEs that need their data but can't afford a subscription.",
    },
    {
        title: "AI tools",
        icon: Cpu,
        persona: "/ai-platforms",
        chain: ["Better data", "Trusted outputs", "Higher usage"],
        example: "ADXC helps Miro's AI agents answer marketing questions reliably.",
    },
];

export function StakeholderBenefits({ className }: { className?: string }) {
    return (
        <section className={cn(className)}>
            <div className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 sm:py-24">
                <h2 className="mx-auto max-w-3xl text-balance text-center text-heading">
                    ADXC benefits everyone
                </h2>

                <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
                    {GROUPS.map(({ title, icon: Icon, persona, chain, example }) => {
                        const color = getPersona(persona)?.color;
                        return (
                            <li key={title} className="flex flex-col items-center rounded-xl border bg-card p-6 text-center shadow-sm sm:p-8">
                                <span
                                    className="flex size-12 items-center justify-center rounded-full text-primary-foreground"
                                    style={{ backgroundColor: color }}
                                >
                                    <Icon className="size-6" aria-hidden />
                                </span>

                                <h3 className="mt-5 text-lg md:text-xl">{title}</h3>

                                <p className="mt-2 flex-1 text-balance leading-relaxed text-foreground-alt">
                                    {chain.slice(0, -1).join(" = ")} ={" "}
                                    <span className="font-semibold" style={{ color }}>
                                        {chain.at(-1)}
                                    </span>
                                </p>

                                <p className="mt-6 border-t pt-5 text-sm leading-relaxed text-muted-foreground">
                                    <span className="font-medium text-foreground-alt">e.g. </span>
                                    {example}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}