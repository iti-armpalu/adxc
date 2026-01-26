export function SolutionSection() {
    return (
        <section className="w-full py-20 px-4 md:px-8 lg:px-16 bg-white">
            <div className="max-w-5xl mx-auto">
                {/* Section Title */}
                <div className="max-w-5xl mx-auto mb-16 text-center">
                    <h2 className="mb-4 text-3xl md:text-5xl font-black">
                        You are already solving the internal data part of the problem.{" "}
                        We can help you solve the other half.
                    </h2>
                </div>

                {/* Placeholder Image */}
                <div className="w-full aspect-video bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-slate-200 flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-slate-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <p className="text-slate-400 text-sm font-medium">Image placeholder</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
