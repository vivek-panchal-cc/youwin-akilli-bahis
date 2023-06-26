import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import NewsSection from "./components/NewsSection";
import settings from "../../misc";
import {
  addPopularOddToCollection,
  addTeaserItemToCollection,
} from "../../feature/appAction";
import { ReducerContext } from "../../context/ReducerContext";
import { addLigItemToCollection } from "../../feature/appAction";
import { useNavigate, useParams } from "react-router-dom";

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
  const navigate = useNavigate();

  // @futureUse const selectedMenuTab = fireBaseAllLeaguesDataBase && Object.keys(fireBaseAllLeaguesDataBase)?.[0];

  const handleSelect = (item) => {
    console.log("item: ", item);
    navigate(`/free-tips/${item}`)
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
  return (
    <div className="odd_section_container">
      <div className="odd_section_header">
        <h2>{settings.staticString.thisWeeksTopStories}</h2>
      </div>      
      <NewsSection
        data={fireBaseAllEventsDataBase}
        handleSelectOdd={handleSelectOdd}
        selectedItem={tipsCollection}
      />
    </div>
  );
};

export default News;
