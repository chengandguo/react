import React from "react";
import "./index.scss";


class Rect {
  constructor (options) {
    const { x, y, ctx } = options;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
  }

  draw () {
    this.ctx.fillStyle = "blue"
    this.ctx.fillRect(
      this.x, 
      this.y, 
      10,
      10,
    );
  }
}


class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.container = {
      width: 0,
      height: 0
    }
  }

  componentDidMount () {
    this.initCanvas();
    this.build()
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
    const a = 10;
    const b = 10;
    const count = 20;
    let i = 0;
    const loop = () => {
      const angle = Math.PI * 4 / count * i;
      const x = (a + b * angle) * Math.cos(angle);
      const y = (a + b * angle) * Math.sin(angle);
      const options = {
        x,
        y,
        ctx: this.ctx,
      }
      const rect = new Rect(options);
      this.clearCanvas();
      rect.draw();
      i += 0.3;
      window.requestAnimationFrame(loop);
    }
    loop();
  }

  build1 () {
    const a = 40;
    const b = 20;
    const count = 20;
    for(let i=0; i<count; ++i) {
      const angle = Math.PI * 4/ count * i;
      const x = (a + b * angle) * Math.cos(angle);
      const y = (a + b * angle) * Math.sin(angle);
      const options = {
        x,
        y,
        ctx: this.ctx,
      }
      const rect = new Rect(options);
      rect.draw();
    }
  }

  render () {
    return <div className="sphere-container" ref={elem => this.containerRef=elem}>
      <canvas ref={elem => this.canvasRef=elem}></canvas>
    </div>
  }
}

export default Demo;
