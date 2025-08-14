import { createContext, useReducer, type ActionDispatch } from "react";

export const BackLogStateContext = createContext<{
    searchQuery: string;
    priority: string;
    assignee: string;
}>({
    searchQuery: "",
    priority: "all",
    assignee: "all",
});

export const BackLogDispatchContext = createContext<
    ActionDispatch<[action: {
        type: string;
        payload: any;
    }]>
>(
    () => { },
);

function filterReducer(state: any, action: { type: string; payload: any }) {
    switch (action.type) {
        case "SET_SEARCH_QUERY":
            return { ...state, searchQuery: action.payload };
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
        searchQuery: "",
        priority: "all",
        assignee: "all",
    });

    return (
        <BackLogStateContext.Provider value={filterState}>
            <BackLogDispatchContext.Provider value={filterDispatch}>
                {children}
            </BackLogDispatchContext.Provider>
        </BackLogStateContext.Provider>
    )
}