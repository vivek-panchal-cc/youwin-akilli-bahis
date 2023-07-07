import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import NewsSection from "./components/NewsSection";
import settings from "../../misc";
import {
  addPopularOddToCollection,
} from "../../feature/appAction";
import { ReducerContext } from "../../context/ReducerContext";
import { useParams } from "react-router-dom";

/**
 * HomePage - component it's first page which is show app started.
 */

const News = () => {
  const {
    fireBaseAllLeaguesDataBase,
    fireBaseFeaturedDataBase,
    fireBaseAllEventsDataBase,
    fireBaseHomePageSliderDataBase,
  } = useContext(AppContext);

  const { tipsCollection, dispatch } = useContext(ReducerContext);
  const { id } = useParams();

  const handleSelectOdd = (data) => {
    addPopularOddToCollection(dispatch, data);
  };


  return (
    <div className="odd_section_container">
      <div className="odd_section_header">
        <h2>{settings.staticString.thisWeeksTopStories}</h2>
      </div>      
      <NewsSection
        data={""}
        handleSelectOdd={handleSelectOdd}
        selectedItem={tipsCollection}
      />
    </div>
  );
};

export default News;
