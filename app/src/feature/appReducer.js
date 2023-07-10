import { REMOVE_ALL_ITEMS, ADD_LIG_ITEM_TO_COLLECTION, ADD_POPULAR_ODD_TO_COLLECTION, ADD_TEASER_ITEM_TO_COLLECTION, REMOVE_ITEM_FROM_TIP_COLLECTION, SELECT_SPORT_MENU, SET_TIP_COLLECTION_MODAL_STATUS } from "./types";

const initialState = {
  tipsCollection: [],
  selectedSportMenu: [],
  isModalShow: false,
}
/**
 * appReducer - use for reducer manage all state
 * @param {state} - initial state 
 * @param {action} - action come from reducers
 * 
 */
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POPULAR_ODD_TO_COLLECTION:      
      
      const isOddExistsWithEventId = state.tipsCollection.some(elm => elm.eventId === action.payload.eventId);
      const isOddExistsWithSelectionId = state.tipsCollection.some(elm => elm.eventId === action.payload.eventId && elm.selectionId === action.payload.selectionId);

      let tipsCollectionArray = state.tipsCollection.filter(item => item.eventId !== action.payload.eventId);

      if (!isOddExistsWithEventId || !isOddExistsWithSelectionId) {
        tipsCollectionArray.push(action.payload);
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
    case ADD_LIG_ITEM_TO_COLLECTION:
      const { eventId, selectionId } = action.payload;
      
      console.log('action.payload :>> ', action.payload);

      const isExistsWithEventId = state.tipsCollection.some(elm => elm.eventId === eventId);
      const isExistsWithSelectionId = state.tipsCollection.some(elm => elm.eventId === eventId && elm.selectionId === selectionId);

      let tipsCollectionArr = state.tipsCollection.filter(item => item.eventId !== eventId);

      if (!isExistsWithEventId || !isExistsWithSelectionId) {
        tipsCollectionArr.push(action.payload);
      }

      return {
        ...state,
        tipsCollection: tipsCollectionArr
      }
    case ADD_TEASER_ITEM_TO_COLLECTION:
      const isExistsTip = state.tipsCollection.some(elm => elm.eventId === action.payload?.eventId);
      return {
        ...state,
        tipsCollection: !isExistsTip ? [...state.tipsCollection, action.payload] : [...state.tipsCollection]
      }
    case SET_TIP_COLLECTION_MODAL_STATUS:
      return {
        ...state,
        isModalShow: action.payload
      }
    case REMOVE_ITEM_FROM_TIP_COLLECTION: 
      const filterArray = state.tipsCollection.filter(elm => elm.eventId !== action.payload)
      return {
        ...state,
        tipsCollection: filterArray
      }
    case REMOVE_ALL_ITEMS:
      return {
        ...state,
        tipsCollection: [],
      };
    default:
      return state
  }
}
export default appReducer;