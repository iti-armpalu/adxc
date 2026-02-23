import { Linkedin } from "lucide-react";
import { Container } from "./layout/container"
import { Section } from "./layout/section"

import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "./sections/section-header";

const teamMembers = [
    { name: "Roy Armale", title: "Founder, Partnerships", image: "/roy.jpeg", linkedin: "https://www.linkedin.com/in/royarmale/" },
    { name: "Josh Hedley-Dent", title: "Co-founder, Head of Revenue", image: "/josh.jpeg", linkedin: "https://www.linkedin.com/in/joshuahedleydent/" },
    { name: "George Chatzigiannis", title: "Co-founder, Head of Product", image: "/george.jpeg", linkedin: "https://www.linkedin.com/in/georgechatzigiannis/" },
    { name: "Joseph Mattouk", title: "Data Engineer", image: "/joseph.jpeg", linkedin: "https://www.linkedin.com/in/joseph-mattouk-20b880222/" },
    { name: "Iti Armpalu", title: "Front-end Developer", image: "/iti.jpeg", linkedin: "https://www.linkedin.com/in/itiarmpalu/" },
]

export default function TeamSection() {

    return (
        <Section size="md">
            <Container size="lg">

                <div className="text-center mb-8">
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-adxc bg-pink-50 px-3 py-1 rounded-full mb-3">Team and key roles</span>
                    <SectionHeader
                        title="Our founder built the AI platform for the largest ad agency in the world, each of our co-founders have 15 years of experience in the field"
                        size="sm"
                        align="center"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                    {teamMembers.map((member, i) => (
                        <Card key={i} className="border-border bg-card shadow-sm overflow-hidden">
                            <CardContent className="flex flex-col items-center justify-between text-center gap-3">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                                <div className="min-h-1/3">
                                    <p className="text-base font-semibold text-foreground">{member.name}</p>
                                    <p className="text-sm text-muted-foreground">{member.title}</p>
                                </div>
                                <a
                                    href={member.linkedin}
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
