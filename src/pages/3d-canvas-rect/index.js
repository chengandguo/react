import React from "react";
import "./index.scss";


class Rect {
  constructor (options) {
    const { ctx, camera, x, y, z, width=40, height=20, scale=1, rotation=0, color } = options;
    this.ctx = ctx;
    this.camera = camera;
    this.x = x;
    this.y = y;
    this.z = z;
    this.width = width;
    this.height = height;
    this.scale = scale;
    this.rotation = rotation;
    this.color = color;
    this.xProjected = 0;
    this.yProjected = 0;
    this.scaleProjected = 0;
  }

  project () {
    const { perspective, projectionX, projectionY } = this.camera;
    this.scaleProjected = perspective / (this.z + perspective);
    this.xProjected = (this.x + this.width * (1 - this.scaleProjected) / 2) + projectionX;
    this.yProjected = (this.y + this.height * (1- this.scaleProjected) / 2) + projectionY;
  }

  draw () {
    this.project();
    this.ctx.save();
    this.ctx.globalAlpha = Math.abs(1 - this.z / this.camera.perspective);
    this.ctx.fillStyle = this.color;
    this.ctx.rotate(this.rotation);
    this.ctx.scale(this.scale, this.scale);
    this.ctx.fillRect(
      this.xProjected, 
      this.yProjected, 
      this.width * this.scaleProjected, 
      this.height * this.scaleProjected
    );
    this.ctx.restore();
  }
}

const RECT_COLORS = ['#B833FF', '#FC7878', '#FFC233', '#FC78D8', '#6EF1DC'];


class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.container = {
      width: 0,
      height: 0
    }

    this.state = {
      camera: {
        perspective: 400,
        projectionX: 0,
        projectionY: 0,
      },

      transform: "",
    }
  }

  componentDidMount () {
    // this.initCanvas();
    // this.build();
    this.animateBox();
  }

  animateBox () {
    let count = 0;
    // const skewX = 360;
    let flag = 1;
    const loop = () => {
      count += flag * 6;
      this.setState({
        // transform: `skew(${count}deg)`,
        // transform: `skew(19deg, 28deg) rotate3D(1, 1, 1, ${count}deg)`,
        // transform: `rotate3D(1, 1, 1, ${count}deg)`,
      });
      // if(count >= skewX || count <= 0) {
      //   flag *= -1;
      // }
      window.requestAnimationFrame(loop.bind(this));
    }
    loop();
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
    this.clearCanvas();
    const { camera } = this.state;
    const { width, height } = this.container;
    const count = 200;
    for(let i=0; i<count; ++i) {
      const x = this.generateRandomNumber(-width / 2, width / 2);
      const y = this.generateRandomNumber(-height / 2, height / 2);
      const z = camera.perspective - i * 2;
      const rotation = this.generateRandomNumber(0, Math.PI);
      const color = RECT_COLORS[i % RECT_COLORS.length]
      const rect = new Rect({ctx: this.ctx, camera, x, y, z, color, rotation});
      rect.draw();
    }
  }

  generateRandomNumber(min, max) {
    if (typeof min === 'number' && typeof max === 'undefined') {
      return min;
    }

    if (Array.isArray(min) && min.length === 2) {
      max = min[1];
      min = min[0];
    }
    return Math.random() * (max - min) + min;
  }

  renderRect () {
    const { transform } = this.state;
    return <div className="box" style={{transform}}>
      I am box
    </div>;
  }

  render () {
    return <div className="sphere-container" ref={elem => this.containerRef=elem}>
      {this.renderRect()}
      {/* <canvas ref={elem => this.canvasRef=elem}></canvas> */}
    </div>
  }
}

export default Demo;
