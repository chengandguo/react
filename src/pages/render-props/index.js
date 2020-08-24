import React from "react";
import "./index.scss";

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        x: 0,
        y: 0,
      }
    }
  }

  handleMouseMove = e => {
    this.setState({
      position: {
        x: e.clientX,
        y: e.clientY,
      }
    });
  }

  render() {
    let { x, y } = this.state.position;
    return (
      <div className="container">
        <div className="playground" onMouseMove={this.handleMouseMove}></div>
        <div>output: x: {x}, y: {y}</div>
        {this.props.render(this.state.position)}
        {/* {this.props.children(this.state.position)} */}
      </div>
    );
  }
}


class Cat extends React.Component {
  render() {
    let { x, y } = this.props.position;
    return (
      <div className="cat"
        style={{ position: "absolute", left: x, top: y }}>
        Cat
      </div>
    );
  }
}


class RenderProps extends React.Component {
  render() {
    return (
      <div>
        <h1>I am render props</h1>
        <Mouse render={position => (<Cat position={position}/>)}>
        </Mouse>
      </div>
    );
  }
}


export default RenderProps;


/*
  children props
  props can also transfer a function 
  
*/