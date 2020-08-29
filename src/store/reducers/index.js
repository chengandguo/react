import { combineReducers } from "redux";
import login from "./login.js";
import counter from "./counter.js";
import thunk from "./thunk.js";


export default combineReducers(
  {
    login,
    counter,
    thunk,
  }
);
