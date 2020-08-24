import React from "react";
import { connect } from "react-redux";
import {increment, decrement} from "../../store/reducers/counter.js";
import { withRouter } from "react-router-dom";

class About extends React.Component {
  constructor (props) {
    super(props);
    console.log("about", this.props, this.props.location.query);
  }

  render () {
    let {increment, decrement} = this.props;
    return (
      <div>
        <h1>I am about 11faffafaa1</h1>
        <div>count: {this.props.count}</div>
        <div onClick={ () => increment(1)}>add 1</div>
        <div onClick={ () => increment(1)}>add 1</div>
        <div onClick={ () => decrement(1)}>reduce 1</div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    count: state.counter.count,
  }
}

let mapDispatchToProps = dispatch => {
  return {
    increment: value => dispatch(increment(value)),
    increment: value => dispatch({
      type: "INCREMENT",
      payload: value,
    }),
    decrement: value => dispatch(decrement(value)),
  }
};


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(About));
