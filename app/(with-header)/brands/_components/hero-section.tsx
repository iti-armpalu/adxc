const HeroSection = () => {
    return (
        <section className="relative min-h-dvh pt-20 pb-24 px-6 overflow-hidden">

            <div className="relative max-w-5xl mx-auto text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 border border-stone-200 rounded-full mb-8">
                    <div className="w-2 h-2 bg-stone-600 rounded-full" />
                    <span className="text-stone-600 text-sm font-medium">Pay for answers, not access</span>
                </div>

                {/* Heading */}
                <h1 className="text-4xl md:text-[60px] font-extrabold leading-tight tracking-tight mb-8">
                    Cut your data budget in half and get the data that finally makes your agents useful
                </h1>

                {/* Subtitle */}
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl mb-8">
                    Unlock the power of premium data without the premium price tag. Stop buying bulk access to datasets you'll never read.
                </p>

                {/* CTA Button */}
                <button
                    // onClick={scrollToCalculator}
                    className="bg-adxc text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-[#7a0348] transition-colors"
                >
                    Calculate your savings
                </button>
            </div>
        </section>
    );
};

export default HeroSection;
