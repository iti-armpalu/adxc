export function SolutionSection() {
    return (
        <section className="w-full max-w-[1200px] xl:max-w-[400px] mx-auto my-auto px-6 pb-12">

            <div className="flex flex-col md:flex-row  xl:flex-col gap-4">
                <div className="flex-1 bg-card/80 backdrop-blur-xl rounded-xl border border-green-500/20 p-6 shadow-lg">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider">The Solution</h4>
                    </div>

                    <div className="space-y-4">
                        <p className="text-base sm:text-lg text-muted-foreground text-balance leading-relaxed">
                            ADXC is the missing piece. A data exchange for AI agents to instantly query multiple premium data providers to answer a specific question, and only pay for that answer.
                        </p>
                        <p className="text-base sm:text-lg text-muted-foreground text-balance leading-relaxed">
                            Businesses get access to the data they need to make their agents useful. Data providers monetise previously unreachable markets.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
