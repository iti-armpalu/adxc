export function HeroSection() {
    return (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-10 px-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-muted rounded-full text-sm">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-muted-foreground">Infrastructure for the Agentic Era</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance leading-tight">
                A Secure Exchange for Agentic Data Access
            </h1>

            <p className="text-base md:text-lg text-muted-foreground mb-12 text-pretty max-w-3xl mx-auto leading-relaxed">
                ADXC enables AI agents to transact with premium, gated data sources in real time — securely, auditable, and without data replication.
            </p>
        </div>
    )
}
