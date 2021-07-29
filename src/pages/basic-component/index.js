import React from "react";
import Loading from "./components/loading";
import "./index.scss";

class BasicComponent extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      count: 1,
    }
  }

  changeValues = () => {
    this.setState({
      count: this.state.count + 1,
    });
  }

  render () {
    console.log("render")
    return (
      <div>
        <h1>basic component test</h1>
        <div onClick={this.changeValues}>change values</div>
        <Loading count={this.state.count}/>
      </div>
    );
  }
}

export default BasicComponent;

