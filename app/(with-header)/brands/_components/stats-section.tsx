const StatsSection = () => {
    return (
        <section className="px-6 pb-20">
            <div className="max-w-3xl mx-auto">
                {/* Section header */}
                <div className="max-w-5xl mx-auto mb-16 text-center">
                    <h2 className="mb-4 text-3xl md:text-5xl font-black">
                        Data is expensive, and chronically underutilised
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row gap-12 justify-center">
                    <div className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl p-10 text-center">
                        <div className="text-[60px] font-bold text-[#66023c] leading-none mb-4">$150k+</div>
                        <div className="text-lg font-semibold text-gray-900 mb-2">Entry level price to access</div>
                        <div className="text-sm text-gray-500">GWI + Kantar + Nielsen</div>
                    </div>

                    <div className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl p-10 text-center">
                        <div className="text-[60px] font-bold text-[#66023c] leading-none mb-4">73%</div>
                        <div className="text-lg font-semibold text-gray-900 mb-2">All data within businesses goes unused</div>
                        <a href="#" className="text-sm text-pink-600 underline decoration-pink-300">(Forrester)</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
