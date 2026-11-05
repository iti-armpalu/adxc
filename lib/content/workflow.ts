// Source: growth team's sheets.
// Tasks/agents/providers per task → task-level sheet (used by the data-flow diagram).
// costProviders per stage + prices → stage-level sheet (used by WorkflowCosts).

export const PROVIDERS = [
    { name: "YouGov", annualPrice: 75_000 },
    { name: "Nielsen", annualPrice: 200_000 },
    { name: "Quid", annualPrice: 50_000 }, // TODO: task sheet says $75k, stage sheet $50k — confirm
    { name: "Comscore", annualPrice: 100_000 },
    { name: "Circana", annualPrice: 100_000 },
] as const;

export const AGENTS = ["Miro", "Jasper", "Salesforce", "Your agent"] as const;

export type ProviderName = (typeof PROVIDERS)[number]["name"];
export type AgentName = (typeof AGENTS)[number];
export type Task = { label: string; agent: AgentName; providers: ProviderName[] };
export type Stage = { name: string; costProviders: ProviderName[]; tasks: Task[] };

export const STAGES: Stage[] = [
    {
        name: "Strategy / Brief",
        costProviders: ["YouGov", "Nielsen"],
        tasks: [
            { label: "Market understanding", agent: "Miro", providers: ["YouGov", "Circana"] },
            { label: "Audience sizing", agent: "Miro", providers: ["YouGov", "Nielsen"] },
            { label: "Category context", agent: "Miro", providers: ["Quid", "Circana"] },
        ],
    },
    {
        name: "Creative Development",
        costProviders: ["Quid"],
        tasks: [
            { label: "Tensions", agent: "Jasper", providers: ["YouGov", "Quid"] },
            { label: "Cultural context", agent: "Jasper", providers: ["Quid"] },
            { label: "Inspiration", agent: "Jasper", providers: ["Quid"] },
        ],
    },
    {
        name: "Media Strategy / Planning",
        costProviders: ["YouGov", "Comscore"],
        tasks: [
            { label: "Reach, frequency", agent: "Miro", providers: ["Nielsen", "Comscore"] },
            { label: "Channel effectiveness", agent: "Miro", providers: ["Nielsen"] },
            { label: "Planning", agent: "Miro", providers: ["YouGov", "Nielsen"] },
        ],
    },
    {
        name: "Activation / Execution",
        costProviders: ["Comscore", "Circana"],
        tasks: [
            { label: "Campaign delivery", agent: "Salesforce", providers: ["Nielsen", "Comscore"] },
            { label: "Retail media", agent: "Salesforce", providers: ["Circana"] },
            { label: "Execution", agent: "Salesforce", providers: ["Comscore", "Circana"] },
        ],
    },
    {
        name: "Measurement & Optimization",
        costProviders: ["Nielsen", "Circana"],
        tasks: [
            { label: "Effectiveness", agent: "Your agent", providers: ["Nielsen"] },
            { label: "Sales impact", agent: "Salesforce", providers: ["Circana"] },
            { label: "Optimization", agent: "Your agent", providers: ["Nielsen", "Comscore"] },
        ],
    },
];