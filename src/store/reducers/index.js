import { combineReducers } from "redux";
import login from "./login.js";
import counter from "./counter.js";
export default combineReducers(
  {
    login,
    counter,
  }
);

