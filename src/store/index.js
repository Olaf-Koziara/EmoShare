import { createStore, applyMiddleware } from "redux";
import reducer from "../reducers";
import thunk from "redux-thunk";
export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
