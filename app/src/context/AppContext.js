import React, { createContext, useMemo, useState } from "react";
import useAppState from "../hooks/useAppState";

// InitState use for context
const appInitState = {
  fireBaseHomePageSliderDataBase: null,
  fireBaseAllEventsDataBase: undefined,
  fireBaseAllLeaguesDataBase: undefined,
  fireBaseAllMarketsDataBase: null,
  fireBasePopularOddsDataBase: undefined,
  fireBaseTeaserDataBase: undefined,
  fireBaseHomePageTeaserSliderDataBase: null,
  fireBaseHomePageSliderLiveDataBase: undefined,
  fireBaseFeaturedDataBase: undefined,
  language: "tr", // default language set to 'tr'
};

export const AppContext = createContext({ ...appInitState });

/**
 * AppContextProvider - context provider use for manage global state for firebase data.
 *
 * @param {children} - react element
 *
 */

const AppContextProvider = ({ children }) => {
  const { appState } = useAppState();
  const [language, setLanguage] = useState("tr"); // local state for language

  const value = useMemo(
    () => ({ ...appState, language, setLanguage }),
    [appState, language]
  );  

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
