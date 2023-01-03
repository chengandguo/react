import React from 'react';
import './App.scss';

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import Home from "./pages/home/index.js";
import FontSize from "./pages/font-size/index.js";
import About from "./pages/about/index.js";
import PixiDemo from "./pages/pixi-demo/index.js";
import LottieDemo from "./pages/lottie-demo/index.js";
import MembershipDemo from "./pages/membership-demo/index.js";
import LottieSnowDemo from "./pages/lottie-snow-demo/index.js";
import SvgDemo from "./pages/svg-demo/index.js";
import SvgPathDemo from "./pages/svg-path-demo/index.js";
import SvgMatrixDemo from "./pages/svg-matrix-demo/index.js";
import BoxShadowDemo from "./pages/box-shadow-demo/index.js";
import ConfettiDemo from "./pages/confetti-demo/index.js";
import ThreeDCanvas from "./pages/3d-canvas/index.js";
import ThreeDCanvasRect from "./pages/3d-canvas-rect/index.js";
import ThreeDCanvasCube from "./pages/3d-canvas-cube/index.js";
import BodySwiperDemo from "./pages/body-swiper-demo/index.js";
import TransitionDemo from "./pages/transition-demo/index.js";
import CanvasSlider from "./pages/canvas-slider/index.js";

import Center from "./pages/center/index.js";
// import Todos from "./pages/todos/index.js";
// import Thunk  from "./pages/thunk/index.js";
import ReduxActionsPractice from "./pages/redux-actions-practice/index.js";
// import RenderProps from "./pages/render-props/index.js";
// import PropTypesPractice from "./pages/prop-types-practice/index.js";
import SliderPractice from "./pages/slider-practice/index.js";
// import BrotherCommunication from "./pages/brother-communication/index.js";
// import TransitionPractice from "./pages/transition-practice/index.js";
// import BestPractice from "./pages/best-practice/index.js";
// import BasicComponent from './pages/basic-component/index.js';
// import CheckboxDemo from './pages/checkbox-demo/index.js';
// import ContextDemo from './pages/context-demo/index.js';
// import Express from './pages/express/index.js';
// import Address from './pages/express/components/address/index.js';
// import Context from "./pages/context/index.js";
// import DebugTool from "./pages/debug-tool/index.js";
// import PopupDemo from "./pages/popup-demo/index.js";
import Refs from "./pages/refs/index.js";
// import QueryStringDemo from "./pages/query-string-demo/index.js";
import NoticeDemo from "./pages/notice-demo/index.js";
import CarouselDemo from "./pages/carousel-demo/index.js";
// import NextDemo from "./pages/next-demo/index.js";
import TabDemo from "./pages/tab-demo/index.js";
import SpringDemo from "./pages/spring-demo/index.js";
import GestureDemo from "./pages/gesture-demo/index.js";

export default function () {
  return (<Router>
    <Route path="/" exact>
      <Home name="Meng cheng" />
    </Route>
    <Route path="/center">
      <Center />
    </Route>
    <Route path="/font-size" exact>
      <FontSize />
    </Route>
    <Route path="/about" exact>
      <About />
    </Route>
    <Route path="/pixi-demo" exact>
      <PixiDemo />
    </Route>
    <Route path="/lottie-demo" exact>
      <LottieDemo />
    </Route>
    <Route path="/svg-demo" exact>
      <SvgDemo />
    </Route>
    <Route path="/svg-path-demo" exact>
      <SvgPathDemo />
    </Route>
    <Route path="/svg-matrix-demo" exact>
      <SvgMatrixDemo />
    </Route>
    <Route path="/box-shadow-demo" exact>
      <BoxShadowDemo />
    </Route>
    <Route path="/lottie-snow-demo" exact>
      <LottieSnowDemo />
    </Route>
    <Route path="/confetti-demo" exact>
      <ConfettiDemo />
    </Route>
    <Route exact path="/refs">
      <Refs />
    </Route>
    <Route exact path="/membership-demo">
      <MembershipDemo />
    </Route>
    <Route path="/reduxActionsPractice">
      <ReduxActionsPractice />
    </Route>
    <Route exact path="/tabDemo">
      <TabDemo />
    </Route>
    <Route path="/sliderPractice">
      <SliderPractice />
    </Route>
    <Route path="/carouselDemo">
      <CarouselDemo />
    </Route>
    <Route path="/3d-canvas">
      <ThreeDCanvas/>
    </Route>
    <Route path="/3d-canvas-rect">
      <ThreeDCanvasRect/>
    </Route>
    <Route path="/3d-canvas-cube">
      <ThreeDCanvasCube/>
    </Route>
    <Route path="/body-swiper-demo">
      <BodySwiperDemo/>
    </Route>
    <Route exact path="/noticeDemo">
      <NoticeDemo/>
    </Route>
    <Route exact path="/transitionDemo">
      <TransitionDemo/>
    </Route>
    <Route exact path="/canvasSlider">
      <CanvasSlider/>
    </Route>
    <Route exact path="/springDemo">
      <SpringDemo/>
    </Route>
    <Route exact path="/gestureDemo">
      <GestureDemo/>
    </Route>
  </Router>);
}

// export default function () {
//   return (<Router>
//     <Route path="/" exact>
//       <Home name="Meng cheng" />
//     </Route>
//     <Route path="/about">
//       <About />
//     </Route>
    // <Route path="/center">
    //   <Center />
    // </Route>
//     <Route path="/reduxActionsPractice">
//       <ReduxActionsPractice />
//     </Route>
//     <Route path="/refs">
//       <Refs />
//     </Route>
//     <Route path="/renderProps">
//       <RenderProps />
//     </Route>
//     <Route path="/propTypesPractice">
//       <PropTypesPractice />
//     </Route>
    // <Route path="/sliderPractice">
    //   <SliderPractice />
    // </Route>
//     <Route path="/brotherCommunication">
//       <BrotherCommunication />
//     </Route>
//     <Route path="/transitionPractice">
//       <TransitionPractice />
//     </Route>
//     <Route path="/bestPractice">
//       <BestPractice />
//     </Route>
//     <Route exact path="/todos">
//       <Todos/>
//     </Route>
    // <Route exact path="/refs">
    //   <Refs/>
    // </Route>
//     <Route exact path="/thunk">
//       <Thunk/>
//     </Route>
//     <Route exact path="/basicComponent">
//       <BasicComponent/>
//     </Route>
//     <Route exact path="/checkboxDemo">
//       <CheckboxDemo/>
//     </Route>
//     <Route exact path="/contextDemo">
//       <ContextDemo/>
//     </Route>
//     <Route exact path="/express">
//       <Express/>
//     </Route>
//     <Route exact path="/address">
//       <Address/>
//     </Route>
//     <Route exact path="/context">
//       <Context/>
//     </Route>
//     <Route exact path="/debugTool">
//       <DebugTool/>
//     </Route>
//     <Route exact path="/popupDemo">
//       <PopupDemo/>
//     </Route>
//     <Route exact path="/queryStringDemo">
//       <QueryStringDemo/>
//     </Route>
//     <Route exact path="/noticeDemo">
//       <NoticeDemo/>
//     </Route>
//     <Route exact path="/carouselDemo">
//       <CarouselDemo/>
//     </Route>
//     <Route exact path="/nextDemo">
//       <NextDemo/>
//     </Route>
//     <Route exact path="/tabDemo">
//       <TabDemo/>
//     </Route>
//   </Router>);
// }