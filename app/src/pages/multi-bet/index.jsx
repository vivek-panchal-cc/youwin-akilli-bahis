import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import MultiBet from "./components/MultiBet";
import {
  addPopularOddToCollection,
} from "../../feature/appAction";
import { ReducerContext } from "../../context/ReducerContext";
import dummyJson from "../../constants/dummyOddsData.json"

const MultiBetIndex = () => {
  const {
    fireBasePopularOddsDataBase,
    fireBaseAllEventsDataBase
  } = useContext(AppContext);

  const { tipsCollection, dispatch } = useContext(ReducerContext);  

  const handleSelectOdd = (data) => {
    addPopularOddToCollection(dispatch, data);
  };

  return (
    <div className="home_page_container">      
      <MultiBet
        data={fireBaseAllEventsDataBase}
        handleSelectOdd={handleSelectOdd}
        tipsCollection={tipsCollection}
      />
    </div>
  );
};

export default MultiBetIndex;
