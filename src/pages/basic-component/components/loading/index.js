import React from "react";

// class Loading extends React.PureComponent {
class Loading extends React.Component {
  render () {
    console.log("loading render");
    return (
      <div>
        <h1>loading</h1>
        <div>{this.props.count}</div>
      </div>
    );
  }
}

export default Loading;