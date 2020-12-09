import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

function delay(time = 0) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
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
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visibility !== nextProps.visibility) {
      this.watchVisibility();
    }
  }

  async watchVisibility() {
    const { visibility } = this.props;
    if (!visibility) {
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

  handleMaskClose = () => {
    const { isAllowMaskClose, onClose } = this.props;
    if (isAllowMaskClose) {
      typeof onClose === 'function' && onClose();
    }
  };

  render() {
    const { isAddStyle, isShow } = this.state;
    const { position, isShowMask, children, className, title} = this.props;
    const contentClassName = `popup-content-${position}-enter`;
    return (
      isShow && (
        <div className={cx("popup", className)}>
          {isShowMask && (
            <div className={cx('popup-mask', { 'popup-mask-enter': isAddStyle })} onClick={this.handleMaskClose} />
          )}
          <div className={cx('popup-content',
            `popup-content-${position}-to`, { [contentClassName]: isAddStyle })}>
            {
              title && (<div className="popup-content-header">
                <div className="popup-content-header-title">{title}</div>
                <div className="popup-content-header-close"></div>
              </div>)
            }
            <div className="popup-content-body">{children}</div>
          </div>
        </div>
      )
    );
  }
}

Popup.propTypes = {
  className: PropTypes.string,
  visibility: PropTypes.bool,
  title: PropTypes.string,
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'center']),
  onClose: PropTypes.func,
  isShowMask: PropTypes.bool,
  isAllowMaskClose: PropTypes.bool, // if close the dialog when you click the mask
};

Popup.defaultProps = {
  position: 'bottom',
  isShowMask: true,
  isAllowMaskClose: true,
};

export default Popup;
