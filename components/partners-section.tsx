import { Container } from "./layout/container"
import { Section } from "./layout/section"

import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "./sections/section-header";

const PARTNERS = [
    { name: "Miro", tagline: "AI Innovation Workspace", logo: "/miro-logo.png", description: "We will be integrating with Miros's marketplace at launch, giving us accelerated scale, and will be on-stage at their 2026 tech event." },
    { name: "Revelate", tagline: "Marketplace Builder", logo: "/revelate-logo.png", description: "Revelate is a data marketplace builder that will set up the data exchange marketplace with capabilities like data metering to track usage." },
]

export default function PartnersSection() {

    return (
        <Section size="md">
            <Container size="lg">

                <div className="text-center mb-8">
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-adxc bg-pink-50 px-3 py-1 rounded-full mb-3">Strategic Partners</span>
                    <SectionHeader
                        title="Building the platform with world-class partners"
                        size="sm"
                        align="center"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PARTNERS.map((partner, i) => (
                        <Card key={i} className="border-border bg-card shadow-sm overflow-hidden">
                            <CardContent className="px-8 flex flex-col items-center text-center gap-3">
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                     className="w-32 h-24 rounded-xl object-contain"
                                />
                                <div className="">
                                    <p className="text-base font-semibold text-foreground">{partner.name}</p>
                                    <p className="text-xs font-medium text-primary">{partner.tagline}</p>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">{partner.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

            </Container>
        </Section>
    )
}
