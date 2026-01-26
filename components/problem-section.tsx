export function ProblemSection() {
    return (
        <section className="w-full max-w-3xl mx-auto my-auto px-6 pb-16">

            <div className="flex flex-col md:flex-row  xl:flex-col gap-4">

                <div className="flex-1 bg-card/80 backdrop-blur-xl rounded-xl border border-red-500/20 p-6 shadow-lg">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider">The Problem</h4>
                    </div>
                    <p className="text-base sm:text-lg text-muted-foreground text-balance leading-relaxed">
                        AI agents are everywhere, but most lack the data they need to produce reliable, decision-grade outputs. Premium data that could help is still sold via expensive annual licenses built for human analysis, so out of reach for most businesses.
                    </p>
                </div>
            </div>
        </section>
    )
}
