import React from "react";
// import * as PIXI from "pixi.js";
// import lottie from "lottie-web";
import "./index.scss";
// const starsJson = require("./stars.json")
// console.log(starsJson)

class PixiDemo extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  componentDidMount () {

    // lottie.loadAnimation({
    //   container: document.querySelector(".wrapper"),
    //   renderer: "canvas",
    //   autoplay: true,
    //   animationData: starsJson
    // });
  }
  render () {
    return <div className="container">
      <div className="wrapper"></div>
    </div>
  }
}

export default PixiDemo;

// https://img.alicdn.com/imgextra/i1/O1CN01ZlapIp1HV2VREAh4j_!!6000000000762-2-tps-192-192.png

// animationData