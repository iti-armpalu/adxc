import { AlertTriangle, TrendingUp } from "lucide-react";

const HeroSection = () => {
    return (
        <section className="w-full py-20 px-4 md:px-8 lg:px-16 bg-white">
            <div className="max-w-5xl mx-auto">

                {/* Heading */}
                <h1 className="text-4xl md:text-[60px] max-w-5xl text-center mx-auto font-extrabold leading-tight tracking-tight mb-8">
                    AI agents are still disappointing customers with output
                    quality, and it’s limiting use
                </h1>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {/* Metric 1 - #1 Barrier */}
                    <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-100 mb-6">
                            <AlertTriangle className="w-7 h-7 text-amber-600" />
                        </div>
                        <div className="text-5xl md:text-6xl font-bold text-amber-600 mb-4">
                            #1
                        </div>
                        <p className="text-lg font-medium mb-2">Output quality is the primary barrier to AI adoption in marketing<sup>1</sup></p>
                    </div>

                    {/* Metric 2 - 5% */}
                    <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-pink-100 mb-6">
                            <TrendingUp className="w-7 h-7 text-adxc" />
                        </div>
                        <div className="text-5xl md:text-6xl text-adxc font-bold mb-4">
                            5%
                        </div>
                        <p className="text-lg font-medium mb-2">of businesses have integrated AI into core workflows<sup>2</sup></p>

                    </div>
                </div>

                {/* Key Statement */}
                <div className="bg-adxc rounded-xl p-8 md:p-10 text-center mb-8">
                    <p className="text-lg md:text-xl lg:text-2xl font-semibold text-white leading-relaxed text-balance">
                        Without access to trusted, premium data, AI agents fail to deliver production-grade outputs.
                    </p>
                </div>

                {/* Footnotes */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-xs text-slate-400">
                    <span><sup>1</sup> Jasper AI Marketing Report 2025</span>
                    <span><sup>2</sup> MIT Nanda AI Report 2025</span>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
