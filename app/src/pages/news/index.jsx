import React, { useContext, useState } from "react";
import NewsSection from "./components/NewsSection";
import useCurrentLanguage from "../../misc";
import { addPopularOddToCollection } from "../../feature/appAction";
import { ReducerContext } from "../../context/ReducerContext";

const News = () => {
  const { tipsCollection, dispatch } = useContext(ReducerContext);
  const [noNewsAvailable, setNoNewsAvailable] = useState(false);
  const settings = useCurrentLanguage();

  const handleSelectOdd = (data) => {
    addPopularOddToCollection(dispatch, data);
  };

  return (
    <div className="odd_section_container">
      {!noNewsAvailable && (
        <div className="odd_section_header">
          <h2>{settings.staticString.thisWeeksTopStories}</h2>
        </div>
      )}
      <NewsSection
        data={""}
        handleSelectOdd={handleSelectOdd}
        selectedItem={tipsCollection}
        setNoNewsAvailable={setNoNewsAvailable}
      />
    </div>
  );
};

export default News;
