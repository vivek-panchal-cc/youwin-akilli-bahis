import React, { useContext } from "react";
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
    fireBaseHomePageSliderLiveDataBase,
  } = useContext(AppContext);
  const { tipsCollection, dispatch } = useContext(ReducerContext);
  const navigate = useNavigate();  
  // const fireBasePopularOddsDataBase = [];
  // @futureUse const selectedMenuTab = fireBaseAllLeaguesDataBase && Object.keys(fireBaseAllLeaguesDataBase)?.[0];

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

  const mergedData = fireBaseTeaserDataBase
    ? fireBaseFeaturedDataBase?.concat(fireBaseTeaserDataBase)
    : fireBaseFeaturedDataBase;

  return (
    <div className="home_page_container">
      <TeaserSlider
        data={mergedData}
        handleSelectTeaser={handleSelectTeaserItem}
      />
      <SportsMenu
        data={fireBaseAllLeaguesDataBase}
        handleSelect={handleSelect}
        selectedItem={""}
      />
      <LigSlider
        data={fireBaseHomePageSliderLiveDataBase}
        handleSelectLig={handleSelectLigItem}
        tipsCollection={tipsCollection}
        isLoading={
          fireBaseHomePageSliderLiveDataBase !== undefined ? false : true
        }
        displayLiveLabel={false}
      />
      <PopularOdds
        data={fireBasePopularOddsDataBase}
        handleSelectOdd={handleSelectOdd}
        tipsCollection={tipsCollection}
      />
    </div>
  );
};

export default HomePage;
