import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import MultiBet from "./components/MultiBet";
import { addPopularOddToCollection, addAllOddsToCollection } from "../../feature/appAction";
import { ReducerContext } from "../../context/ReducerContext";

const MultiBetIndex = () => {
  const { fireBaseAllEventsDataBase } = useContext(AppContext);

  const { tipsCollection, dispatch } = useContext(ReducerContext);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  const handleSelectOdd = (data) => {
    addPopularOddToCollection(dispatch, data);
  };

  const handleAddToCollection = (data) => {
    addAllOddsToCollection(dispatch, data);
  };

  useEffect(() => {
    if (fireBaseAllEventsDataBase) {
      // Set isLoading to false once data is available
      setIsLoading(false);
    }
  }, [fireBaseAllEventsDataBase]);

  return (
    <div className="home_page_container">
      <MultiBet
        data={fireBaseAllEventsDataBase}
        handleSelectOdd={handleSelectOdd}
        handleAddToCollection={handleAddToCollection}
        tipsCollection={tipsCollection}
        isLoading={isLoading} // Pass the isLoading prop
      />
    </div>
  );
};

export default MultiBetIndex;
