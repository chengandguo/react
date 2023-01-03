import React from "react";
import { Slider } from "antd-mobile";
import "./index.scss";


const list = [
  {
    x: 0,
    y: 100,   // A
    z: 0,
    type: "moveTo"
  },
  {
    x: 100,
    y: 100,   // B
    z: 0,
    type: "lineTo"

  },
  {
    x: 100,
    y: 100,  // C
    z: 100,
    type: "lineTo"
  },
  {
    x: 0,
    y: 100,   // D
    z: 100,
    type: "lineTo"
  },
  {
    x: 0,
    y: 100,   // A     top draw end
    z: 0,
    type: "lineTo"
  },

  {
    x: 0,
    y: 0,   // A1     
    z: 0,
    type: "lineTo"
  },
  {
    x: 0,
    y: 0,   // D1
    z: 100,
    type: "lineTo"
  },
  {
    x: 0,
    y: 100,   // D
    z: 100,
    type: "lineTo"
  },

  {
    x: 0,
    y: 100,  // A  left draw end
    z: 0,
    type: "lineTo"
  },

  {
    x: 0,
    y: 0,  // A1 
    z: 0,
    type: "lineTo"
  },

  {
    x: 100,
    y: 0,  // B1
    z: 0,
    type: "lineTo"
  },

  {
    x: 100,
    y: 100,  // B back end
    z: 0,
    type: "lineTo"
  },

  {
    x: 100,
    y: 0,  // B1
    z: 0,
    type: "lineTo"
  },

  {
    x: 100,
    y: 0,  // C1
    z: 100,
    type: "lineTo"
  },

  {
    x: 100,
    y: 100,  // C right end
    z: 100,
    type: "lineTo"
  },

  {
    x: 100,
    y: 0,  // C1
    z: 100,
    type: "moveTo"
  },

  {
    x: 0,
    y: 0,  // D1 front-end
    z: 100,
    type: "lineTo"
  },
];

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.container = {
      width: 0,
      height: 0
    }

    this.state = {
      camera: {
        x: 50,
        y: 50,
        z: 200,
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
    this.ctx.translate(width / 2,  height / 2)
  }

  transformTo2D (point) {
    const { camera } = this.state;
    const {
      x: cx, 
      y: cy, 
      z: cz
    } = camera;
    const { x, y, z } = point;
    const px = (x - cx) * cz / (cz - z);  // projectionX
    const py = (y - cy) * cz / (cz - z);  // projectionY
    return {
      x: px,
      y: py,
    }
  }

  rotateAroundYAxis (point, angle) {
    const {x, y, z} = point;
    point.x = x * Math.cos(angle) - z * Math.sin(angle);
    point.z = x * Math.sin(angle) + z * Math.cos(angle);
  }

  build (angle=0) {
    this.clearCanvas();
    this.ctx.beginPath();
    for(let i=0; i<list.length; ++i) {
      const point = list[i];
      this.rotateAroundYAxis(point, angle);
      const { x, y } = this.transformTo2D(point);
      if(point.type === "moveTo") {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = "blue";
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  clearCanvas () {
    const { width, height } = this.container;
    this.ctx.clearRect(-width / 2, -height / 2, width, height);
  }

  handleRotate = value => {
    const max = 1000;
    const angle = Math.PI * 2 / max * value;
    this.build(angle);
  }

  handleTouchStart = e => {

  }

  handleTouchMove = e => {

  }

  handleTouchEnd = e => {
    
  }

  renderController () {
    return (<div className="controller-item">
      <h3> Rotate around Y axis</h3>
      <Slider min={0} max={1000} onChange={this.handleRotate} />
    </div>);
  }

  render () {
    return <div className="sphere-container" ref={elem => this.containerRef=elem}>
      {this.renderController()}
      <canvas
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        ref={elem => this.canvasRef=elem}/>
    </div>
  }
}

export default Demo;
