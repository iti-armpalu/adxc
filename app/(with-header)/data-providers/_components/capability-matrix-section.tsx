import CapabilityMatrix from "@/components/capability-matrix";

const CapabilityMatrixSection = () => {
    return (
        <section className="px-6 py-24">
            <div className="mx-auto">

                {/* Section header */}
                <div className="max-w-5xl mx-auto mb-16 text-center">
                    <h2 className="mb-4 text-3xl md:text-5xl font-black">
                        SMEs need diverse data from a range of providers, making full license prohibitve
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        They can't afford multiple providers, or low utilisation - so pick one or none.
                    </p>
                </div>

                <CapabilityMatrix />
            </div>
        </section>
    );
};

export default CapabilityMatrixSection;
