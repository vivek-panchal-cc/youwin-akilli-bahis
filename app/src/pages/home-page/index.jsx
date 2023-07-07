import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TeaserSlider from "./components/TeaserSlider";
import { AppContext } from "../../context/AppContext";
import SportsMenu from "../../components/sportsMenu";
import LigSlider from "../../components/ligSlider";
import PopularOdds from "./components/PopularOdds";
import {
  addPopularOddToCollection,
  addTeaserItemToCollection,
} from "../../feature/appAction";
import { ReducerContext } from "../../context/ReducerContext";
import { addLigItemToCollection } from "../../feature/appAction";

/**
 * HomePage - component it's first page which is show app started.
 */

const HomePage = () => {
  const {
    fireBaseTeaserDataBase,
    fireBaseAllLeaguesDataBase,
    fireBaseFeaturedDataBase,
    fireBasePopularOddsDataBase,
  } = useContext(AppContext);

  const { tipsCollection, dispatch } = useContext(ReducerContext);
  const navigate = useNavigate();
  // @futureUse const selectedMenuTab = fireBaseAllLeaguesDataBase && Object.keys(fireBaseAllLeaguesDataBase)?.[0];

  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  const handleSelect = (item) => {
    console.log("item: ", item);
    navigate(`/free-tips/${item}`)
  };

  // useEffect(() => {
  //   setSportMenu(dispatch, selectedMenuTab)
  // }, [fireBaseAllLeaguesDataBase])

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
    // Simulate data loading delay (remove this in your actual implementation)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="home_page_container">
      <TeaserSlider
        data={fireBaseTeaserDataBase}
        handleSelectTeaser={handleSelectTeaserItem}
      />
      <SportsMenu
        data={fireBaseAllLeaguesDataBase}
        handleSelect={handleSelect}
        selectedItem={""}
      />
      <LigSlider
        data={fireBaseFeaturedDataBase}
        handleSelectLig={handleSelectLigItem}
        tipsCollection={tipsCollection}
        isLoading={isLoading} // Pass the isLoading prop
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
