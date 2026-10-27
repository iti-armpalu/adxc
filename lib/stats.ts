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

export const AI_ADOPTION_STATS: Stat[] = [
    {
        value: "#1",
        detail: "Output quality is the no. 1 barrier to AI adoption in marketing",
        source: {
            label: "Jasper AI Marketing Report 2025",
            href: "https://www.jasper.ai/blog/2025-ai-marketing-trends-insights-report",
        },
    },
    {
        value: "#2",
        detail: "Lack of necessary data is the no. 2 concern using AI tools for marketers",
        source: {
            label: "Salesforce State of Marketing Report 2025",
            href: "https://www.salesforce.com/content/dam/web/en_us/www/documents/marketingcloud/S-MC-State-of-Marketing-Report-9th-Edition.pdf",
        },
    },
];

export const AI_PLATFORM_STATS: Stat[] = [
    {
        value: "#1",
        detail: "Output quality is the primary barrier to AI adoption in marketing",
        source: {
            label: "Jasper AI Marketing Report 2025",
            href: "https://www.jasper.ai/blog/2025-ai-marketing-trends-insights-report",
        },
    },
    {
        value: "5%",
        detail: "of businesses have integrated AI into core workflows",
        source: {
            label: "MIT Nanda AI Report 2025",
            href: "https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf",
        },
    },
];

export const DATA_ACCESS_STATS: Stat[] = [
    {
        value: "#2",
        detail:
            "Lack of access to relevant data is the second-largest barrier to AI tool adoption among marketers",
        source: {
            label: "Salesforce State of Marketing Report 2025",
            href: "https://www.salesforce.com/content/dam/web/en_us/www/documents/marketingcloud/S-MC-State-of-Marketing-Report-9th-Edition.pdf",
        },
    },
    {
        value: "$200k+",
        detail: "Typical entry-level cost to access premium data providers (e.g. GWI, Kantar, Nielsen)",
    },
];