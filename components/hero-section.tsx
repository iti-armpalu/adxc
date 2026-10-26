import { Container } from "./layout/container";
import { Section } from "./layout/section";
import { SectionHeader } from "./sections/section-header";

export function HeroSection() {
    return (
        <Section size="lg" className="min-h-dvh flex items-center">
            <Container size="lg">
                <div className="text-center">
                    {/* Brand mark — not an h1, SectionHeader below owns the page's h1 */}
                    <img
                        src="/adxc-logo-with-tagline.svg"
                        alt="ADXC"
                        className="mx-auto w-auto h-14 sm:h-20 md:h-24 mb-8"
                    />

                    <SectionHeader
                        as="h1"
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