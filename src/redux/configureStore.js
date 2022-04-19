import { applyMiddleware, combineReducers, createStore } from "redux";
import { todosReducer } from "./features/todos";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { auth } from "./features/auth";

const combineReducer = combineReducers({ todosReducer, auth });

export const store = createStore(
  combineReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
