import DemoButtons from "./demo-buttons";

export function DemoSection() {
    return (
        <section className="relative px-6 py-24">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance leading-tight mb-4">
                    See ADXC in Action
                </h2>
                <DemoButtons />
            </div>
        </section>
    )
}



