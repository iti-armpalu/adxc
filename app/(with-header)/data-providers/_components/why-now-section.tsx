import { StatCard } from "./stat-card";


export function WhyNowSection() {
    return (
        <section className="w-full py-20 px-4 md:px-8 lg:px-16">
            <div className="max-w-5xl mx-auto">
                {/* Section Title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 text-center mb-16 text-balance">
                    Why This Matters Now
                </h2>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {/* Metric 1 */}
                    <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                        <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-adxc mb-4">
                            80%
                        </p>
                        <p className="text-slate-600 text-lg">
                            of businesses already use AI<sup>1</sup>
                        </p>
                    </div>

                    {/* Metric 2 */}
                    <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                        <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-adxc mb-4">
                            88%
                        </p>
                        <p className="text-slate-600 text-lg">
                            plan to increase AI budgets over the next 12 months<sup>2</sup>
                        </p>
                    </div>
                </div>

                {/* Bottom Statement */}
                <div className="bg-adxc rounded-xl p-8 md:p-10 text-center">
                    <p className="text-white text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                        AI adoption is accelerating, but SMEs lack the data required to power agent-based workflows.
                        <span className="block mt-2 font-semibold">
                            Established data providers already have it.
                        </span>
                    </p>
                </div>

                {/* Footnotes */}
                <div className="mt-8 text-center space-y-1">
                    <p className="text-xs text-slate-400">
                        <sup>1</sup> MIT Nanda AI Report 2025
                    </p>
                    <p className="text-xs text-slate-400">
                        <sup>2</sup> PwC AI Agent Report 2025
                    </p>
                </div>
            </div>
        </section>
    );
}
