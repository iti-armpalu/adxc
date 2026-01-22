const HeroSection = () => {
    return (
        <section className="relative py-16">

            <div className="relative z-10 flex flex-col items-center justify-center text-center">

                {/* Main heading */}
                <h1 className="mb-6 max-w-4xl animate-fade-up text-5xl font-black leading-[1.1] tracking-tight md:text-7xl" style={{ animationDelay: '0.1s' }}>
                    We can cut your data budget in half and give you the data that finally make your agents useful
                </h1>

                {/* Subheading */}
                {/* <p className="mb-10 max-w-2xl animate-fade-up text-lg text-muted-foreground md:text-xl" style={{ animationDelay: '0.2s' }}>
                    Traditional data subscriptions cost six figures and go 90% unused.
                    ADXC gives your AI agents access to enterprise-grade data sources—and
                    you only pay for the insights actually delivered.
                </p> */}

            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </section>
    );
};

export default HeroSection;
