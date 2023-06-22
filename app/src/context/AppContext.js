import React, { createContext, useMemo } from 'react';
import useAppState from '../hooks/useAppState';

// InitState use for context
const appInitState = {
    fireBaseHomePageSliderDataBase: null,
    fireBaseAllEventsDataBase: null,
    fireBaseAllLeaguesDataBase: null,
    fireBaseAllMarketsDataBase: null,
    fireBasePopularOddsDataBase: null,
    fireBaseTeaserDataBase:  null,
}

export const AppContext = createContext({...appInitState});

/**
 * AppContextProvider - context provider use for manage global state for firebase data.
 * 
 * @param {children} - react element
 * 
 */

const AppContextProvider = ({children}) => {
    const {appState} = useAppState();
    
    const value =  useMemo(() => ({...appState}),[appState])
    
    console.log('AKILLII-BAHIS || firebaseData: ', appState);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
  )
}

export default AppContextProvider