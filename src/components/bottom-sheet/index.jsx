/*
  @description: Bottom sheets are surfaces containing supplementary content that are anchored to the bottom of the screen.
  Notice: In H5, we shouldn't use gesture touch to close bottom sheet.
  For There are pull-down refresh function in lots of browsers. It may cause conflict with native function.
*/
import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import PropTypes from 'prop-types';
import bodyScrollLock from '@/utils/body-scroll-lock';
import { sleep } from '@/utils';
import EventEmitterInstance from '@/utils/event-emitter';
import EventEmitterType from '@/store';
import Button from '../button';
import CloseIcon from '../close-icon';
import L from './language';
import './index.scss';

const deviceType = getDeviceType();
const isIphoneXSeries = deviceType === 'IPHONEX';
const TRANSITION_TIME = 250;
const BOTTOM_SHEET_HEIGHT = '60%';
const EPSILON = 0.01; // define a very tiny value

const MASK_STYLE = {
  IN: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },

  OUT: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
};

const WRAPPER_STYLE = {
  IN: {
    transform: 'translate3d(0, 0, 0)',
    transition: `transform ${TRANSITION_TIME}ms`,
  },

  OUT: {
    transform: 'translate3d(0, 100%, 0)',
    transition: `transform ${TRANSITION_TIME}ms`,
  },
};

const CONTENT_STYLE = {
  SCROLL: {
    overflowY: 'scroll',
  },

  DISABLE_SCROLL: {
    overflowY: 'hidden',
  },
};

class BottomSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      maskStyle: {},
      wrapperStyle: {},
      contentStyle: {},
    };
    this.height = this.getSheetHeight();
    this.scrollTop = 0;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { visible } = this.props;
    if (visible !== nextProps.visible) {
      if (nextProps.visible) {
        this.show();
      } else {
        this.hide();
      }
    }
  }

  // get bottom sheet height,
  // why i use clientWidth , for Android input focus, viewport height changed.
  getSheetHeight() {
    const { height = BOTTOM_SHEET_HEIGHT } = this.props;
    let heightWithoutUnit = height;
    if (height.indexOf('%')) {
      heightWithoutUnit = (Number.parseFloat(height) / 100) * document.documentElement.clientWidth;
    } else if (height.indexOf('px')) {
      heightWithoutUnit = Number.parseFloat(height);
    } else if (height.indexOf('vw')) {
      heightWithoutUnit = (Number.parseFloat(height) / 100) * document.documentElement.clientWidth;
    }
    return heightWithoutUnit;
  }

  getMaskStyle(distance) {
    const INITIAL_OPACITY = 0.6;
    let opacity = INITIAL_OPACITY - (distance / this.height) * INITIAL_OPACITY;
    if (opacity < 0) {
      opacity = 0;
    }
    return {
      backgroundColor: `rgba(0,0,0,${opacity})`,
      opacity: 1,
    };
  }

  show = () => {
    this.setState(
      {
        visible: true,
      },
      () => {
        // eslint-disable-next-line
        document.body.clientWidth; // don't remove this code ,just trigger the reflow
        this.setState({
          maskStyle: MASK_STYLE.IN,
          wrapperStyle: WRAPPER_STYLE.IN,
        });
        bodyScrollLock(true);
        EventEmitterInstance.emit(EventEmitterType.BODY_SCROLL_LOCK);
      },
    );
  };

  hide = () => {
    const { maskStyle } = this.state;
    const { onChange } = this.props;
    this.setState(
      {
        wrapperStyle: WRAPPER_STYLE.OUT,
        contentStyle: CONTENT_STYLE.SCROLL,
        maskStyle: {
          ...maskStyle,
          ...MASK_STYLE.OUT,
        },
      },
      async () => {
        await sleep(TRANSITION_TIME + 10);
        this.setState({
          visible: false,
        });
        typeof onChange === 'function' && onChange(false);
        bodyScrollLock(false);
        EventEmitterInstance.emit(EventEmitterType.BODY_SCROLL_UNLOCK);
      },
    );
  };

  restoreStyle() {
    this.setState({
      wrapperStyle: WRAPPER_STYLE.IN,
      contentStyle: CONTENT_STYLE.SCROLL,
      maskStyle: MASK_STYLE.IN,
    });
  }

  handleScroll = (e) => {
    const { target } = e;
    this.scrollTop = target.scrollTop;
  };

  handleClose = (e) => {
    e && e.stopPropagation();
    this.hide();
    const { onClose } = this.props;
    typeof onClose === 'function' && onClose();
  };

  handleClickCloseBtn = () => {
    this.hide();
    const { onClose } = this.props;
    typeof onClose === 'function' && onClose();
  };

  handleCancel = () => {
    const { onCancel } = this.props;
    this.hide();
    typeof onCancel === 'function' && onCancel();
  };

  handleTouchStart = (e) => {
    e.stopPropagation(); // always need , for there may be multiple bottom sheet at the same time.
    const { clientX, clientY } = (e && e.changedTouches[0]) || {};
    this.start = {
      x: clientX,
      y: clientY,
      time: new Date().getTime(),
      scrollTop: this.scrollTop,
    };
  };

  handleTouchMove = (e) => {
    e.stopPropagation(); // always need , for there may be multiple bottom sheet at the same time.
    const { disableTouchClose } = this.props;
    const { y: startY, scrollTop: startScrollTop } = this.start;
    const { clientY: endY } = e.changedTouches[0];
    const moveY = endY - startY;
    if (moveY <= 0 || this.scrollTop > EPSILON || startScrollTop > EPSILON || disableTouchClose) return;
    const wrapperStyle = {
      transform: `translateY(${moveY}px)`,
      transition: 'none',
    };
    this.setState({
      wrapperStyle,
      contentStyle: CONTENT_STYLE.DISABLE_SCROLL,
      maskStyle: this.getMaskStyle(moveY),
    });
  };

  handleTouchEnd = (e) => {
    e.stopPropagation(); // always need , for there may be multiple bottom sheet at the same time.
    const { disableTouchClose } = this.props;
    if (disableTouchClose) return;
    const { y: startY, time: startTime, scrollTop: startScrollTop } = this.start;
    const { clientY: endY } = e.changedTouches[0];
    const endTime = new Date().getTime();
    const Y_DISTANCE = 60;
    const TIME_LIMIT = 300;
    // 1.slide distance > height / 3 && startScrollTo < EPSILON means you are in the top of the bottom sheet
    // 2. slide down immediately
    if (
      (endY - startY > Y_DISTANCE &&
        this.scrollTop < EPSILON &&
        startScrollTop < EPSILON &&
        endTime - startTime < TIME_LIMIT) ||
      (endY - startY > this.height / 3 && startScrollTop < EPSILON)
    ) {
      this.hide();
    } else {
      this.restoreStyle();
    }
  };

  renderButtonList() {
    const { onCancel, onConfirm, confirmBtnText, cancelBtnText } = this.props;
    const singleButtonClassName = onCancel ? '' : 'i-sheet-button-single';
    return (
      (onConfirm || onCancel) && (
        <div
          className={cx('i-sheet-button-list', {
            'i-sheet-button-list-iphonex': isIphoneXSeries,
          })}
        >
          {onCancel && (
            <Button type="normal" onClick={this.handleCancel} className="i-sheet-button-item i-sheet-button-cancel">
              {cancelBtnText || L.CANCEL_BUTTON}
            </Button>
          )}
          {onConfirm && (
            <Button
              type="primary"
              onClick={onConfirm}
              className={cx('i-sheet-button-item', 'i-sheet-button-confirm', singleButtonClassName)}
            >
              {confirmBtnText || L.CONFIRM_BUTTON}
            </Button>
          )}
        </div>
      )
    );
  }

  render() {
    const { children, title, height, onConfirm, onCancel } = this.props;
    const { maskStyle, wrapperStyle, contentStyle, visible } = this.state;
    const reactNode = visible && (
      <div className="i-sheet">
        <div className="i-sheet-mask" style={maskStyle} onClick={this.handleClose} />
        <div
          className="i-sheet-wrapper"
          style={{ ...wrapperStyle, height }}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
        >
          {/* header title */}
          <header className="i-sheet-header">
            <h1 className="i-sheet-header-title">{title}</h1>
            <div className="i-sheet-header-close" onClick={this.handleClickCloseBtn}>
              <CloseIcon className="i-sheet-header-close-icon" />
            </div>
          </header>

          <div
            className={cx('i-sheet-content', {
              'i-sheet-content-bottom': !onConfirm && !onCancel,
            })}
            style={contentStyle}
            onScroll={this.handleScroll}
          >
            {children}
          </div>
          {this.renderButtonList()}
        </div>
      </div>
    );
    if (!this.container && visible) {
      this.container = document.createElement('div');
      this.container.className = 'i-sheet-container';
      document.body.appendChild(this.container);
    }
    if (visible) {
      return ReactDOM.createPortal(reactNode, this.container);
    } else {
      return null;
    }
  }
}

BottomSheet.propTypes = {
  title: PropTypes.string,

  height: PropTypes.string, // bottom sheet height, like "50%", "40vw", "300px",

  onConfirm: PropTypes.func,

  onCancel: PropTypes.func,

  onClose: PropTypes.func,

  confirmBtnText: PropTypes.string,

  cancelBtnText: PropTypes.string,

  disableTouchClose: PropTypes.bool, // whether touch close available
};

BottomSheet.defaultProps = {
  title: '',

  height: '60%',
};

export default BottomSheet;
