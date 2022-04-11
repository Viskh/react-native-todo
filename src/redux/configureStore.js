import { applyMiddleware, createStore } from "redux";
import { todosReducer } from "./features/todos";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(
  todosReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
