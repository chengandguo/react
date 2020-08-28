import React from 'react';
import './App.scss';

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

// import { withRouter } from "react-router";

import Home from "./pages/home/index.js";
import About from "./pages/about/index.js";
import Center from "./pages/center/index.js";
import ReduxActionsPractice from "./pages/redux-actions-practice/index.js";
import Refs from "./pages/refs/index.js";
import RenderProps from "./pages/render-props/index.js";
import PropTypesPractice from "./pages/prop-types-practice/index.js";
import SliderPractice from "./pages/slider-practice/index.js";
import BrotherCommunication from "./pages/brother-communication/index.js";
import TransitionPractice from "./pages/transition-practice/index.js";
import BestPractice from "./pages/best-practice/index.js";


export default function () {
  return (<Router>
    <Route path="/" exact>
      <Home name="Meng cheng" />
    </Route>
    <Route path="/about">
      <About />
    </Route>
    <Route path="/center">
      <Center />
    </Route>
    <Route path="/reduxActionsPractice">
      <ReduxActionsPractice />
    </Route>
    <Route path="/refs">
      <Refs />
    </Route>
    <Route path="/renderProps">
      <RenderProps />
    </Route>
    <Route path="/propTypesPractice">
      <PropTypesPractice />
    </Route>
    <Route path="/sliderPractice">
      <SliderPractice />
    </Route>
    <Route path="/brotherCommunication">
      <BrotherCommunication />
    </Route>
    <Route path="/transitionPractice">
      <TransitionPractice />
    </Route>
    <Route path="/bestPractice">
      <BestPractice />
    </Route>
  </Router>);
}