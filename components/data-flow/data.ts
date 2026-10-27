export const PROVIDERS = ["Kantar", "Nielsen", "Experian", "Circana (IRI)", "Comscore"] as const;
export const AGENTS = ["Miro Sidekick", "Jasper AI", "Salesforce Einstein", "Your agent"] as const;

export type Subtask = { label: string; agent: number; providers: number[] };
export type Stage = { name: string; subtasks: Subtask[] };

export const STAGES: Stage[] = [
    {
        name: "Strategy / Brief",
        subtasks: [
            { label: "Market understanding", agent: 0, providers: [0, 1, 2] },
            { label: "Audience sizing", agent: 0, providers: [1, 2] },
            { label: "Category context", agent: 0, providers: [0, 3] },
        ],
    },
    {
        name: "Creative Development",
        subtasks: [
            { label: "Cultural tensions, insights", agent: 1, providers: [0, 4] },
            { label: "Inspiration", agent: 1, providers: [4] },
            { label: "Messaging development", agent: 1, providers: [0] },
        ],
    },
    {
        name: "Media Strategy / Planning",
        subtasks: [
            { label: "Reach, frequency", agent: 0, providers: [4] },
            { label: "Channel effectiveness", agent: 0, providers: [4] },
            { label: "Planning", agent: 0, providers: [4] },
        ],
    },
    {
        name: "Activation / Execution",
        subtasks: [
            { label: "Campaign activation", agent: 3, providers: [2] },
            { label: "Retail media", agent: 3, providers: [3] },
            { label: "Execution", agent: 3, providers: [3] },
        ],
    },
    {
        name: "Measurement & Optimization",
        subtasks: [
            { label: "Effectiveness", agent: 2, providers: [0, 1] },
            { label: "Sales impact", agent: 2, providers: [3] },
            { label: "Optimization", agent: 2, providers: [0, 1, 3] },
        ],
    },
];

export const DEFAULT_SUBTASK = "Market understanding";

// Scattered start positions, % of the diagram card
export const PROVIDER_SCATTER = [
    { x: 8, y: 10, rotate: -12 },
    { x: 95, y: 8, rotate: 18 },
    { x: 5, y: 35, rotate: 8 },
    { x: 82, y: 52, rotate: -15 },
    { x: 21, y: 47, rotate: 22 },
];

export const AGENT_SCATTER = [
    { x: 15, y: 35, rotate: -15 },
    { x: 72, y: 28, rotate: 20 },
    { x: 88, y: 46, rotate: -8 },
    { x: 72, y: 38, rotate: 4 },
];