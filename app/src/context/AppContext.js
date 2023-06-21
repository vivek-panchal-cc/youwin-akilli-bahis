import React, { createContext, useMemo } from 'react';
import useAppState from '../hooks/useAppState';

const appInitState = {
    fireBaseHomePageSliderDataBase: null,
    fireBaseAllEventsDataBase: null,
    fireBaseAllLeaguesDataBase: null,
    fireBaseAllMarketsDataBase: null,
    fireBasePopularOddsDataBase: null,
    fireBaseTeaserDataBase:  null,
}

export const AppContext = createContext({...appInitState});

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