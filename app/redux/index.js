import { combineReducers } from 'redux';
import scoreReducer from './score/scoreReducer';
import songReducer from './song/songReducer';

export default combineReducers({
    score: scoreReducer,
    song: songReducer
});
