import Reducer from "./formRedux/formReducer"
import logger from 'redux-logger'
import {createStore, applyMiddleware, compose} from 'redux';

const store =createStore(Reducer,compose(applyMiddleware(logger),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
export default store;