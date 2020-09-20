import React, { Component } from "react";
import PropTypes from "prop-types";


class Card extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    isShowDate: PropTypes.bool,
    type: PropTypes.oneOf(["warm", "error"])
  }

  static defaultProps = {
    title: "I am default title",
    type: "warm"
  }

  render() {
    return (
      <div className="warm-notice"
        style={{ border: `1px solid ${this.props.type === "warm" ? "green" : "red"}` }}>
        <h1>{this.props.title}</h1>
        {this.props.isShowDate && <div>{new Date().toLocaleDateString()}</div>}
        <p>I am content</p>
      </div>
    );
  }
}

class Comment extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.name} {this.props.date}</h1>
        <div>{this.props.comment}</div>
      </div>
    );
  }
}


class SiteList extends Component {
  render() {
    let list = [
      <div key="a">a</div>,
      <div key="b">b</div>
    ]
    return (<div>{list}</div>);
  }
}

class PropTypesPractice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDate: false,
      fruitList: ["apple", "banana", "pear"],
      list: ["a"],
    }
  }

  toggle = () => {
    this.setState({
      isShowDate: !this.state.isShowDate,
    });
  }

  addFruit = () => {
    this.setState({
      fruitList: this.state.fruitList,
    });
  }

  render() {
    let data = {
      name: "Meng Cheng",
      comment: "practice more and more",
      date: "2020-8-19"
    }

    return (
      <div>
        <div onClick={this.toggle}>toggle isShowDate</div>
        <Card isShowDate={this.state.isShowDate} />
        {this.state.fruitList.map((item, index) =>
          (<div key={index}>{item}</div>))}
        <div onClick={this.addFruit}>add one fruit</div>
        <Comment {...data} />
        <ul>
          <SiteList />
        </ul>
      </div>
    );
  }
}


export default PropTypesPractice;


