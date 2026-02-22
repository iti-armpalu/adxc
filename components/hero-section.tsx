import { Container } from "./layout/container";
import { Section } from "./layout/section";
import { SectionHeader } from "./sections/section-header";

export function HeroSection() {
    return (
        <Section size="lg" className="min-h-dvh flex items-center">
            <Container size="md">
                <div className="text-center">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-relaxed text-foreground mb-8">
                        ADXC
                    </h1>

                    <SectionHeader
                        title="The Agentic Data Exchange that only charges marketing companies for data they use"
                        size="lg"
                        align="center"
                    />
                </div>
            </Container>
        </Section>
    )
}

