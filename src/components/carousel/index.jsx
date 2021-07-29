import React, { PureComponent } from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import "./index.scss";

const FIRST_PATH = [
  -100, 0,    // -100 100 0
];

const SECOND_PATH = [
  -100, -200, // -100 -200 0
];

const EPSILON = 0.0001;

let count = -1;

class Carousel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      first: {
        value: props.dataSource[0],
        translateY: 0,
        isRemoveAnimation: false,
      },
      second: {
        value: typeof props.dataSource[1] === "undefined" ? props.dataSource[0] : props.dataSource[1],
        translateY: 0,
        isRemoveAnimation: false,
      }
    }
  }

  componentDidMount() {
    if(!Array.isArray(this.props.dataSource)) {
      console.error("Props dataSource should be Array Type");
      return;
    }
    // Array should contain at least one value, and then start the loop
    this.props.dataSource.length && this.loop();
  }

  componentWillReceiveProps () {
    typeof this.timeId === "undefined" && this.loop();
  }

  componentWillUnmount () {
    typeof this.timeId === "number" && window.clearInterval(this.timeId);
  }

  loop() {
    let { stayTime } = this.props;
    this.timeId = window.setInterval(() => {
      count++;
      let pathIndex = count % FIRST_PATH.length;
      this.setState({
        first: {
          value: this.state.first.value,
          translateY: FIRST_PATH[pathIndex],
          isRemoveAnimation: false,
        },
        second: {
          value: this.state.second.value,
          translateY: SECOND_PATH[pathIndex],
          isRemoveAnimation: false,
        },
      });
    }, stayTime);
  }

  /*
    @params: key, {String}, first or second element
    @params: yEnd, {Number}, need to reset the position and remove the animation
    @params: yStart, {Number}, the initial position
  */
  handleTransitionEnd (key, yEnd, yStart) {
    let target = this.state[key];
    if (Math.abs(target.translateY - yEnd) < EPSILON) {
      this.setState({
        [key]: {
          ...target,
          translateY: yStart,
          isRemoveAnimation: true,
          // value: this.props.dataSource[(count + 2) % this.props.dataSource.length]
        }
      });
    }
  }

  render() {
    let { first, second } = this.state;
    let { transitionTime, className } = this.props;
    let defaultStyle = {
      transition: `all ${transitionTime}ms`
    };

    if (first.isRemoveAnimation || second.isRemoveAnimation) {
      defaultStyle = {};
    }

    return (
      <ul className={cx("carousel-list", className)}>
        <li className="carousel-item"
          onTransitionEnd={() => this.handleTransitionEnd("first", -100, 100)}
          style={{
            ...defaultStyle,
            "transform": `translateY(${first.translateY}%)`
          }}>
          {first.value}
        </li>

        <li className="carousel-item"
          onTransitionEnd={() => this.handleTransitionEnd("second", -200, 0)}
          style={{
            ...defaultStyle,
            "transform": `translateY(${second.translateY}%)`
          }}>
          {second.value}
        </li>

      </ul>
    );
  }
}

Carousel.propTypes = {
  dataSource: PropTypes.array,
  stayTime: PropTypes.number,
  transitionTime: PropTypes.number,
  className: PropTypes.string,
}

Carousel.defaultProps = {
  dataSource: [],
  stayTime: 2000,
  transitionTime: 300,
}

export default Carousel;
