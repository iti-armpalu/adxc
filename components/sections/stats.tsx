import { cn } from "@/lib/utils";

export type Stat = {
    lead?: string;
    value: string;
    detail: string;
    note?: string; // small qualifier under the detail
    source?: { label: string; href: string };
};

export function StatsGrid({ stats }: { stats: Stat[] }) {
    let n = 0;

    return (
        <div
            className={cn(
                "mx-auto grid divide-y divide-brand-200 md:divide-x md:divide-y-0",
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
                            {stat.detail}
                            {stat.source && (
                                <sup className="ml-0.5">
                                    <a
                                        href={stat.source.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={`Source: ${stat.source.label}`}
                                        aria-label={`Source: ${stat.source.label}`}
                                        className="-m-2 p-2 text-primary underline-offset-2 hover:underline"
                                    >
                                        {ref}
                                    </a>
                                </sup>
                            )}
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
    className?: string;
};

// Mid-page band
export function Stats({ stats, title, className }: StatsProps) {
    return (
        <section className={cn("bg-brand-50", className)}>
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
                {title && <h2 className="mb-12 text-center text-primary">{title}</h2>}
                <StatsGrid stats={stats} />
            </div>
        </section>
    );
}