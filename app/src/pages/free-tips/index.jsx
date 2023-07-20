import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import SportsMenu from "../../components/sportsMenu";
import LigSlider from "../../components/ligSlider";
import OddSection from "./components/OddSection";
import settings from "../../misc";
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
    fireBaseHomePageSliderDataBase,
  } = useContext(AppContext);

  const { tipsCollection, dispatch } = useContext(ReducerContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  useEffect(() => {
    if (
      fireBaseAllLeaguesDataBase &&
      fireBaseAllEventsDataBase &&
      fireBaseHomePageSliderDataBase
    ) {
      // Set isLoading to false once data is available
      setIsLoading(false);
    }
  }, [
    fireBaseAllLeaguesDataBase,
    fireBaseAllEventsDataBase,
    fireBaseHomePageSliderDataBase,
  ]);

  const handleSelect = (item) => {    
    navigate(`/free-tips/${item}`);
  };

  const handleSelectOdd = (data) => {
    addPopularOddToCollection(dispatch, data);
  };

  const handleSelectLigItem = (data) => {
    addLigItemToCollection(dispatch, data);
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
          isLoading={isLoading} // Pass the isLoading prop
        />
      )}
      <OddSection
        data={fireBaseAllEventsDataBase}
        handleSelectOdd={handleSelectOdd}
        selectedItem={tipsCollection}
        isLoading={isLoading} // Pass the isLoading prop
      />
    </div>
  );
};

export default FreeTips;
