import React from "react";
import "./index.scss";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    }
  }

  increment = () => {
    let { count } = this.state;
    this.setState({
      count: count + 1,
    });
  }

  decrement = () => {
    let { count } = this.state;
    this.setState({
      count: count - 1,
    });
  }

  render () {
    return (
      <div>
        <div onClick={this.increment}>increment</div>
        <div>{this.state.count}</div>
        <div onClick={this.decrement}>decrement</div>
      </div>
    );
  }
}

class Refs extends React.Component {
  constructor (props) {
    super(props)
    this.counter = React.createRef();
  }

  add = () => {
    console.log(this.counter.current, "-----");
    this.counter.current.increment();
  }

  render () {
    console.log(this.counter.current)
    return (
      <div>
        <h1 onClick={this.add}>I can also add</h1>
        <Counter ref={this.counter}/>
      </div>
    );
  }
}


export default Refs;