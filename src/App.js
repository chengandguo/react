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
import Todos from "./pages/todos/index.js";
import Thunk  from "./pages/thunk/index.js";
import ReduxActionsPractice from "./pages/redux-actions-practice/index.js";
import RenderProps from "./pages/render-props/index.js";
import PropTypesPractice from "./pages/prop-types-practice/index.js";
import SliderPractice from "./pages/slider-practice/index.js";
import BrotherCommunication from "./pages/brother-communication/index.js";
import TransitionPractice from "./pages/transition-practice/index.js";
import BestPractice from "./pages/best-practice/index.js";
import BasicComponent from './pages/basic-component/index.js';
import CheckboxDemo from './pages/checkbox-demo/index.js';
import ContextDemo from './pages/context-demo/index.js';
import Express from './pages/express/index.js';
import Address from './pages/express/components/address/index.js';
import Context from "./pages/context/index.js";
import DebugTool from "./pages/debug-tool/index.js";
import PopupDemo from "./pages/popup-demo/index.js";
import Refs from "./pages/refs/index.js";
import QueryStringDemo from "./pages/query-string-demo/index.js";
import NoticeDemo from "./pages/notice-demo/index.js";
import CarouselDemo from "./pages/carousel-demo/index.js";
import NextDemo from "./pages/next-demo/index.js";


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
    <Route exact path="/todos">
      <Todos/>
    </Route>
    <Route exact path="/refs">
      <Refs/>
    </Route>
    <Route exact path="/thunk">
      <Thunk/>
    </Route>
    <Route exact path="/basicComponent">
      <BasicComponent/>
    </Route>
    <Route exact path="/checkboxDemo">
      <CheckboxDemo/>
    </Route>
    <Route exact path="/contextDemo">
      <ContextDemo/>
    </Route>
    <Route exact path="/express">
      <Express/>
    </Route>
    <Route exact path="/address">
      <Address/>
    </Route>
    <Route exact path="/context">
      <Context/>
    </Route>
    <Route exact path="/debugTool">
      <DebugTool/>
    </Route>
    <Route exact path="/popupDemo">
      <PopupDemo/>
    </Route>
    <Route exact path="/queryStringDemo">
      <QueryStringDemo/>
    </Route>
    <Route exact path="/noticeDemo">
      <NoticeDemo/>
    </Route>
    <Route exact path="/carouselDemo">
      <CarouselDemo/>
    </Route>
    <Route exact path="/nextDemo">
      <NextDemo/>
    </Route>
  </Router>);
}