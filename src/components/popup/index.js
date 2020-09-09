import React from "react";
import cx from "classnames";

import "./index.scss";

function delay (time=0) {
  return new Promise((resolve, reject) => {
    window.setTimeout( () => {
      resolve();
    }, time);
  });
}

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: props.visibility,
      isAddStyle: !props.visibility,
    }
    console.log("constructor");
  }

  async watchVisibility() {
    let { visibility } = this.props;
    if (visibility) {
      this.setState({
        isShow: true,
      });
      await delay(0);
      this.setState({
        isAddStyle: false,
      });
    } else {
      this.setState({
        isAddStyle: true,
      });
      await delay(400);
      this.setState({
        isShow: false,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.visibility !== this.props.visibility) {
      this.watchVisibility();
    }
  }

  render() {
    let { isAddStyle, isShow } = this.state;
    let { place = "bottom", onClose } = this.props;
    let contentClassName = `popup-content-${place}`;
    return (
      isShow && (<div className="popup">
        <div className={cx("popup-mask", { "popup-mask-enter": isAddStyle })}
          onClick={onClose}>
        </div>
        <div className={cx("popup-content", { [contentClassName]: isAddStyle })}>
          <div className="popup-content-header"></div>
          <div className="popup-content-body">

          </div>
        </div>
      </div>)
    );
  }
}

export default Popup;