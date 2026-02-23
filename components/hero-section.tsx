import { Container } from "./layout/container";
import { Section } from "./layout/section";
import { SectionHeader } from "./sections/section-header";

export function HeroSection() {
    return (
        <Section size="lg" className="min-h-dvh flex items-center">
            <Container size="lg">
                <div className="text-center">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-relaxed text-foreground mb-8">
                        ADXC
                    </h1>

                    <SectionHeader
                        title="The Agentic Data Exchange that gives companies access to all the marketing data they need, and only charges for what they use"
                        description="The $18B data opportunity unlocked by agents to transform an industry with outdated monetization and pricing"
                        size="lg"
                        align="center"
                    />
                </div>
            </Container>
        </Section>
    )
}

