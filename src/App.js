import React from 'react';
import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import Home from "./pages/home/index.js";
import About from "./pages/about/index.js";
import Center from "./pages/center/index.js";


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
  </Router>);
}
