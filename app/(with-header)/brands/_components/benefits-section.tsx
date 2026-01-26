import { Layers, Sparkles, TrendingDown } from "lucide-react";

const features = [
    {
        icon: Sparkles,
        title: "Higher-Quality AI Outputs",
        description:
            "AI agents generate materially better results when powered by trusted, premium data sources.",
    },
    {
        icon: Layers,
        title: "Multi-Source Data Access",
        description:
            "AI agents can access and combine insights from multiple premium data providers in a single workflow.",
    },
    {
        icon: TrendingDown,
        title: "Improved Unit Economics",
        description:
            "Lower cost per insight with higher utilisation of the same data across use cases.",
    },
]

export function BenefitsSection() {
    return (
        <section className="w-full py-20 px-4 md:px-8 lg:px-16 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <div className="max-w-5xl mx-auto mb-16 text-center">
                    <h2 className="mb-4 text-3xl md:text-5xl font-black">
                        Start paying for answers, not access
                    </h2>
                </div>


                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 hover:border-adxc hover:shadow-lg transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center mb-5">
                                <feature.icon className="w-6 h-6 text-adxc" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-slate-500 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-slate-500 mt-12 max-w-2xl mx-auto leading-relaxed">
                    Quality, coverage, and economics improve simultaneously.
                </p>
            </div>
        </section>
    );
};