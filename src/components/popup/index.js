import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
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
      await delay(300);
      this.setState({
        isShow: false,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visibility !== this.props.visibility) {
      this.watchVisibility();
    }
  }

  handleMaskClose = () => {
    let { isAllowMaskClose, onClose} = this.props;
    if(isAllowMaskClose) {
      onClose();
    }
  }

  render() {
    let { isAddStyle, isShow } = this.state;
    let { position, 
      isShowMask,
      children,
      title,
    } = this.props;
    let contentClassName = `popup-content-${position}-enter`;
    return (
      isShow && (<div className="popup">
        {isShowMask && (<div className={ cx("popup-mask", { "popup-mask-enter": isAddStyle }) }
          onClick={this.handleMaskClose}>
        </div>)}
        <div className={ cx("popup-content", 
          `popup-content-${position}-to`, 
          { [contentClassName]: isAddStyle })}>
          {
            title && (<div className="popup-content-header">
              <div className="popup-content-header-title">{title}</div>
              <div className="popup-content-header-close"></div>
            </div>)
          }
          <div className="popup-content-body">
            { children }
          </div>
        </div>
      </div>)
    );
  }
}

Popup.propTypes = {
  visibility: PropTypes.bool,
  title: PropTypes.string,
  headerClassName: PropTypes.string,
  position: PropTypes.oneOf(["top", "right", "bottom", "left"]),
  onClose: PropTypes.func,
  isShowMask: PropTypes.bool,
  isAllowMaskClose:PropTypes.bool,  // 是否允许点击mask关闭
}

Popup.defaultProps = {
  position: "bottom",
  isShowMask: true,
  isAllowMaskClose: true,
}

export default Popup;
