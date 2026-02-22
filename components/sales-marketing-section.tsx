'use client'

import { useState } from "react";
import { Container } from "./layout/container"
import { Section } from "./layout/section"
import { SectionHeader } from "./sections/section-header"

import { Card, CardContent } from "@/components/ui/card";

const salesChannels = [
    {
        name: "AI platform integrations (e.g. Miro, Jasper)",
        description: "Marketing companies, especially SMEs, use tools like Miro, Jasper, and others to build their plans. Plugging ADXC allows them to keep using familiar marketing tools, but make more informed plans with data. This is also identified as a gap by those tools, so they have invited to integrate quickly and be present at their events. For example, the confirmed Miro integration gives us direct access to 100M users working at 110,000 SMEs.",
        images: ["miro-canvas-26.png", "miro-canvas.png"],
        statement: " Data providers that sign up now will get immediate access to these customers via ADXC, and be part of our launch presentation on stage.",
    },
    {
        name: "Agency / consultancy direct sales",
        standout: "150K contract with first client secured",
        description: "We have already secured a 150K contract for data utilization as a direct integration into their AI stack.",
    },
    {
        name: "Agency / consultancy referral programme",
        standout: "MOU with first referral agency secured",
        description: "We have already secured a relationship with an agency that has an annual revenue of more than $500M and a global client footprint.",
    },
    {
        name: "SME self-serve",
        description: "Coming soon.",
    },
]

export default function SalesMarketingSection() {
    const [active, setActive] = useState(0)


    return (
        <Section size="md">
            <Container size="lg">

                <div className="text-center mb-8">
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-adxc bg-pink-50 px-3 py-1 rounded-full mb-3">Sales & Marketing</span>
                    <SectionHeader
                        title="We have an intermediary distribution plan in place to get scale quickly"
                        size="sm"
                        align="center"
                    />
                </div>

                <Card className="border-none bg-card shadow-none py-0">
                    <CardContent className="p-6 sm:p-8">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="md:w-1/3 flex flex-col gap-2">
                                <span className="inline-block text-xs font-semibold uppercase text-muted-foreground">Sales Channels</span>
                                {salesChannels.map((ch, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActive(i)}
                                        className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${active === i
                                            ? "bg-adxc text-primary-foreground"
                                            : "bg-muted/50 text-muted-foreground hover:bg-muted"
                                            }`}
                                    >
                                        {ch.name}
                                    </button>
                                ))}
                            </div>
                            <div className="md:w-2/3 flex items-stretch">
                                <div className="p-4 sm:p-6 rounded-xl bg-muted/30 border border-border w-full">
                                    <h3 className="text-lg font-semibold text-foreground mb-3">{salesChannels[active].name}</h3>
                                    {salesChannels[active].standout && (
                                        <p className="text-xl sm:text-3xl font-bold text-primary mb-3">{salesChannels[active].standout}</p>
                                    )}
                                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                                        {salesChannels[active].description}
                                    </p>

                                    {salesChannels[active].images && (
                                        < div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            <div className="overflow-hidden">
                                                <img
                                                    src={salesChannels[active].images[0]}
                                                    alt="Miro Canvas26 conference stage presentation"
                                                    className="w-full h-64 object-contain"
                                                />
                                            </div>
                                            <div className="overflow-hidden">
                                                <img
                                                    src={salesChannels[active].images[1]}
                                                    alt="ADXC integrated within Miro collaborative workspace"
                                                    className="w-full h-64 object-contain"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {salesChannels[active].statement && (
                                        <div className="bg-adxc rounded-xl p-8 md:p-10 text-center">
                                            <p className="text-lg font-medium text-white leading-relaxed mx-auto">
                                                {salesChannels[active].statement}
                                            </p>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

            </Container>
        </Section >
    )
}
