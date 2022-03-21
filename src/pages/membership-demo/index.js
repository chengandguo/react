// PIXI demo

import React from "react";
import "./index.scss";

const HEIGHT = 8;
class ConfettiDemo extends React.Component {
  constructor(props) {
    super(props);
    this.boxRef = React.createRef();
    this.state = {
      style: {
      }
    }
    this.rotationSpeed = 0.2;
    this.ySpeed = 3;
    this.xSpeed = 1;
    this.rotation = 0;
    this.y = 0;
    this.x = 0;
    // this.rotationSpeed = 15;
    // this.ySpeed = 3;
    // this.xSpeed = 1;
    // this.rotation = 0;
    // this.y = 0;
    // this.x = 0;
  }

  componentDidMount () {
    // this.loop();
  }

  loop1() {
    this.rotation += this.rotationSpeed;
    this.y += this.ySpeed;
    this.x += this.xSpeed;
    this.setState({
      style: {
        transform: `rotateX(${this.rotation}deg) rotate(20deg)`,
        top: `${this.y}px`,
        left: `${this.x}px`,
      }
    });
    requestAnimationFrame(() => {
      this.loop();
    })
  }

  loop () {
    this.rotation += this.rotationSpeed;
    this.y += this.ySpeed;
    this.x += this.xSpeed;
    this.setState({
      style: {
        // transform: `rotate(20deg)`,
        height: `${HEIGHT * Math.abs(Math.sin(this.rotation))}px`,
        transform: `translateY(${(HEIGHT - HEIGHT * Math.abs(Math.sin(this.rotation))) / 2}px) rotate(100deg)`,
        top: `${this.y}px`,
        left: `${this.x}px`,
      }
    });
    requestAnimationFrame(() => {
      this.loop();
    })
  }

  render () {
    const { style } = this.state;
    return <div className="confetti-box">
      <div className="my-box" ref={this.boxRef} style={ style }>
        <div></div>
        {/* <div></div> */}
      </div>
    </div>
  }
}

export default ConfettiDemo;