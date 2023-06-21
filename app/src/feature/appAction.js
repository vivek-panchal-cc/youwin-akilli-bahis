import { ADD_LIG_ITEM_TO_COLLECTION, ADD_POPULAR_ODD_TO_COLLECTION, ADD_TEASER_ITEM_TO_COLLECTION, SELECT_SPORT_MENU, SET_TIP_COLLECTION_MODAL_STATUS } from "./types"

export const addTipsToCollection = (dispatch, data) => {
    dispatch({type: "ADD_TIPS_TO_COLLECTIONS", payload: data})
}

export const addPopularOddToCollection = (dispatch, data) => {
    dispatch({type: ADD_POPULAR_ODD_TO_COLLECTION, payload: data})
}

export const addLigItemToCollection = (dispatch, data) => {
    dispatch({type: ADD_LIG_ITEM_TO_COLLECTION, payload: data})
}

export const setSportMenu = (dispatch, menu) => {
    dispatch({type: SELECT_SPORT_MENU, payload: menu})
}

export const addTeaserItemToCollection = (dispatch, data) => {
    dispatch({type: ADD_TEASER_ITEM_TO_COLLECTION, payload: data})
}

export const setTipCollectionModalStatus = (dispatch, status) => {
    dispatch({type: SET_TIP_COLLECTION_MODAL_STATUS, payload: status})
}