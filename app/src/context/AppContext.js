import React, { createContext, useMemo, useReducer } from 'react'
import useAppState from '../hooks/useAppState';
import appReducer from '../feature/appReducer';


const reducerInitState = {
    tipsCollection: [], 
}

const appInitState = {
    fireBaseHomePageSliderDataBase: null,
    fireBaseAllEventsDataBase: null,
    fireBaseAllLeaguesDataBase: null,
    fireBaseAllMarketsDataBase: null,
    fireBasePopularOddsDataBase: null,
    fireBaseTeaserDataBase:  null,
    reducerState: reducerInitState,
    dispatch: () => {},
}

export const AppContext = createContext({...appInitState});

const AppContextProvider = ({children}) => {
    const {appState} = useAppState();
    const [state, dispatch] = useReducer(appReducer, reducerInitState);
    
    const value =  useMemo(() => ({...appState,  reducerState: state, dispatch}),[appState, state])
    
    console.log('AKILLI-BAHIS || reducers state', state);
    console.log('AKILLII-BAHIS || firebaseData: ', appState);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
  )
}

export default AppContextProvider