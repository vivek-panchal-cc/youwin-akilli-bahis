import React, { useContext } from "react";
import TeaserSlider from "../home-page/components/TeaserSlider";
import { AppContext } from "../../context/AppContext";
import SportsMenu from "../../components/sportsMenu";
import LigSlider from "../../components/ligSlider";
import PopularOdds from "../home-page/components/PopularOdds";
import OddSection from "./components/OddSection";
import settings from "../../misc";
import {
  addPopularOddToCollection,
  addTeaserItemToCollection,
} from "../../feature/appAction";
import { ReducerContext } from "../../context/ReducerContext";
import { addLigItemToCollection } from "../../feature/appAction";
import OddsCalendar from "./components/OddsCalendar";
import { useNavigate, useParams } from "react-router-dom";

/**
 * HomePage - component it's first page which is show app started.
 */

const FreeTips = () => {
  const {
    fireBaseAllLeaguesDataBase,
    fireBaseFeaturedDataBase,
    fireBaseAllEventsDataBase,
    fireBaseHomePageSliderDataBase,
  } = useContext(AppContext);

  const { tipsCollection, dispatch } = useContext(ReducerContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // @futureUse const selectedMenuTab = fireBaseAllLeaguesDataBase && Object.keys(fireBaseAllLeaguesDataBase)?.[0];

  const handleSelect = (item) => {
    console.log("item: ", item);
    navigate(`/free-tips/${item}`);
  };

  // useEffect(() => {
  //   setSportMenu(dispatch, selectedMenuTab)
  // }, [fireBaseAllLeaguesDataBase])

  const handleSelectOdd = (data) => {
    addPopularOddToCollection(dispatch, data);
  };

  const handleSelectLigItem = (data) => {
    addLigItemToCollection(dispatch, data);
  };

  const handleSelectTeaserItem = (data) => {
    addTeaserItemToCollection(dispatch, data);
  };

  const filteredLigSliderData = fireBaseHomePageSliderDataBase?.filter(
    (item) => item.competitionId === id
  );

  return (
    <div className="odd_section_container">
      <div className="odd_section_header">
        <h2>{settings.staticString.thisWeeksTopMatches}</h2>
      </div>
      <SportsMenu
        data={fireBaseAllLeaguesDataBase}
        handleSelect={handleSelect}
        selectedItem={id}
      />
      {filteredLigSliderData?.length > 0 && (
        <LigSlider
          data={filteredLigSliderData}
          handleSelectLig={handleSelectLigItem}
          tipsCollection={tipsCollection}
        />
      )}
      <OddSection
        data={fireBaseAllEventsDataBase}
        handleSelectOdd={handleSelectOdd}
        selectedItem={tipsCollection}
      />
    </div>
  );
};

export default FreeTips;
