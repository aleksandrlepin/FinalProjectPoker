import * as types from '../constants/actionTypes';

// Actions here

export const someAction = (payload) => ({type: types.SOME_ACTION, payload});
export const DBtoStore = (payload) => ({type: types.LOAD_DB_TO_STORE, payload});
export const changeCurrentQuestion = (payload) => ({type: types.CHANGE_CURRENT_QUESTION, payload});
export const gameBar = (payload) => ({type: types.CHECK_CURRENT_QUESTION, payload});
export const addPlayer = (payload) => ({type: types.ADD_PLAYER, payload});
export const userAuthorization = (payload) => ({type: types.USER_AUTHORIZATION, payload});
export const updateStore = (payload) => ({type: types.UPDATE_STORE, payload});
export const changeAverage = (payload) => ({type: types.CHANGE_AVERAGE, payload});
export const addQuestion = (payload) => ({type: types.ADD_QUESTION, payload});


export const resetCards = (payload) => ({type: types.RESET_CARDS, payload});
export const flipCards = (payload) => ({type: types.FLIP_CARDS, payload});
export const saveAnswer = (payload) => ({type: types.SAVE_ANSWER, payload});
