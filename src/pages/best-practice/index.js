import React, { PureComponent, Component } from "react";
import PropTypes from "prop-types";
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
  }

  render() {
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
    return true;
  }

  changeTitle = () => {
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

class Shape extends Component {
  static propTypes = {
    style: PropTypes.exact({
      backgroundColor: PropTypes.string,
      width: PropTypes.string,
    }),
    basic: PropTypes.oneOf(["a", "b", "c"])
  }

  render () {
    let { style } = this.props;
    return (
      <div className="shape-block" style={style}>
      </div>
    );
  }
}

class BestPractice extends PureComponent {
  render() {
    return (
      <div className="parent">
        <div>I am parent</div>
        <Child />
        <Card />
        <Shape basic="a"/>
      </div>
    );
  }
}

export default BestPractice;

