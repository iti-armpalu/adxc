
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import DataProvidersGraph from "./data-providers-graph";
import { CornerDownRight } from "lucide-react";

export function DataNeedSection() {
    return (
        <Section size="md" className="relative">
            <Container size="md">
                <SectionHeader
                    title="SMEs need diverse data from a range of providers, making full licenses prohibitive "
                    description="They can't afford multiple providers, or low utilisation - so pick one or none"
                    align="center"
                    size="md"
                />

                <DataProvidersGraph />

                <div className="absolute left-4 top-1/2 -translate-y-1/2 max-w-[200px] hidden xl:block">
                    <div className="flex flex-col">
                        <div className="bg-card/80 backdrop-blur-xl border border-adxc rounded-xl px-4 py-3 shadow-md">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                <span className="uppercase text-adxc font-semibold">Click a subtask</span>{" "}
                                to highlight the data providers it uses
                            </p>
                        </div>

                        <CornerDownRight
                            className="mt-3 self-end text-adxc h-6 w-6"
                            aria-hidden="true"
                        />
                    </div>
                </div>


            </Container>
        </Section>
    );
}
