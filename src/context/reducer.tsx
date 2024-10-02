import { CounterAction, CounterState } from "@/interface";

export const initialState = {
    count: 0
}

export const reducer = (state:CounterState, action:CounterAction) => {
    switch (action.type) {
        case "INCREMENT":
            localStorage.setItem('count',JSON.stringify(state.count + 1))
            return {
                ...state,
                count: state.count + 1
            }
            break;
        case "DECREMENT":
            localStorage.setItem('count',JSON.stringify(state.count - 1))
            return {
                ...state,
                count: state.count - 1
            }
            break;
        case "SET":
            localStorage.setItem('count',JSON.stringify(action.payload))
            return {
                ...state,
                count: action?.payload
            }
        default:
            return state
            break;
    }
}
