// setup redux
import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import reducers from "./reducers/index";
import thunk from "redux-thunk";

const allStoreEnhancers = compose(applyMiddleware(thunk));
const allReducers = combineReducers(reducers);
const store = createStore(allReducers, allStoreEnhancers);
export default store;
