import React from "react";
import { Slider } from "antd-mobile";
import "./index.scss";


class Dot {
  constructor ({ ctx, camera, position={}, options={}}) {
    this.x = position.x;
    this.y = position.y;
    this.z = position.z;
    this.width = 200;
    this.height = 100;
    this.ctx = ctx;
    this.camera = camera;
    this.xProjected = 0;
    this.yProjected = 0;
    this.scaleProjected = 0;
    this.options = options;
  }

  project () {
    const { perspective, projectionX, projectionY } = this.camera;
    this.scaleProjected = this.z / (this.z + perspective);
    this.xProjected = (this.x + this.width * (1 - this.scaleProjected) / 2) + projectionX;
    this.yProjected = (this.y + this.height * (1- this.scaleProjected) / 2) + projectionY;
  }

  draw () {
    this.project();
    // this.ctx.globalAlpha = Math.abs(this.z / (this.z +  this.camera.perspective));
    console.log(this.xProjected, 
      this.yProjected, 
      this.width * this.scaleProjected, 
      this.height * this.scaleProjected)
    this.ctx.fillRect(this.xProjected, 
      this.yProjected, 
      this.width * this.scaleProjected, 
      this.height * this.scaleProjected);
  }
}


class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.container = {
      width: 0,
      height: 0
    }

    this.state = {
      camera: {
        perspective: 1,
        projectionX: 0,
        projectionY: 0,
      },
      position: {
        x: -100,
        y: -50,
        z: 10,
      }
    }
  }

  componentDidMount () {
    this.initCanvas();
    this.build();
  }

  initCanvas () {
    const width = this.containerRef.clientWidth;
    const height = this.containerRef.clientHeight;
    this.container = {
      width,
      height,
    };
    this.canvasRef.width = width * 2;
    this.canvasRef.height = height * 2; 
    this.ctx = this.canvasRef.getContext("2d");
    this.ctx.scale(2, 2);
    this.ctx.translate(width / 2, height / 2);
  }

  clearCanvas () {
    const { width, height } = this.container;
    this.ctx.clearRect(-width / 2, -height / 2, width, height);
  }

  build () {
    const { camera, position } = this.state;
    const dot = new Dot({ctx: this.ctx, camera, position });
    this.clearCanvas();
    dot.draw();
  }

  setCamera = (key, value) => {
    const { camera } = this.state;
    this.setState({
      camera: {
        ...camera,
        [key]: value,
      }
    });
    this.build();
  }

  setPosition = (key, value) => {
    const { position } = this.state;
    this.setState({
      position: {
        ...position,
        [key]: value,
      }
    });
    this.build();
  }

  renderController () {
    const { camera, position } = this.state;
    const { perspective, projectionX, projectionY } = camera;
    const { z } = position;
    return (
      <div className="controller">
        <div className="controller-item">
          <h3>Perspective: {perspective} </h3>
          <Slider min={0} max={300} onChange={(value) => this.setCamera("perspective", value)} />
        </div>

        <div className="controller-item">
          <h3>ProjectX: {projectionX}</h3>
          <Slider min={0} max={200} onChange={(value) => this.setCamera("projectionX", value)} />
        </div>

        <div className="controller-item">
          <h3>ProjectY: {projectionY}</h3>
          <Slider min={0} max={200} onChange={(value) => this.setCamera("projectionY", value)} />
        </div>

        <div className="controller-item">
          <h3>z: {z}</h3>
          <Slider min={0} max={200} onChange={(value) => this.setPosition("z", value)} />
        </div>
      </div>
    );
  }

  render () {
    return <div className="sphere-container" ref={elem => this.containerRef=elem}>
      {this.renderController()}
      <canvas ref={elem => this.canvasRef=elem}></canvas>
    </div>
  }
}

export default Demo;
