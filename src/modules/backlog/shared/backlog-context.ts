import type { Sprint } from "@/shared/api.shared";
import { createContext, type ActionDispatch } from "react";

export const SprintStateContext = createContext<{
    sprints: Sprint[];
}>({
    sprints: [],
});

export const SprintDispatchContext = createContext<ActionDispatch<[action: { type: string; payload: any; }]>>(
    () => { },
);

export const BackLogStateContext = createContext<{
    storiesData: Map<string, any[]>;
    sprintsData: Sprint[];
    sprints: Sprint[];
    searchQuery: string;
    priority: string;
    assignee: string;
}>({
    storiesData: new Map(),
    sprintsData: [],
    sprints: [],
    searchQuery: "",
    priority: "all",
    assignee: "all",
});

export const BackLogDispatchContext = createContext<ActionDispatch<[action: { type: string; payload: any; }]>>(
    () => { },
);
