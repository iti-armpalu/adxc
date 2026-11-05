import { DataFlowDiagram } from "@/components/data-flow/data-flow-diagram";

export function AdxcApproach() {
    return (
        <section className="bg-card">
            <div className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 sm:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-balance text-heading">
                        ADXC uses agentic access technology to give SMEs access to all the marketing data they
                        need
                    </h2>
                    <p className="mt-4 text-pretty text-xl font-medium text-foreground sm:text-2xl">
                        while only paying for what they use
                    </p>
                </div>

                <DataFlowDiagram />
            </div>
        </section>
    );
}