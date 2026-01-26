import { Ban, PoundSterling } from "lucide-react"

export function DataAccessSection() {
    return (
        <section className="w-full py-20 px-4 md:px-8 lg:px-16 bg-white">
            <div className="max-w-5xl mx-auto">
                {/* Section Title */}
                <div className="max-w-5xl mx-auto mb-16 text-center">
                    <h2 className="mb-4 text-3xl md:text-5xl font-black">
                        The issue is agents don’t have the necessary data. For
                        most marketers, it’s out of reach
                    </h2>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {/* Card 1 - #2 Constraint */}
                    <div className="bg-card rounded-xl border border-slate-200 p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                                <Ban className="w-5 h-5 text-amber-600" />
                            </div>
                            <span className="text-sm font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                                #2 Constraint
                            </span>
                        </div>
                        <p className="leading-relaxed">
                            Lack of access to relevant data is the second-largest barrier to AI tool adoption among marketers
                            <sup className="text-slate-400">2</sup>
                        </p>
                    </div>

                    {/* Card 2 - £400k+ */}
                    <div className="bg-card rounded-xl border border-slate-200 p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
                                <PoundSterling className="w-5 h-5 text-adxc" />
                            </div>
                        </div>
                        <p className="text-4xl md:text-5xl font-bold text-adxc mb-3">
                            £400k+
                        </p>
                        <p className="text-sm leading-relaxed">
                            Typical entry-level cost to access premium data providers (e.g. GWI, Kantar, Nielsen)
                        </p>
                    </div>
                </div>

                {/* Key Statement */}
                <div className="bg-adxc rounded-xl p-8 text-center mb-8">
                    <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
                        Data required to power AI agents is priced and packaged for enterprises, not SMEs.
                    </p>
                </div>

                {/* Footnotes */}
                <div className="text-xs text-slate-400 space-y-1">
                    <p>¹ Jasper AI Marketing Report 2025</p>
                    <p>² Salesforce State of Marketing Report 2025</p>
                </div>
            </div>
        </section>
    )
}
