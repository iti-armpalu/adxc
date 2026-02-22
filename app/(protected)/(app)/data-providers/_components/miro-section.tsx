
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";

export function MiroSection() {
    return (
        <Section size="md" className="bg-white">
            <Container size="md">
                <SectionHeader
                    title="Instantly access 100 million users through Miro"
                    description=" At launch, we will be integrated with Miro, giving their 100 million users access to ADXC inside their workflows. We will be on-stage with Miro launching at their Canvas26 event in May."
                    align="center"
                    size="md"
                />

                {/* Two Images Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="overflow-hidden">
                        <img
                            src="/miro-canvas-26.png"
                            alt="Miro Canvas26 conference stage presentation"
                            className="w-full h-64 md:h-80 object-contain"
                        />
                    </div>
                    <div className="overflow-hidden">
                        <img
                            src="/miro-canvas.png"
                            alt="ADXC integrated within Miro collaborative workspace"
                            className="w-full h-64 md:h-80 object-contain"
                        />
                    </div>
                </div>

                {/* Statement */}
                <div className="bg-adxc rounded-xl p-8 md:p-10 text-center">
                    <p className="text-lg md:text-xl font-medium text-white leading-relaxed mx-auto">
                        Data providers that sign up now will get immediate access to these customers via ADXC, and be part of our launch presentation on stage.
                    </p>
                </div>

            </Container>
        </Section>
    );
}
