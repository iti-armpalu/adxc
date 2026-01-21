export function HeroSection() {
    return (
        <section className="relative flex flex-col items-center justify-center py-16">
            <div className="max-w-2xl text-center">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-foreground mb-8">
                    ADXC
                </h1>

                <p className="text-xl sm:text-2xl text-foreground/80 leading-relaxed mb-4">
                    The data exchange connecting AI agents to premium data providers, on a pay-per-query basis
                </p>

                <p className="text-lg text-muted-foreground">
                    Making access affordable and agents finally useful.
                </p>
            </div>
        </section>
    )
}
