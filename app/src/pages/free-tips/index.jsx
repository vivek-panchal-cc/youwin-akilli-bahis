import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import SportsMenu from "../../components/sportsMenu";
import LigSlider from "../../components/ligSlider";
import OddSection from "./components/OddSection";
import useCurrentLanguage from "../../misc";
import {
  addPopularOddToCollection,
  addLigItemToCollection,
} from "../../feature/appAction";
import { ReducerContext } from "../../context/ReducerContext";
import { useNavigate, useParams } from "react-router-dom";

/**
 * HomePage - component it's first page which is show app started.
 */

const FreeTips = () => {
  const {
    fireBaseAllLeaguesDataBase,
    fireBaseAllEventsDataBase,
    fireBaseHomePageSliderLiveDataBase,
  } = useContext(AppContext);
  const { tipsCollection, dispatch } = useContext(ReducerContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const settings = useCurrentLanguage();

  const handleSelect = (item) => {
    navigate(`/free-tips/${item}`);
  };

  const handleSelectOdd = (data) => {
    addPopularOddToCollection(dispatch, data);
  };

  const handleSelectLigItem = (data) => {
    addLigItemToCollection(dispatch, data);
  };

  const filteredLigSliderData = fireBaseHomePageSliderLiveDataBase?.filter(
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
      <LigSlider
        data={filteredLigSliderData}
        handleSelectLig={handleSelectLigItem}
        tipsCollection={tipsCollection}
        isLoading={
          filteredLigSliderData === undefined ||
          filteredLigSliderData?.length > 0
            ? false
            : true
        } // Pass the isLoading prop
        displayLiveLabel={true}
      />
      <OddSection
        data={fireBaseAllEventsDataBase}
        handleSelectOdd={handleSelectOdd}
        selectedItem={tipsCollection}
      />
    </div>
  );
};

export default FreeTips;
