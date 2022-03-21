/*
  svg demo
*/

import React from "react";
import "./index.scss";


class SvgDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      y: 0,
    }
  }

  handleChange = e => {
    console.log(e.target.value)
    this.setState({
      y: e.target.value,
    });
  }

  renderSvg () {
    return (
      <svg width="400" height="400" style={{backgroundColor: "#f1f1f1"}}>
        <defs>
          <path id="sine" d="M 100 200 Q 150 50,200 200 T 300 200"/>
        </defs>

        <text style={{letterSpacing: 4}}>
          <textPath xlinkHref="#sine">
            Hello world, and cherish your time, never waste any time of it.
          </textPath>
        </text>
      </svg>
    );
  }

  render () {
    const { y } = this.state;
    return <div className="container">
      {this.renderSvg()}
      <div>
          <input type="range" id="position" min="0" max="50" 
            onChange={this.handleChange}/>
          <label htmlFor="position"> y position:  {y}</label>
        </div>
    </div>
  }
}

export default SvgDemo;