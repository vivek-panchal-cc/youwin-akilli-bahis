import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue} from "firebase/database";

/**
 * useAppState - create custom hooks for manage all firebase data,
 * 
 * @returns {appState} - apps state contains all firebase object.
 */

const useAppState = () => {
  const [appState, setAppState] = useState();
  const db = getDatabase();

  const initRealTimeDatabaseObservation = () => {
    const homePageSliderRef = ref(db, 'json_feeds/homepage');
    const homePageSliderLiveRef = ref(db, 'json_feeds/live');
    const homePageTeaserSliderRef = ref(db, 'leagues');
    const allEventsRef = ref(db, 'pregame/all_events');
    const allLeaguesRef = ref(db, 'pregame/all_leagues');
    const allMarketsRef = ref(db, 'pregame/all_markets');
    const popularRef = ref(db, 'popular/popular_sports');
    const teaserRef = ref(db, 'pregame/teaser');
    const featuredRef = ref(db, 'pregame/featured');

    onValue(homePageSliderRef, (snapshot) => {
      const data = snapshot.val();
      window.akilliBahisDatabase.homePageSlider = data;
      setAppStateData?.()
    });
    onValue(homePageSliderLiveRef, (snapshot) => {
      const data = snapshot.val();
      window.akilliBahisDatabase.homePageSliderLive = data;
      setAppStateData?.()
    });
    onValue(homePageTeaserSliderRef, (snapshot) => {
      const data = snapshot.val();
      window.akilliBahisDatabase.homePageTeaserSlide = data;
      setAppStateData?.()
    });
    onValue(allEventsRef, (snapshot) => {
      const data = snapshot.val();
      window.akilliBahisDatabase.allEventsData = data;
      setAppStateData?.()
    });
    onValue(allLeaguesRef, (snapshot) => {
      const data = snapshot.val();
      window.akilliBahisDatabase.allLeaguesData = data;
      setAppStateData?.()
    });
    onValue(allMarketsRef, (snapshot) => {
      const data = snapshot.val();
      window.akilliBahisDatabase.allMarketsData = data;
      setAppStateData?.()
    });
    onValue(popularRef, (snapshot) => {
      const data = snapshot.val();
      window.akilliBahisDatabase.popularData = data;
      setAppStateData?.()
    });
    onValue(teaserRef, (snapshot) => {
      const data = snapshot.val();
      window.akilliBahisDatabase.teaserData = data;
      setAppStateData?.()
    });
    onValue(featuredRef, (snapshot) => {
      const data = snapshot.val();
      window.akilliBahisDatabase.featuredData = data;
      setAppStateData?.()
    });
  }
  const setAppStateData = () => {
    setAppState({
      fireBaseHomePageSliderDataBase: window.akilliBahisDatabase?.homePageSlider,
      fireBaseHomePageSliderLiveDataBase: window.akilliBahisDatabase?.homePageSliderLive,
      fireBaseHomePageTeaserSliderDataBase: window.akilliBahisDatabase?.homePageTeaserSlide,
      fireBaseAllEventsDataBase: window.akilliBahisDatabase?.allEventsData,
      fireBaseAllLeaguesDataBase: window.akilliBahisDatabase?.allLeaguesData,
      fireBaseAllMarketsDataBase: window.akilliBahisDatabase?.allMarketsData,
      fireBasePopularOddsDataBase: window.akilliBahisDatabase?.popularData,
      fireBaseTeaserDataBase: window.akilliBahisDatabase?.teaserData,
      fireBaseFeaturedDataBase: window.akilliBahisDatabase?.featuredData
    })
  }
  useEffect(() => {
    initRealTimeDatabaseObservation()
    // eslint-disable-next-line
  }, [])
  
  
    return {
        appState
    }
}

export default useAppState;