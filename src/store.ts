import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import boards from "./boards/boardReducer";
import cards from "./cards/cardReducer";
import lists from "./lists/listReducer";

const rootReducer = combineReducers({ lists, cards, boards });

export type ApplicationState = ReturnType<typeof store.getState>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
