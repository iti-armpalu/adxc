import { ArrowDown, ArrowRight, Check, X } from "lucide-react";

const OLD_WORLD = [
    "Buying data is like buying a whole album to listen to 1 song.",
    "Expensive. Inefficient. Prohibitive.",
    "Designed for humans, who need to see whole datasets to work with them.",
];

export function Problem() {
    return (
        <section className="bg-primary bg-[radial-gradient(ellipse_at_top_left,oklch(from_var(--primary)_calc(l+0.08)_c_h),transparent_60%),linear-gradient(135deg,var(--primary),oklch(from_var(--primary)_calc(l-0.1)_c_h))]">
            <div className="mx-auto max-w-7xl space-y-10 px-4 py-16 sm:space-y-12 sm:px-6 sm:py-24">
                <h2 className="mx-auto max-w-3xl text-balance text-center text-primary-foreground">
                    The problem is data is sold like albums. But AI changes that
                </h2>

                <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:gap-6">
                    {/* Old world */}
                    <div className="flex-1 rounded-xl border bg-card p-6 sm:p-10">
                        <h3 className="mb-6 text-destructive-text">Old world</h3>
                        <ul className="space-y-5">
                            {OLD_WORLD.map((item) => (
                                <li key={item} className="flex gap-3">
                                    <X className="mt-1 size-4 shrink-0 text-destructive" aria-hidden />
                                    <p className="text-foreground-alt">{item}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div aria-hidden className="flex items-center justify-center text-primary-foreground">
                        <ArrowDown className="size-6 lg:hidden" />
                        <ArrowRight className="hidden size-8 lg:block" />
                    </div>

                    {/* AI world */}
                    <div className="flex flex-1 flex-col rounded-xl border border-primary-muted bg-primary-subtle p-6 shadow-sm sm:p-10">
                        <h3 className="mb-6 text-primary">AI world</h3>
                        <div className="flex gap-3">
                            <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
                            <p className="font-medium text-foreground">
                                AI agents can retrieve only the data needed to answer a question, without the user
                                seeing the full dataset.
                            </p>
                        </div>
                        <p className="mt-6 pt-6 text-lg font-semibold text-primary sm:text-xl lg:mt-auto">
                            This means you should only pay for the data you use.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}