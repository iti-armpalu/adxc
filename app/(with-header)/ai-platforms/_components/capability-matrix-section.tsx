import CapabilityMatrix from "@/components/capability-matrix";

const CapabilityMatrixSection = () => {
    return (
        <section className="px-6 py-24">
            <div className="mx-auto">

                {/* Section header */}
                <div className="max-w-5xl mx-auto mb-16 text-center">
                    <h2 className="mb-4 text-3xl md:text-5xl font-black">
                        Marketers need diverse data from a range of providers
                        for Agents to be useful end-to-end
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Most can’t afford multiple subscriptions, and most data sources aren’t
                        Agent-accessible
                    </p>
                </div>

                <CapabilityMatrix />
            </div>
        </section>
    );
};

export default CapabilityMatrixSection;
