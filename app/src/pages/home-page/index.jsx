import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TeaserSlider from "./components/TeaserSlider";
import { AppContext } from "../../context/AppContext";
import SportsMenu from "../../components/sportsMenu";
import LigSlider from "../../components/ligSlider";
import PopularOdds from "./components/PopularOdds";
import {
  addTeaserItemToCollection,
  addLigItemToCollection,
} from "../../feature/appAction";
import { ReducerContext } from "../../context/ReducerContext";

/**
 * HomePage - component it's first page which is show app started.
 */

const HomePage = () => {
  const {
    fireBaseTeaserDataBase,
    fireBaseAllLeaguesDataBase,
    fireBaseFeaturedDataBase,
    fireBasePopularOddsDataBase,
    fireBaseHomePageSliderLiveDataBase
  } = useContext(AppContext);

  const { tipsCollection, dispatch } = useContext(ReducerContext);
  const navigate = useNavigate();
  // @futureUse const selectedMenuTab = fireBaseAllLeaguesDataBase && Object.keys(fireBaseAllLeaguesDataBase)?.[0];

  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  const handleSelect = (item) => {    
    navigate(`/free-tips/${item}`);
  };

  const handleSelectOdd = (data) => {
    addLigItemToCollection(dispatch, data);
  };

  const handleSelectLigItem = (data) => {
    addLigItemToCollection(dispatch, data);
  };

  const handleSelectTeaserItem = (data) => {
    addTeaserItemToCollection(dispatch, data);
  };

  useEffect(() => {
    if (
      fireBaseTeaserDataBase &&
      fireBaseAllLeaguesDataBase &&
      fireBaseFeaturedDataBase &&
      fireBasePopularOddsDataBase
    ) {
      // Set isLoading to false once data is available
      setIsLoading(false);
    }
  }, [
    fireBaseTeaserDataBase,
    fireBaseAllLeaguesDataBase,
    fireBaseFeaturedDataBase,
    fireBasePopularOddsDataBase,
  ]);

  const mergedData = fireBaseFeaturedDataBase?.concat(fireBaseTeaserDataBase);

  return (
    <div className="home_page_container">
      <TeaserSlider
        data={mergedData}
        handleSelectTeaser={handleSelectTeaserItem}
        isLoading={isLoading} // Pass the isLoading prop
      />
      <SportsMenu
        data={fireBaseAllLeaguesDataBase}
        handleSelect={handleSelect}
        selectedItem={""}
        isLoading={isLoading} // Pass the isLoading prop
      />
      <LigSlider
        data={fireBaseHomePageSliderLiveDataBase}
        handleSelectLig={handleSelectLigItem}
        tipsCollection={tipsCollection}
        isLoading={isLoading} // Pass the isLoading prop
        displayLiveLabel={false}
      />
      <PopularOdds
        data={fireBasePopularOddsDataBase}
        handleSelectOdd={handleSelectOdd}
        tipsCollection={tipsCollection}
        isLoading={isLoading} // Pass the isLoading prop
      />
    </div>
  );
};

export default HomePage;
