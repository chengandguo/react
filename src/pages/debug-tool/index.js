import React from "react";
import "./index.scss";


class DebugTool extends React.PureComponent {
  handleClick = () => {
    let a = 10,
      b = 20;
    let c = a + b + this.getCurrentValue();
    console.log(c);
  }

  getCurrentValue () {
    return 10;
  }

  render () {
    return (
      <div className="debug-tool">
        <h1>debug tool</h1>
        <div onClick={this.handleClick}>add 1</div>
      </div>
    );
  }
}

export default DebugTool;

