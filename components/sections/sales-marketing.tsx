"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Channel = {
    name: string;
    status: string;
    live: boolean;
    standout?: string;
    description?: string;
    images?: { src: string; alt: string }[];
    statement?: string;
};

const CHANNELS: Channel[] = [
    {
        name: "AI platform integrations (e.g. Miro, Jasper)",
        status: "Miro integration confirmed",
        live: true,
        description:
            "Marketing companies, especially SMEs, use tools like Miro, Jasper, and others to build their plans. Plugging ADXC allows them to keep using familiar marketing tools, but make more informed plans with data. This is also identified as a gap by those tools, so they have invited us to integrate quickly and be present at their events. For example, the confirmed Miro integration gives us direct access to 100M users working at 110,000 SMEs.",
        images: [
            { src: "/miro-canvas-26.png", alt: "Miro Canvas26 conference stage presentation" },
            { src: "/miro-canvas.png", alt: "ADXC integrated within Miro collaborative workspace" },
        ],
        statement:
            "Data providers that sign up now will get immediate access to these customers via ADXC, and be part of our launch presentation on stage.",
    },
    {
        name: "Agency / consultancy direct sales",
        status: "Contract secured",
        live: true,
        standout: "$150K contract with first client secured",
        description:
            "We have already secured a $150K contract for data utilization as a direct integration into their AI stack.",
    },
    {
        name: "Agency / consultancy referral programme",
        status: "MOU secured",
        live: true,
        standout: "MOU with first referral agency secured",
        description:
            "We have already secured a relationship with an agency that has an annual revenue of more than $500M and a global client footprint.",
    },
    {
        name: "SME self-serve",
        status: "Coming soon",
        live: false,
    },
];

export function SalesMarketing() {
    const [active, setActive] = useState(0);

    return (
        <section className="bg-white">
            <div className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 sm:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-caption mb-3 text-muted-foreground">Sales &amp; marketing</p>
                    <h2 className="text-balance text-primary">
                        We have an intermediary distribution plan in place to get scale quickly
                    </h2>
                </div>

                <div className="mx-auto max-w-5xl">
                    <p className="text-caption mb-3 text-muted-foreground">Sales channels</p>

                    {/* Mobile: stacked cards */}
                    <div className="space-y-4 md:hidden">
                        {CHANNELS.map((ch) => (
                            <ChannelDetails key={ch.name} channel={ch} />
                        ))}
                    </div>

                    {/* Desktop: list + details panel */}
                    <div className="hidden gap-6 md:grid md:grid-cols-[1fr_2fr]">
                        <ul className="space-y-2">
                            {CHANNELS.map((ch, i) => {
                                const on = i === active;
                                return (
                                    <li key={ch.name}>
                                        <button
                                            type="button"
                                            aria-pressed={on}
                                            onClick={() => setActive(i)}
                                            className={cn(
                                                "w-full rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                                on ? "border-primary bg-brand-50" : "border-border bg-card hover:border-border-4"
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    "block text-sm font-semibold",
                                                    on ? "text-primary" : "text-foreground"
                                                )}
                                            >
                                                {ch.name}
                                            </span>
                                            <Status channel={ch} className="mt-1" />
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>

                        <ChannelDetails channel={CHANNELS[active]} />
                    </div>
                </div>
            </div>
        </section>
    );
}

function Status({ channel, className }: { channel: Channel; className?: string }) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 text-xs",
                channel.live ? "text-success" : "text-muted-foreground",
                className
            )}
        >
            <span className={cn("size-1.5 rounded-full", channel.live ? "bg-success" : "bg-border-4")} />
            {channel.status}
        </span>
    );
}

function ChannelDetails({ channel }: { channel: Channel }) {
    return (
        <div className="h-full rounded-xl border bg-card p-5 sm:p-8">
            <h3 className="text-lg">{channel.name}</h3>
            <Status channel={channel} className="mt-1" />

            {channel.standout && (
                <p className="mt-4 text-2xl font-semibold text-primary sm:text-3xl">{channel.standout}</p>
            )}

            {channel.description && (
                <p className="mt-3 leading-relaxed text-foreground-alt">{channel.description}</p>
            )}

            {channel.images && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {channel.images.map((img) => (
                        <div key={img.src} className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                sizes="(min-width: 768px) 30vw, 100vw"
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            )}

            {channel.statement && (
                <div className="mt-6 rounded-xl bg-primary p-5 text-center sm:p-8">
                    <p className="font-medium text-primary-foreground sm:text-lg">{channel.statement}</p>
                </div>
            )}
        </div>
    );
}