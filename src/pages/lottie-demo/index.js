// lottie animation 

import React from "react";
import lottie from "lottie-web";
import animationData from "./star.json";
import "./index.scss";


class LottieDemo extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  componentDidMount () {
    this.starAnimation = lottie.loadAnimation({
      container: document.querySelector(".wrapper"),
      renderer: "svg",
      autoplay: false,
      animationData,
      loop: false,
    });
    this.initEvents();
  }

  initEvents () {
    this.starAnimation.onEnterFrame = e => {
      // console.log("enter frame")
    };

    this.starAnimation.onComplete = () => {
      // console.log("complete");
    };

    this.starAnimation.onLoopComplete = () => {
      // console.log("onLoopComplete");
    }
  }

  handlePlay = () => {
    console.log(this.starAnimation);
    this.starAnimation.play();
  }

  handleStop = () => {
    this.starAnimation.stop();
  }

  handlePause = () => {
    this.starAnimation.pause();
  }

  handleChangeSpeed = e => {
    this.starAnimation.setSpeed(e.target.value);
  }

  handleDestroy = () => {
    this.starAnimation.destroy();
  }

  render () {
    return <div className="container">
      <div className="wrapper"></div>
      <div className="operation-list">
        <div onClick={this.handlePlay}>play animation</div>
        <div onClick={this.handleStop}>stop animation</div>
        <div onClick={this.handlePause}>pause animation</div>
        <div>
          set speed: <input type="text" defaultValue={2} onChange={this.handleChangeSpeed}/>
        </div>
        <div onClick={this.handleDestroy}>
          destroy animation
        </div>
      </div>   
    </div>
  }
}

export default LottieDemo;