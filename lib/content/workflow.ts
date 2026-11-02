// Source: growth team's provider/task mapping sheet. Update here only.

export const PROVIDERS = [
    { name: "GWI", annualPrice: 75_000 },
    { name: "Nielsen", annualPrice: 200_000 },
    { name: "Brandwatch", annualPrice: 75_000 },
    { name: "Comscore", annualPrice: 100_000 },
    { name: "Circana", annualPrice: 100_000 },
] as const;

export const AGENTS = ["Miro", "Jasper", "Salesforce", "Your agent"] as const;

export type ProviderName = (typeof PROVIDERS)[number]["name"];
export type AgentName = (typeof AGENTS)[number];
export type Task = { label: string; agent: AgentName; providers: ProviderName[] };
export type Stage = { name: string; tasks: Task[] };

export const STAGES: Stage[] = [
    {
        name: "Strategy / Brief",
        tasks: [
            { label: "Market understanding", agent: "Miro", providers: ["GWI", "Circana"] },
            { label: "Audience sizing", agent: "Miro", providers: ["GWI", "Nielsen", "Comscore"] },
            { label: "Category context", agent: "Miro", providers: ["Brandwatch", "Circana"] },
        ],
    },
    {
        name: "Creative Development",
        tasks: [
            { label: "Tensions", agent: "Jasper", providers: ["GWI", "Brandwatch"] },
            { label: "Cultural context", agent: "Jasper", providers: ["GWI", "Brandwatch"] },
            { label: "Inspiration", agent: "Jasper", providers: ["Brandwatch"] },
        ],
    },
    {
        name: "Media Strategy / Planning",
        tasks: [
            { label: "Reach, frequency", agent: "Miro", providers: ["Nielsen", "Comscore"] },
            { label: "Channel effectiveness", agent: "Miro", providers: ["GWI", "Nielsen", "Comscore"] },
            { label: "Planning", agent: "Miro", providers: ["GWI", "Nielsen", "Comscore"] },
        ],
    },
    {
        name: "Activation / Execution",
        tasks: [
            { label: "Campaign delivery", agent: "Salesforce", providers: ["Nielsen", "Comscore"] },
            { label: "Retail media", agent: "Salesforce", providers: ["Circana"] },
            { label: "Execution", agent: "Salesforce", providers: ["Comscore", "Circana"] },
        ],
    },
    {
        name: "Measurement & Optimization",
        tasks: [
            { label: "Effectiveness", agent: "Your agent", providers: ["Nielsen", "Brandwatch", "Comscore", "Circana"] },
            { label: "Sales impact", agent: "Salesforce", providers: ["Nielsen", "Circana"] },
            { label: "Optimization", agent: "Your agent", providers: ["Nielsen", "Comscore"] },
        ],
    },
];