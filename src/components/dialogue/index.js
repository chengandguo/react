import React from 'react';
import  {Transition } from "react-transition-group";
import "./index.scss";

const duration = 1000;
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: {opacity: 1},
  entered: {opacity: 1},
  exiting: {opacity: 0},
  exited: {opacity: 0},
};


class Dialogue extends React.Component {
  render () { 
    return (<Transition in={this.props.isShow}  timeout={duration} mountOnEnter unmountOnExit appear={true}>
      {state => { 
        console.log(this.props, state)
        return (<div className={this.props.className + " dialogue"}
        style={{...defaultStyle, ...transitionStyles[state]}}>
        <div className="dialogue-mask"></div>
        <div className="dialogue-content">
          {this.props.children}
          <div className="dialogue-btn">
            <div className="dialogue-btn-cancel">取消</div>
            <div className="dialogue-btn-confirm" onClick={this.props.confirm}>确定</div>
          </div>
        </div>
      </div>)}}
    </Transition>);
  }
}

export default Dialogue;

