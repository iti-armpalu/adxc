// Diagonal grid + brand glow. Parent needs `relative isolate overflow-hidden`.
export function GridGlow() {
    return (
        <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
                maskImage: "linear-gradient(135deg, transparent 35%, black 65%)",
                WebkitMaskImage: "linear-gradient(135deg, transparent 35%, black 65%)",
            }}
        >
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="absolute -right-1/4 -top-1/4 size-[800px] rounded-full bg-[radial-gradient(circle,var(--color-brand-200)_0%,transparent_70%)] opacity-40" />
        </div>
    );
}