import { createContext, useMemo, useReducer } from "react";
import appReducer from "../feature/appReducer";

const reducerInitState = {
    tipsCollection: [],
    isModalShow: false
}
const initState = {
    ...reducerInitState,
    dispatch: () => {}
}
export const ReducerContext = createContext({...initState});

const ReducerContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(appReducer, reducerInitState);

    const value =  useMemo(() => ({...state, dispatch}),[state])
    console.log('AKILLI-BAHIS || reducers state', state);

    return (
        <ReducerContext.Provider value={value}>
            {children}
        </ReducerContext.Provider>
    )
}

export default ReducerContextProvider;
