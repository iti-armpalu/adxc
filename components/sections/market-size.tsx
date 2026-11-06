const HIGHLIGHT = "font-semibold text-brand-500";

export function MarketSize() {
    return (
        <section className="bg-card">
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-[minmax(0,1fr)_22rem] lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-20">
                <div className="text-center md:text-left">
                    <h2 className="text-balance text-heading">There is an $11Bn untapped data market</h2>
                    <p className="mx-auto mt-6 max-w-md border-l-4 border-primary pl-6 text-left text-2xl font-medium leading-snug text-foreground-alt sm:text-3xl md:mx-0">
                        <span className={HIGHLIGHT}>SMEs</span> that need{" "}
                        <span className={HIGHLIGHT}>reliable data</span> to make{" "}
                        <span className={HIGHLIGHT}>AI useful</span> for marketing
                    </p>
                </div>

                {/* Nested TAM / SAM / SOM circles + footnote */}
                <div className="mx-auto w-full max-w-sm md:max-w-none">
                    <div className="@container relative aspect-square w-full">
                        <div className="absolute inset-0 flex flex-col items-center rounded-full bg-primary pt-[7%] text-center text-primary-foreground">
                            <p className="text-[11cqi] font-bold leading-none tracking-tight">$11Bn</p>
                            <p className="mt-[1.5cqi] text-[3.6cqi] text-primary-muted">
                                TAM: Research-paying SMEs<sup>*</sup>
                            </p>
                        </div>

                        <div className="absolute bottom-[2%] left-[16%] flex aspect-square w-[68%] flex-col items-center rounded-full bg-[color-mix(in_oklch,var(--primary)_40%,white)] pt-[6%] text-center">
                            <p className="text-[8cqi] font-bold leading-none tracking-tight text-heading">$1.7Bn</p>
                            <p className="mt-[1.2cqi] text-[3.2cqi] text-foreground">SAM: Relevant B2Cs + agencies</p>
                        </div>

                        <div className="absolute bottom-[3%] left-[30%] flex aspect-square w-[40%] flex-col items-center justify-center rounded-full bg-primary-subtle text-center shadow-md">
                            <p className="text-[7cqi] font-bold leading-none tracking-tight text-primary">$8M</p>
                            <p className="mt-[1.2cqi] text-[3cqi] text-foreground-alt">SOM: Y3 projection</p>
                        </div>
                    </div>

                    <p className="mt-4 text-center text-xs italic text-muted-foreground">
                        *Across UK/US/EU/Developed APAC. TAM/SAM/SOM calculations available on request.
                    </p>
                </div>
            </div>
        </section>
    );
}