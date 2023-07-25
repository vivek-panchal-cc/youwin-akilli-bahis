import { createContext, useMemo, useReducer } from "react";
import appReducer from "../feature/appReducer";

// reducers initial state
const reducerInitState = {
    tipsCollection: [],
    isModalShow: false
}
// context initial state
const initState = {
    ...reducerInitState,
    dispatch: () => {}
}
export const ReducerContext = createContext({...initState});

/**
 * ReducerContextProvider - context provider use for manage global state for reducers.
 * 
 * @param {children} - react element
 * 
 */

const ReducerContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(appReducer, reducerInitState);

    const value =  useMemo(() => ({...state, dispatch}),[state])    

    return (
        <ReducerContext.Provider value={value}>
            {children}
        </ReducerContext.Provider>
    )
}

export default ReducerContextProvider;
