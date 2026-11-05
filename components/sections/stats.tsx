import { cn } from "@/lib/utils";

export type Stat = {
    lead?: string;
    value: string;
    detail: string;
    note?: string; // small qualifier under the detail
    source?: { label: string; href: string };
};

type Layout = "grid" | "list";

// Renders **text** as bold, keeping stat copy as plain strings
function Emphasis({ text }: { text: string }) {
    const parts = text.split(/\*\*(.+?)\*\*/g);
    return (
        <>
            {parts.map((part, i) =>
                i % 2 ? (
                    <strong key={i} className="font-semibold text-foreground-alt">
                        {part}
                    </strong>
                ) : (
                    part
                )
            )}
        </>
    );
}

function SourceLink({ source, n }: { source: NonNullable<Stat["source"]>; n: number }) {
    return (
        <sup className="ml-0.5">
            <a
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                title={`Source: ${source.label}`}
                aria-label={`Source: ${source.label}`}
                className="-m-2 p-2 text-primary underline-offset-2 hover:underline"
            >
                {n}
            </a>
        </sup>
    );
}

export function StatsGrid({ stats, layout = "grid" }: { stats: Stat[]; layout?: Layout }) {
    let n = 0;

    if (layout === "list") {
        return (
            <dl className="mx-auto grid max-w-3xl grid-cols-[auto_1fr] gap-x-6 sm:gap-x-10">
                {stats.map((stat) => {
                    const ref = stat.source ? ++n : null;
                    return (
                        <div
                            key={stat.value}
                            className="col-span-2 grid grid-cols-subgrid items-center border-b border-primary-muted py-6 last:border-b-0 sm:py-8"
                        >
                            <dt className="text-4xl font-semibold tracking-tight tabular-nums text-primary sm:text-6xl">
                                {stat.value}
                            </dt>
                            <dd>
                                {stat.lead && (
                                    <p className="mb-1 text-sm font-medium text-foreground-alt">{stat.lead}</p>
                                )}
                                <p className="text-base text-muted-foreground sm:text-lg">
                                    <Emphasis text={stat.detail} />
                                    {stat.source && ref && <SourceLink source={stat.source} n={ref} />}
                                </p>
                                {stat.note && (
                                    <p className="mt-1 text-xs text-muted-foreground">{stat.note}</p>
                                )}
                            </dd>
                        </div>
                    );
                })}
            </dl>
        );
    }

    return (
        <div
            className={cn(
                "mx-auto grid divide-y divide-primary-muted md:divide-x md:divide-y-0",
                stats.length >= 3 ? "max-w-6xl md:grid-cols-3" : "max-w-4xl md:grid-cols-2"
            )}
        >
            {stats.map((stat) => {
                const ref = stat.source ? ++n : null;
                return (
                    <div key={stat.value} className="py-10 text-center first:pt-0 last:pb-0 md:px-10 md:py-0">
                        {stat.lead && (
                            <p className="text-lg font-medium text-foreground-alt sm:text-xl">{stat.lead}</p>
                        )}
                        <p className="my-3 text-6xl font-semibold tracking-tight text-primary tabular-nums md:text-7xl">
                            {stat.value}
                        </p>
                        <p className="mx-auto max-w-xs text-sm text-muted-foreground sm:text-base">
                            <Emphasis text={stat.detail} />
                            {stat.source && ref && <SourceLink source={stat.source} n={ref} />}
                        </p>
                        {stat.note && (
                            <p className="mx-auto mt-1 max-w-xs text-xs text-muted-foreground">{stat.note}</p>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

type StatsProps = {
    stats: Stat[];
    title?: string;
    layout?: Layout;
    className?: string;
    children?: React.ReactNode; // optional closing content under the stats
};

// Mid-page band
export function Stats({ stats, title, layout = "grid", className, children }: StatsProps) {
    return (
        <section className={cn("bg-primary-subtle", className)}>
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
                {title && (
                    <h2 className="mx-auto mb-12 max-w-3xl text-balance text-center text-heading">{title}</h2>
                )}
                <StatsGrid stats={stats} layout={layout} />
                {children && <div className="mt-12 sm:mt-16">{children}</div>}
            </div>
        </section>
    );
}