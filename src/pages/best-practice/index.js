import React, { PureComponent, Component } from "react";

import "./index.scss";


class Child extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    }
  }

  increment = () => {
    this.setState({
      count: this.state.count + 1,
    });
    console.log(this.state.count)
  }

  render() {
    console.log("child render");
    return (
      <div>
        <h1>I am child component</h1>
        <div onClick={this.increment}>increment</div>
        <div>count: {this.state.count}</div>
      </div>
    );
  }
}

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 10,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState);
    return true;
  }

  changeTitle = () => {
    console.log("change title");
    this.setState({
      title: "hello world"
    });
  }

  render() {
    return (
      <div>
        <h1 onClick={this.changeTitle}>I am card</h1>
        <div>{this.state.title}</div>
      </div>
    );
  }
}
class BestPractice extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("best practice render");
    return (
      <div className="parent">
        <div>I am parent</div>
        <Child />
        <Card />
      </div>
    );
  }
}

export default BestPractice;