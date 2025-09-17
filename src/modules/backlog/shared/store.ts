import { useEffect, useState } from "react"

let state = 1

export const createStore = () => {
    const [reactState, setState] = useState(state)

    useEffect(() => {
        state = reactState
    }, [reactState])

    function getState() {
        return state
    }

    return {
        getState,
        setState,
    }
}