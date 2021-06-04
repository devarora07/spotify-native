import {score} from './types';

const initialState = {
  highScore: 0,
  score: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case score.NEW_GAME: {
      return {...state, score: 0};
    }
    case score.ADD_SCORE: {
      return {...state, score: state.score + 1};
    }
    case score.HIGH_SCORE: {
      if (state.score > state.highScore) {
        return {...state, highScore: state.score};
      } else {
        return {...state};
      }
    }

    case score.FETCH_SCORE: {
      const {payload} = action;
      if (payload.highScore) {
        return {...state, highScore: payload.highScore};
      }
      return state;
    }
    default:
      return state;
  }
};

export default reducer;
