import { StatCard } from "@/components/cards/stat-card";

export default function BrandStatsSection() {
    return (
        <div>
            <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                <StatCard
                    title="Marketing data is expensive"
                    value="$200k+"
                    description={
                        <>
                            entry level price to access ( GWI / Kantar / Nielsen)
                        </>
                    }
                />
                <StatCard
                    title="and chronically underutilised"
                    value="60%"
                    description={
                        <>
                            all data within businesses goes unused
                            <sup className="ml-0.5 text-[0.65em] align-super">1</sup>
                        </>
                    }
                />
            </div>
            <div className="flex flex-col items-center justify-center gap-4 text-xs text-muted-foreground sm:flex-row sm:gap-8">
                <a
                    href="https://services.global.ntt/en-us/newsroom/new-ntt-survey-finds-that-unnecessary-data-storage-hinders-sustainability-goals-for-most-businesses"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline underline-offset-4"
                >
                    <span>
                        <sup>1</sup> NTT Ltd 2023
                    </span>
                </a>
            </div>
        </div>
    );
}
