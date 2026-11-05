import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Mark = "yes" | "no" | "partial";
type Tone = "brand" | Mark;

const COLUMNS = {
    subscription: "Research subscription",
    llm: "Generic LLM answers",
} as const;

const ROWS: { criterion: string; subscription: Mark; llm: Mark; adxc: string }[] = [
    {
        criterion: "Rigour",
        subscription: "yes",
        llm: "no",
        adxc: "Searches across multiple trusted research providers like YouGov, Quid, Serpstat",
    },
    {
        criterion: "Efficiency",
        subscription: "no",
        llm: "no",
        adxc: "Finds and charges for only the data you need",
    },
    {
        criterion: "Affordability",
        subscription: "no",
        llm: "yes",
        adxc: "Pay-as-you-go, top up from $20",
    },
    {
        criterion: "AI-native",
        subscription: "partial",
        llm: "yes",
        adxc: "Delivers the data to your AI tool via MCP",
    },
];

const MARK_LABEL: Record<Mark, string> = { yes: "Yes", no: "No", partial: "Partly" };

export function CompetitiveAdvantage({ className }: { className?: string }) {
    return (
        <section className={cn(className)}>
            <div className="mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 sm:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-caption mb-3 text-muted-foreground">Competitive advantage</p>
                    <h2 className="text-balance text-heading">
                        ADXC is first to market, and currently competes with two extremes
                    </h2>
                    <p className="mt-4 text-pretty text-lg text-foreground-alt">
                        There are no pay-as-you-go providers in the market because the technology that enables
                        this approach is very new, and we are patenting the tech that makes it useful
                    </p>
                </div>

                <div
                    role="table"
                    aria-label="How ADXC compares with research subscriptions and generic LLM answers"
                    className="mx-auto max-w-5xl md:grid md:grid-cols-[minmax(0,1fr)_10rem_10rem_minmax(0,1.6fr)]"
                >
                    {/* Column headers (desktop) */}
                    <div role="row" className="hidden md:col-span-4 md:grid md:grid-cols-subgrid">
                        {/* Empty cell keeps its grid slot; only the text is hidden */}
                        <span role="columnheader">
                            <span className="sr-only">Criterion</span>
                        </span>
                        <span
                            role="columnheader"
                            className="self-end px-2 pb-5 text-center font-semibold text-foreground-alt"
                        >
                            {COLUMNS.subscription}
                        </span>
                        <span
                            role="columnheader"
                            className="self-end px-2 pb-5 text-center font-semibold text-foreground-alt"
                        >
                            {COLUMNS.llm}
                        </span>
                        <span
                            role="columnheader"
                            className="rounded-t-xl border-x border-t border-primary bg-primary-subtle px-6 py-5 text-center text-xl font-bold text-primary"
                        >
                            ADXC
                        </span>
                    </div>

                    {ROWS.map((row, i) => {
                        const last = i === ROWS.length - 1;
                        return (
                            <div
                                role="row"
                                key={row.criterion}
                                className="grid grid-cols-2 gap-4 border-t py-6 md:col-span-4 md:grid-cols-subgrid md:gap-0 md:py-0"
                            >
                                <span
                                    role="rowheader"
                                    className="col-span-2 text-lg font-semibold text-foreground md:col-span-1 md:flex md:items-center md:py-6 md:text-xl"
                                >
                                    {row.criterion}
                                </span>

                                <MarkCell label={COLUMNS.subscription} mark={row.subscription} />
                                <MarkCell label={COLUMNS.llm} mark={row.llm} />

                                <span
                                    role="cell"
                                    className={cn(
                                        "col-span-2 flex items-center gap-4 rounded-xl border border-primary bg-primary-subtle p-4",
                                        "md:col-span-1 md:rounded-none md:border-y-0 md:px-6 md:py-6",
                                        last && "md:rounded-b-xl md:border-b"
                                    )}
                                >
                                    <MarkIcon tone="brand" label="Yes" />
                                    <span className="text-foreground">
                                        <span className="font-semibold text-primary md:sr-only">ADXC: </span>
                                        {row.adxc}
                                    </span>
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function MarkCell({ label, mark }: { label: string; mark: Mark }) {
    return (
        <span role="cell" className="flex items-center gap-3 md:justify-center md:py-6">
            <MarkIcon tone={mark} label={MARK_LABEL[mark]} />
            {/* Column name next to the mark on mobile; hidden on desktop where headers exist */}
            <span className="text-sm text-muted-foreground md:sr-only">{label}</span>
        </span>
    );
}

// Dual-tone mark: light ring, darker check/cross, no fill
function MarkIcon({ tone, label }: { tone: Tone; label: string }) {
    return (
        <span
            className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full border-[1.5px]",
                tone === "brand" && "border-primary-muted text-primary",
                tone === "yes" && "border-border-4 text-foreground",
                tone === "partial" && "border-border-3 text-border-4",
                tone === "no" && "border-border-2 text-muted-foreground"
            )}
        >
            {tone === "no" ? (
                <X className="size-3.5" strokeWidth={2.5} aria-hidden />
            ) : (
                <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
            )}
            <span className="sr-only">{label}</span>
        </span>
    );
}