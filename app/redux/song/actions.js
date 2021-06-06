import {score} from './types';

export const new_game = () => async (dispatch) => {
  dispatch({type: score.NEW_GAME});
};

export const add_score = () => async (dispatch) => {
  dispatch({type: score.ADD_SCORE});
};

export const high_score = () => async (dispatch) => {
  dispatch({type: score.HIGH_SCORE});
};

export const fetch_score = (payload) => async (dispatch) => {
  dispatch({type: score.FETCH_SCORE, payload});
};
