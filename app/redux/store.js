import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '.';
import thunk from 'redux-thunk';

// import {composeWithDevTools} from 'redux-devtools-extension';

const enhancers = compose(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancers);

export default store;
