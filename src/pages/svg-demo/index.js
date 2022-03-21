/*
  svg demo
*/

import React from "react";
import "./index.scss";


class SvgDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      c1: {   // control point 1
        x: 100,
        y: 200
      },
      c2: {   // control point 2
        x: 200, 
        y: 200,
      }
    }
  }

  handleTouchStart = e => {
    console.log("start", e.changedTouches[0]);
  }

  handleTouchMove = (name, e) => {
    const { pageX, pageY } = e.changedTouches[0];
    this.setState({
      [name]: {
        x: pageX,
        y: pageY,
      }
    });
  }

  handleTouchEnd = e => {
    console.log("end", e);
  }

  renderSvg () {
    const {c1, c2} = this.state;
    const d = `M 100 300 C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, 300 100`;
    return (
      <svg width="300" height="300" style={{backgroundColor: "#f1f1f1"}}>
        {/* <rect width="30" height="30" fill="blue"/>
        <circle cx="100" cy="100" r="100" fill="green"/> */}
        {/* <line x1="10" y1="10" x2="100" y2="100" stroke="blue" strokeWidth="10"/> */}
        {/* <polyline points="100 100 200 200 300 100" stroke="red" fill="transparent"/> */}
        {/* <polygon points="100 100 200 200 300 100" stroke="red" fill="transparent"/> */}
        {/* <path d="M 100 100 L 200 200" stroke="blue"/> */}
        {/* <path d="M 100 100 H 200" stroke="blue"/> */}
        {/* <path d="M 100 100 V 200" stroke="blue"/> */}
        {/* <path d="M 100 100 H 200 V 200 H 100 Z" stroke="blue" fill="transparent"/> */}
        {/* <path d="M 100 100 h 100 v 100 h -100 z" stroke="blue" fill="transparent"/> */}
        {/* <path d="M 100 100 L 150 200 L 50 200 Z" stroke="blue" fill="transparent"/> */}
        {/* <path d="M 100 100 C 200 100, 200 100, 200 200" stroke="blue" fill="transparent"/> */}
        <path d={d} stroke="blue" fill="transparent"/>
        <circle cx={c1.x} cy={c1.y} 
          r="10" 
          fill="red" 
          onTouchStart={() => this.handleTouchStart} 
          onTouchMove={e => this.handleTouchMove("c1", e)}
          onTouchEnd={() => this.handleTouchEnd}/>
        <circle cx={c2.x} cy={c2.y} 
          r="10" 
          fill="blue" 
          onTouchStart={() => this.handleTouchStart} 
          onTouchMove={e => this.handleTouchMove("c2", e)}
          onTouchEnd={() => this.handleTouchEnd}/>
      </svg>
    );
  }

  render () {
    return <div className="container">
      <div>svg demo</div>
      {this.renderSvg()}
      <div className="submit-btn">
        <span>Submit</span>
        <svg width="100%" height="100%" className="rect">
          <rect width="100%" height="100%" stroke="#111" strokeWidth="1" fill="transparent"/>
        </svg>
      </div>

      <div className="cancel-btn">
        cancel btn with border 1px
      </div>

      <div className="confirm-btn">
        confirm btn with pseudo element
      </div>
    </div>
  }
}

export default SvgDemo;

// 
class Fruit {
  firstName="Anhui"
  lastName="Province"
  get fullName () {
    return `${this.firstName} ${this.lastName}`;
  }
}
window.Fruit = Fruit;
window.apple = new Fruit();