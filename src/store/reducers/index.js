import { combineReducers } from "redux";
import login from "./login.js";
import counter from "./counter.js";
import address from "./address.js";

export default combineReducers(
  {
    login,
    counter,
    address,
  }
);
