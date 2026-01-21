import DemoButtons from "./demo-buttons";

export function DemoSection() {
    return (
        <section className="py-20">
            <div className="max-w-2xl mx-auto text-center px-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance leading-tight mb-4">
                    See It in Action
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground text-balance leading-relaxed mb-8">
                    Watch how our AI agents seamlessly orchestrate your marketing tasks, or dive right in and experience the power of automated workflows yourself.
                </p>
                <DemoButtons />
            </div>
        </section>
    )
}



