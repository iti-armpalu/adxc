"use client";

import { usePathname } from "next/navigation";
import { AudienceCard } from "@/components/cards/audience-card";
import { PERSONAS, getPersona } from "@/lib/personas";
import { cn } from "@/lib/utils";

export function AudienceCards() {
    const current = getPersona(usePathname());
    const items = current ? PERSONAS.filter((p) => p.href !== current.href) : PERSONAS;

    return (
        <section className="bg-card">
            <div className="mx-auto max-w-7xl space-y-12 px-4 py-16 text-center sm:px-6 sm:py-24">
                <h2 className="text-primary">
                    {current ? "Explore other audiences" : "Explore how ADXC works"}
                </h2>
                <div
                    className={cn(
                        "grid grid-cols-1 gap-4 sm:grid-cols-2",
                        items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
                    )}
                >
                    {items.map((persona) => (
                        <AudienceCard key={persona.href} persona={persona} />
                    ))}
                </div>
            </div>
        </section>
    );
}