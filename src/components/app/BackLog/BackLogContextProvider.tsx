import { createContext, useReducer, type ActionDispatch } from "react";

export const BackLogStateContext = createContext<{
    searchQuery: string;
}>({
    searchQuery: "",
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
        // Add more cases for other actions if needed
        default:
            return state;
    }
}

export function BackLogContextProvider({ children }: { children: React.ReactNode }) {
    const [filterState, filterDispatch] = useReducer(filterReducer, {
        searchQuery: "",
    });

    return (
        <BackLogStateContext.Provider value={filterState}>
            <BackLogDispatchContext.Provider value={filterDispatch}>
                {children}
            </BackLogDispatchContext.Provider>
        </BackLogStateContext.Provider>
    )
}