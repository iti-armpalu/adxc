import { Check } from "lucide-react";

const ROWS = [
    { competitor: "Large data providers", advantage: "We only charge for the data that is actually used" },
    { competitor: "Small data providers", advantage: "We consolidate data to answer questions" },
    { competitor: "Standard LLMs", advantage: "We connect LLMs to paywalled data" },
    { competitor: "Internal data sets", advantage: "We complement them with paid data" },
];

export function CompetitiveAdvantage() {
    return (
        <section className="bg-brand-50">
            <div className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 sm:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-caption mb-3 text-muted-foreground">Competitive advantage</p>
                    <h2 className="text-balance text-primary">
                        There are no pay-as-you-go providers in the market
                    </h2>
                    <p className="mt-4 text-pretty text-lg text-foreground-alt">
                        because the technology that enables this approach is only 6 months old, and we are
                        patenting the tech that makes it useful
                    </p>
                </div>

                <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border bg-card shadow-sm">
                    <div className="hidden grid-cols-[1fr_1.5fr] gap-6 border-b bg-muted px-6 py-3 md:grid">
                        <span className="text-caption text-muted-foreground">Competitors</span>
                        <span className="text-caption text-muted-foreground">How our solution is better</span>
                    </div>

                    <dl className="divide-y">
                        {ROWS.map((row) => (
                            <div
                                key={row.competitor}
                                className="grid gap-1 px-6 py-4 md:grid-cols-[1fr_1.5fr] md:items-center md:gap-6"
                            >
                                <dt className="text-sm text-muted-foreground">
                                    <span className="md:hidden">vs. </span>
                                    {row.competitor}
                                </dt>
                                <dd className="flex items-start gap-2 font-medium text-foreground">
                                    <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
                                    {row.advantage}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}