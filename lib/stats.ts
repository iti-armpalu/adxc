import type { Stat } from "@/components/sections/stats";

export const MARKET_STATS: Stat[] = [
    {
        lead: "Marketing data is expensive",
        value: "$200k+",
        detail: "entry-level price to access GWI, Kantar or Nielsen",
    },
    {
        lead: "…and chronically underutilised",
        value: "60%",
        detail: "of all data within businesses goes unused",
        source: {
            label: "NTT Ltd, 2023",
            href: "https://services.global.ntt/en-us/newsroom/new-ntt-survey-finds-that-unnecessary-data-storage-hinders-sustainability-goals-for-most-businesses",
        },
    },
];

export const SME_STATS: Stat[] = [
    {
        value: ">99%",
        detail: "of businesses are small and medium-sized enterprises",
    },
    {
        value: "~$18B",
        detail: "untapped market",
        note: "Estimated annual SME research and data spend (UK + US)",
    },
];