import { Linkedin } from "lucide-react";
import { Container } from "./layout/container"
import { Section } from "./layout/section"

import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "./sections/section-header";

const ADVISORS = [
    { name: "Rachel Higham", title: "Tech/governance advisor", image: "/rachel.jpeg", linkedin: "https://www.linkedin.com/in/rachel-higham-a033991/", bio: "Advises on architecture strategy, data governance, and institutional-grade board practices." },
    { name: "Shahid Sadiq", title: "Commercial advisor", image: "/shahid.jpeg", linkedin: "https://www.linkedin.com/in/shahid-sadiq-537399162/", bio: "Supports on business model, pricing strategy, unit economics, and enterprise packaging." },
]

export default function AdvisorsSection() {

    return (
        <Section size="md">
            <Container size="lg">

                <div className="text-center mb-8">
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-adxc bg-pink-50 px-3 py-1 rounded-full mb-3">Advisory Board</span>
                    <SectionHeader
                        title="We are advised by the best in the world"
                        size="sm"
                        align="center"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ADVISORS.map((advisor, i) => (
                        <Card key={i} className="border-border bg-card shadow-sm overflow-hidden">
                            <CardContent className="px-8 flex flex-col items-center text-center gap-3">
                                <img
                                    src={advisor.image}
                                    alt={advisor.name}
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                                <div className="">
                                    <p className="text-base font-semibold text-foreground">{advisor.name}</p>
                                    <p className="text-sm text-muted-foreground">{advisor.title}</p>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">{advisor.bio}</p>
                                <a
                                    href={advisor.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                    LinkedIn
                                </a>
                            </CardContent>
                        </Card>
                    ))}
                </div>

            </Container>
        </Section>
    )
}
