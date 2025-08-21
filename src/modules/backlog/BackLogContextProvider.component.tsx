import $api, { type Sprint } from "@/shared/api.shared";
import {useEffect, useReducer, type ContextType } from "react";
import { BackLogDispatchContext, BackLogStateContext } from "./backlog-context";

function filterReducer(state: ContextType<typeof BackLogStateContext>, action: { type: string; payload: any }) {
    switch (action.type) {
        case "SET_SPRINTS":
            const SET_SPRINTS = action.payload.filter((sprint: Sprint) =>
                sprint.name.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
            return { ...state, sprintsData: action.payload, sprints: SET_SPRINTS };
        case "SET_SEARCH_QUERY":
            const sprints = state.sprintsData.filter(sprint =>
                sprint.name.toLowerCase().includes(action.payload.toLowerCase())
            );
            return { ...state, searchQuery: action.payload, sprints };
        case "SET_PRIORITY":
            return { ...state, priority: action.payload };
        case "SET_ASSIGNEE":
            return { ...state, assignee: action.payload };
        default:
            return state;
    }
}

export function BackLogContextProvider({ children }: { children: React.ReactNode }) {
    const [filterState, filterDispatch] = useReducer(filterReducer, {
        sprints: [],
        sprintsData: [],
        searchQuery: "",
        priority: "all",
        assignee: "all",
    });

    useEffect(() => {
        $api.sprint.getSprints().then((sprints) => {
            filterDispatch({ type: 'SET_SPRINTS', payload: sprints });
        });
    }, []);

    return (
        <BackLogStateContext.Provider value={filterState}>
            <BackLogDispatchContext.Provider value={filterDispatch}>
                {children}
            </BackLogDispatchContext.Provider>
        </BackLogStateContext.Provider>
    )
}