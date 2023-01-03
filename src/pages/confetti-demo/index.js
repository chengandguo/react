

import React from "react";
import "./index.scss";


const COLOR_LIST = ["#2196f3", "#e91e63", "#ff5722", "#ff9800", "#009688"];

/*
  let confetti = new Confetti ({
    container,
    ratio: 2,  // default is 2 
    quantity: 100,
  });

  confetti.play();
  confetti.destroy();
*/

const PERSPECTIVE = 4000;

class Confetti {
  constructor(props) {
    this.container = props.container || document.createElement("div");
    this.container.className = "confetti-container";
    this.canvas = document.createElement("canvas");
    this.ratio = props.ratio || 2;
    this.ctx = this.canvas.getContext("2d");
    this.container.appendChild(this.canvas);
    if(!props.container) {
      document.body.appendChild(this.container);
    }
    this.canvas.width = this.container.clientWidth * this.ratio;
    this.canvas.height = this.container.clientHeight * this.ratio;
    this.quantity = props.quantity || 100;
    this.animationID = null;
    this.isPlaying = false;
    this.build();
  }

  play () {
    if(!this.isPlaying) {
      this.render();
      this.container.style = "display: block;"
      this.isPlaying = true;
    }
  }

  pause () {
    this.isPlaying = false;
    this.animationID && cancelAnimationFrame(this.animationID)
  }

  destroy () {
    this.pause();
    this.isPlaying = false;
    this.container.style = "display: none;"
  }

  build () {
    this.list = [];
    const COLOR_LENGTH = COLOR_LIST.length;
    for(let i=0; i<this.quantity; ++i) {
      const initialX = this.canvas.width * Math.random();
      const initialY = -Math.random() * 100 - 50;
      const initialZ = PERSPECTIVE  - i * (PERSPECTIVE / this.quantity);
      const initialVx = Math.random() * 2 - 2;
      const initialVy = 5 + 5 * Math.random();
      const item = {
        count: 0,
        width: 20 + 20 / 100 * i * Math.random(),
        height: 10 + 10 / 100 * i * Math.random(),
        initialX,
        initialY,
        x: initialX,
        y: initialY,
        rotation: 180 * Math.random(), 
        ay: 0.005,
        ax: 0,
        initialVx,
        initialVy, 
        initialZ,
        vx: initialVx,
        vy: initialVy,
        vr: 0.05 + Math.random() * 0.1,
        amplitude: 10 + Math.random() * 60,
        period: 1 / (4 + Math.random() * 5),
        fillStyle: COLOR_LIST[i % COLOR_LENGTH],
      }

      this.list.push(item);
    }

  }

  render () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for(let rect of this.list) {
      this.ctx.save();
      this.ctx.globalAlpha = 1 - rect.initialZ / PERSPECTIVE;
      this.ctx.fillStyle = rect.fillStyle;
      this.ctx.translate(rect.x, rect.y);
      this.ctx.rotate(rect.rotation * Math.PI / 180);
      rect.vy += rect.ay;
      if(rect.vx > 0) {
        rect.vx += rect.ax;
      } else {
        rect.vx = 0.1;
      }
      rect.x += rect.vx;
      rect.y += rect.vy;
      rect.count += rect.vr;
      this.ctx.fillRect(rect.x + Math.sin(rect.period * rect.count) * rect.amplitude,
        (rect.height * ( 1- Math.abs(Math.sin(rect.count)))) / 2, 
        rect.width, 
        rect.height * Math.abs(Math.sin(rect.count)));
      if(rect.y > this.canvas.height) {
        rect.x = rect.initialX;
        rect.y = rect.initialY;
        rect.vx = rect.initialVx;
        rect.vy = rect.initialVy;
        rect.count = 0;
      }
      this.ctx.restore();
    }

    this.animationID = requestAnimationFrame(() => {
      this.render();
    });
  }
}

class ConfettiDemo extends React.Component {
  constructor(props) {
    super(props);
    this.confettiWrapperRef = React.createRef();
  }

  componentDidMount () {
    this.confetti = new Confetti({
      container: this.confettiWrapperRef.current,
      ratio: 2,
      quantity: 300,
    });
    this.confetti.play();
  }

  handlePlay = () => {
    this.confetti.play();
  }

  handlePause = () => {
    this.confetti.pause();
  }

  handleDestroy = () => {
    this.confetti.destroy();
  }

  render () {
    return <div className="confetti-box">
      <div className="confetti-btn-list">
        <div className="confetti-btn-item" onClick={this.handlePlay}>play</div>
        <div className="confetti-btn-item" onClick={this.handlePause}>pause</div>
        <div className="confetti-btn-item" onClick={this.handleDestroy}>destroy</div>
      </div>

      <div className="confetti-wrapper" ref={this.confettiWrapperRef}>

      </div>
    </div>
  }
}

export default ConfettiDemo;