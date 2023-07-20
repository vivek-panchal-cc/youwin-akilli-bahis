import React, { useContext } from "react";
import NewsSection from "./components/NewsSection";
import settings from "../../misc";
import { addPopularOddToCollection } from "../../feature/appAction";
import { ReducerContext } from "../../context/ReducerContext";

const News = () => {
  const { tipsCollection, dispatch } = useContext(ReducerContext);

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
