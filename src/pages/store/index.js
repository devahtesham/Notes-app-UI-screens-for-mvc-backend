import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import CombineReducers from "./Reducers/CombineReducers";

const store = createStore(CombineReducers,{},applyMiddleware(thunk))
export default store