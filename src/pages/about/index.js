import React from "react";
import { connect } from "react-redux";

class About extends React.Component {
  render () {
    return (
      <div>
        <h1>I am about 11faffafaa1</h1>
        <div>count: {this.props.count}</div>
        <div onClick={ () => this.props.increment(1)}>add 1</div>
        <div onClick={ () => this.props.decrement(1)}>reduce 1</div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    count: state.counter.count,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    increment: amount => dispatch({
      type: "COUNTER/INCREMENT",
      payload: amount,
    }),
    
    decrement: amount => dispatch({
      type: "COUNTER/DECREMENT",
      payload: amount,
    }),
    
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(About);
