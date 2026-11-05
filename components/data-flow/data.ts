import {
    AGENTS as AGENT_LIST,
    PROVIDERS as PROVIDER_LIST,
    STAGES as CONTENT_STAGES,
} from "@/lib/content/workflow";

export const PROVIDERS = PROVIDER_LIST.map((p) => p.name);
export const PROVIDER_LOGOS = PROVIDER_LIST.map((p) => ("logo" in p ? p.logo : undefined));

export const AGENTS = AGENT_LIST.map((a) => a.name);
export const AGENT_LOGOS = AGENT_LIST.map((a) => ("logo" in a ? a.logo : undefined));

export type Subtask = { label: string; agent: number; providers: number[] };
export type Stage = { name: string; subtasks: Subtask[] };

// Index-based shape the diagram uses (slots are keyed by position)
export const STAGES: Stage[] = CONTENT_STAGES.map((s) => ({
    name: s.name,
    subtasks: s.tasks.map((t) => ({
        label: t.label,
        agent: AGENTS.indexOf(t.agent),
        providers: t.providers.map((p) => PROVIDERS.indexOf(p)),
    })),
}));

export const DEFAULT_SUBTASK = "Market understanding";

// Scattered start positions, % of the diagram card (5 providers, 4 agents)
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