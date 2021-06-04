import {combineReducers} from 'redux';
import scoreReducer from './score/scoreReducer';

export default combineReducers({
  score: scoreReducer,
});
