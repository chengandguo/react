import React from 'react';
import './App.scss';

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import Home from "./pages/home/index.js";
import About from "./pages/about/index.js";
import Center from "./pages/center/index.js";
import Todos from "./pages/todos/index.js";
import Refs from "./pages/refs/index.js";
import Thunk  from "./pages/thunk/index.js";

export default function () {
  return (<Router>
    <Route path="/" exact>
      <Home name="Meng cheng"/>
    </Route>
    <Route path="/about">
      <About/>
    </Route>
    <Route path="/center">
      <Center/>
    </Route>
    <Route exact path="/todos">
      <Todos/>
    </Route>
    <Route exact path="/refs">
      <Refs/>
    </Route>
    <Route exact path="/thunk">
      <Thunk/>
    </Route>
  </Router>);
}
