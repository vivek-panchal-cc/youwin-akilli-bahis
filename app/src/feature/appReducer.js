import { ADD_POPULAR_ODD_TO_COLLECTION, SELECT_SPORT_MENU } from "./types";

const initialState = {
  tipsCollection: [],
  selectedSportMenu: []
}

const appReducer =  (state = initialState, action) => {
  switch (action.type) {

  case "ADD_TIPS_TO_COLLECTIONS":
    return { 
        ...state,
      tipsCollection: [...state.tipsCollection, action.payload]
     }
  case ADD_POPULAR_ODD_TO_COLLECTION:
    const isExists = state.tipsCollection.some(elm => elm.eventId === action.payload.eventId);
    let tipsCollectionArray = [];
    if(isExists){
      tipsCollectionArray = state.tipsCollection.filter(item => item.eventId !== action.payload.eventId)
    }else {
      tipsCollectionArray = [...state.tipsCollection, action.payload];
    }
    return {
      ...state,
      tipsCollection: tipsCollectionArray
    }
  case SELECT_SPORT_MENU: 
    return {
      ...state,
      selectedSportMenu: action.payload
    }
  default:
    return state
  }
}
export default appReducer;