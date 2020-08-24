import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import "./index.scss";


class Slider extends React.Component {
  static propTypes = {
    trackText: PropTypes.string,
    onSuccess: PropTypes.func,
    onFail: PropTypes.func,
  }

  constructor (props) {
    super(props);
    this.state = {
      left: 0,
      isInReseting: false,  // 滑块是否处在重置状态中
    }

    this.trackElem = React.createRef();
    this.sliderElem = React.createRef();
    this.limitDistance = 0; 
    this.startX = 0;
    this.isSuccessful = false;
  }

  componentDidMount () {
    this.limitDistance = this.trackElem.current.clientWidth - this.sliderElem.current.clientWidth;
  }

  handleMouseDown = e => {
    this.startX = e.clientX;
    this.isMoving = true;
    document.onmousemove = e => {
      if(!this.isMoving) return;
      let moveX = e.clientX - this.startX;
      if(moveX < 0 || moveX > this.limitDistance) return;
      this.setState({
        left: moveX,
      });

      let epsilon = 4;
      if(Math.abs(moveX - this.limitDistance) < epsilon && 
        !this.isSuccessful) {
        this.isSuccessful = true;
        typeof this.props.onSuccess == "function" && 
        this.props.onSuccess();
      }
    }

    document.onmouseup = e => {
      this.isMoving = false;
      document.onmousemove = null;
      if(this.isSuccessful) return;
      this.reset();
    }
  }

  handleTransitionEnd = () => {
    this.setState({
      isInReseting: false,
    });
  }

  reset () {
    this.isSuccessful = false;
    this.setState({
      isInReseting: true,
      left: 0,
    });
  }

  render () {
    return (
      <div className="slider-container">
        <div className="slider-track" ref={this.trackElem}>
          {this.props.trackText}
        </div>

        <div className={cx("slider-block", {"slider-block-transition": this.state.isInReseting})}
          ref={this.sliderElem}
          style={{left: `${this.state.left}px`}}
          onTransitionEnd={this.handleTransitionEnd}
          onMouseDown={this.handleMouseDown}>
        </div>
      </div>
    );
  }
}

export default Slider;
