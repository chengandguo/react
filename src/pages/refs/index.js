import React from "react";
import "./index.scss";


class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.content,
    }
  }

  componentDidMount () {
    console.log("component did mount");
  }

  // shouldComponentUpdate (nextProps) {
  //   if(nextProps.content === this.state.content) {
  //     return false;
  //   }

  //   return true;
  // }

  componentWillReceiveProps (nextProps) {
    console.log("nextProps: ", nextProps)
    this.setState({
      content: nextProps.content,
    });
  }

  render () {
    const { content } = this.state;
    console.log("render content: ", content);
    return <div>{content}</div>
  }
}

class RefPractice extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      count: 1,
      list: [1, 2, 3, 4, 5]
    }
  }

  handleAdd = () => {
    const { count } = this.state;
    this.setState({
      count: count + 1,
      list: [1, 2, 3, 4, 5]
    });
  }

  render () {
    const { list, count } = this.state;
    return (
      <div className="container">
        {list.map((item, index) => {
          return <Child key={index} content={item}/>
        })}

        <div>count: {count}</div>
        <div onClick={this.handleAdd}>add one</div>
      </div>
    );
  }
}

export default RefPractice;
