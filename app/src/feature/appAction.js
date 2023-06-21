import { ADD_POPULAR_ODD_TO_COLLECTION, SELECT_SPORT_MENU } from "./types"

export const addTipsToCollection = (dispatch, data) => {
    dispatch({type: "ADD_TIPS_TO_COLLECTIONS", payload: data})
}


export const addPopularOddToCollection = (dispatch, data) => {
    dispatch({type: ADD_POPULAR_ODD_TO_COLLECTION, payload: data})
}

export const setSportMenu = (dispatch, menu) => {
    dispatch({type: SELECT_SPORT_MENU, payload: menu})
}