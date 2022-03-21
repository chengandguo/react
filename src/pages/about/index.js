import React from "react";
import { connect } from "react-redux";
import {increment, decrement} from "../../store/reducers/counter.js";
import { withRouter } from "react-router-dom";
import Notification from "rmc-notification";

import "./index.scss";

const HOC = function (props) {
  const tempProps = {...props};
  const { shouldRemoveClick , ...rest } = props;
  if(props.shouldRemoveClick) {
    delete tempProps.onClick;
  }
  return <div {...rest}>
    { props.children }
  </div>
}
class Salute extends React.Component {
  handleShowToast = () => {
    Notification.newInstance({}, notification => {
      notification.notice({
        content: "hello world",
        duration: 3,
        style: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "black",
          color: "white",
          padding: "20px",
        },
        onClose () {
          console.log("close");
          notification.destroy();
        }
      })
    });
  }
  
  render () {
    const shouldRemoveClick = true;  // here you judge order list or order detail
    return (
      <div>
        <HOC name="abc" onClick={this.handleShowToast} shouldRemoveClick={shouldRemoveClick}>
          <p> like you</p>
        </HOC>
      </div>
    );
  }
}


// 
function Wrapper(component, props) {
  return React.createElement(component, {...props}, Salute)
}

class About extends React.Component {
  renderSprite() {
    return <div className="sprite"></div>
  }
  render () {
    let {increment, decrement} = this.props;
    return (
      <div className="about">
        <h1>I am about</h1>
        <div>count: {this.props.count}</div>
        <div onClick={ () => increment(1)}>add 1</div>
        <div onClick={ () => increment(1)}>add 1</div>
        <div onClick={ () => decrement(1)}>reduce 1</div>
        <Salute name="reeo"/>
        {Wrapper(Salute, { name: "chengzhen", "date": "2021-07-30"})}
        {this.renderSprite()}
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
    // increment: value => dispatch({
    //   type: "INCREMENT",
    //   payload: value,
    // }),
    decrement: value => dispatch(decrement(value)),
  }
};


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(About));
