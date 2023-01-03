import React from 'react';
import { sleep } from '@/utils';
import cx from 'classnames';
import './index.scss';

interface ItemType {
  label: string | number;
  value: string | number;
}

interface PropsType {
  list: ItemType[];

  defaultIndex?: number;

  direction?: 'horizontal' | 'vertical'; // default is horizontal

  className?: string;

  onTouchMove?: (moveX: number) => void;

  onTouchEnd?: () => void;

  onChange?: (item: ItemType, index: number) => void;
}

interface StartType {
  x: number;
  y: number;
  time: number;
  swipe: number;
  activeIndex: number; // keep current active index if in transition
}

interface StateType {
  swipe: number;
  transitionDuration: number;
  activeIndex: number;
}

interface Point {
  x: number;
  y: number;
  time: number;
}

const DIRECTION = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
};

class PickerItem extends React.Component {
  props: PropsType;
  start: StartType;
  itemSize: number; // for horizontal itemSize is width, vertical is height.
  state: StateType;
  isTouching: boolean;
  isScrolling: boolean;
  isDisableScroll: boolean;
  pickerContainerRef: any;
  pickerListRef: any;
  basicTranslate: number; // basic translate of view. middle in horizon & middle in vertical
  basicTransitionDuration: number;
  ultimatePoint: Point;
  penultimatePoint: Point;
  isInTransition: boolean;
  clientMapTranslate: number;
  linearRatio: number; // y = kx +b, calculate the index by boundingRect
  linearOffset: number;
  constructor(props: PropsType) {
    super(props);
    this.state = {
      swipe: 0, // horizontal or vertical
      transitionDuration: 0,
      activeIndex: 0, // the active index of swiper element
    };
    this.basicTransitionDuration = 250;
    this.ultimatePoint = null;
    this.penultimatePoint = null;
  }

  componentDidMount(): void {
    const { defaultIndex, direction } = this.props;
    this.itemSize = this.pickerListRef.children && this.pickerListRef.children[0].offsetWidth;
    this.basicTranslate = (this.pickerContainerRef.offsetWidth - this.itemSize) / 2; // for the view is in middle
    if (direction === DIRECTION.VERTICAL) {
      this.itemSize = this.pickerListRef.children && this.pickerListRef.children[0].offsetHeight;
      this.basicTranslate = (this.pickerContainerRef.clientHeight - this.itemSize) / 2; // for the view is in middle
    }
    this.swipeTo(defaultIndex, false);
  }

  async swipeTo(index: number, withTransition = true) {
    const { direction } = this.props;
    const swipe = this.getSwipeByIndex(index);
    this.setState(
      {
        transitionDuration: withTransition ? this.basicTransitionDuration : 0,
      },
      () => {
        // eslint-disable-next-line
        document.body.clientWidth; // don't remove this code ,just trigger the reflow
        this.setState(
          {
            swipe,
            activeIndex: index,
          },
          async () => {
            await sleep(this.basicTransitionDuration + 10);
            // eslint-disable-next-line
            document.body.clientWidth; // don't remove this code ,just trigger the reflow
            const pickerListRect = this.pickerListRef.getBoundingClientRect();
            this.clientMapTranslate = pickerListRect.left - swipe;
            this.linearRatio = -this.itemSize; // y = kx + b;
            this.linearOffset = pickerListRect.left - index * this.linearRatio;
            if (direction == DIRECTION.VERTICAL) {
              this.clientMapTranslate = pickerListRect.top - swipe;
              this.linearOffset = pickerListRect.top - index * this.linearRatio;
            }
          },
        );
      },
    );
  }

  getIndexByBoundingClientRect(pickerListRect) {
    const { direction } = this.props;
    let index = (pickerListRect.left - this.linearOffset) / this.linearRatio;
    if (direction === DIRECTION.VERTICAL) {
      index = (pickerListRect.top - this.linearOffset) / this.linearRatio;
    }
    return Math.round(index);
  }

  // calculate the distance by the swipe distance
  getSwipeByIndex(index: number) {
    return -index * this.itemSize + this.basicTranslate;
  }

  getIndexByVelocity(absVelocity: number, direction: number, currentIndex: number) {
    const { list } = this.props;
    const acceleration = 0.1; // v^2 / 2a   // the less the smooth
    // eslint-disable-next-line
    const moveIndex = Math.round(absVelocity ** 2 / acceleration);
    let index = currentIndex + moveIndex * direction;
    if (index < 0) {
      index = 0;
    } else if (index >= list.length) {
      index = list.length - 1;
    }
    return index;
  }

  // get the velocity of touchMove, this is the limit velocity before touch end
  getTouchMoveVelocity() {
    const { direction = 'horizontal' } = this.props;
    const moveX = this.ultimatePoint.x - this.penultimatePoint.x;
    const moveY = this.ultimatePoint.y - this.penultimatePoint.y;
    const moveTime = this.ultimatePoint.time - this.penultimatePoint.time;
    let velocity = Math.abs(moveX) / moveTime;
    if (direction === DIRECTION.VERTICAL) {
      velocity = Math.abs(moveY) / moveTime;
    }
    return velocity || 0;
  }

  // k * Math.sqrt(distance), use this formula to get the duration time
  // why don't use v0 / a; think about boundary case, no enough distance, but may be get a very long duration
  getTransitionDurationByDistance(currentIndex: number, activeIndex: number) {
    const distance = Math.abs(currentIndex - activeIndex);
    let transitionDuration = Math.sqrt(distance) * 300;
    const maxLimit = 3500;
    if (transitionDuration > maxLimit) {
      transitionDuration = maxLimit;
    }
    return transitionDuration;
  }

  disableScroll() {
    // passive: false cannot omit
    document.body.addEventListener('touchmove', this.preventDefault, { passive: false });
  }

  enableScroll() {
    document.body.removeEventListener('touchmove', this.preventDefault);
  }

  preventDefault = (e) => {
    if (e.cancelable) {
      e.preventDefault();
    }
  };

  touchEndReset() {
    this.isScrolling = false;
    this.isTouching = false;
    this.enableScroll();
  }

  handleTransitionEnd = () => {
    this.isInTransition = false;
  };

  handleTouchStart = (e) => {
    const { screenX, screenY } = e.changedTouches[0];
    const time = new Date().getTime();
    let { swipe } = this.state;
    let { activeIndex } = this.state;
    let pickerListRect = { top: 0 };
    if (this.isInTransition) {
      pickerListRect = this.pickerListRef.getBoundingClientRect();
      swipe = pickerListRect.top - this.clientMapTranslate;
      activeIndex = this.getIndexByBoundingClientRect(pickerListRect);
    }
    this.start = {
      x: screenX,
      y: screenY,
      time,
      swipe,
      activeIndex,
    };
    this.isTouching = false;
    this.isScrolling = false;

    this.ultimatePoint = {
      x: screenX,
      y: screenY,
      time,
    };

    this.penultimatePoint = this.ultimatePoint;

    // when in transition state, delay a time to stop transition if without new touchmove
    if (this.isInTransition) {
      this.setState({
        swipe,
        transitionDuration: 0,
        activeIndex,
      });
      this.isInTransition = false;
    }
  };

  handleTouchMove = (e) => {
    if (this.isScrolling) return;
    const { onTouchMove, list, direction: slideDirection = 'horizontal' } = this.props;
    const { activeIndex } = this.state;
    const { screenX, screenY } = e.changedTouches[0];
    const moveX = screenX - this.start.x;
    const moveY = screenY - this.start.y;
    let direction = moveX > 0 ? -1 : 1; // 1 means go to next element
    if (slideDirection === DIRECTION.VERTICAL) {
      direction = moveY > 0 ? -1 : 1; // 1 means go to next element
    }
    if (
      (activeIndex === 0 && direction === -1) ||
      (activeIndex === list.length - 1 && direction === 1)
    ) {
      return false;
    }
    let moveDiff = Math.abs(moveX) - Math.abs(moveY);
    let moveDistance = moveX;
    if (slideDirection === DIRECTION.VERTICAL) {
      moveDiff *= -1;
      moveDistance = moveY;
    }
    if (moveDiff > 1 && !this.isTouching) {
      this.isTouching = true;
      this.isScrolling = false;
      this.disableScroll();
    } else if (!this.isTouching) {
      this.isTouching = false;
      this.isScrolling = true;
      return;
    }
    const max = this.getSwipeByIndex(0);
    const min = this.getSwipeByIndex(list.length - 1);
    let swipe = moveDistance + this.start.swipe;
    if (swipe < min) {
      swipe = min;
    } else if (swipe > max) {
      swipe = max;
    }
    this.setState({
      swipe,
      transitionDuration: 0,
    });

    typeof onTouchMove === 'function' && onTouchMove(moveX);
    this.penultimatePoint = this.ultimatePoint;
    this.ultimatePoint = {
      x: screenX,
      y: screenY,
      time: new Date().getTime(),
    };
  };

  handleTouchEnd = (e) => {
    if (this.isScrolling) return;
    this.touchEndReset();
    const { onChange, onTouchEnd, list, direction: slideDirection = 'horizontal' } = this.props;
    const { activeIndex } = this.state;
    const { screenX, screenY } = e.changedTouches[0];
    let direction = screenX - this.start.x > 0 ? -1 : 1; // 1 means go to next element
    if (slideDirection === DIRECTION.VERTICAL) {
      direction = screenY - this.start.y > 0 ? -1 : 1;
    }
    const pickerListRect = this.pickerListRef.getBoundingClientRect();
    let currentIndex = this.getIndexByBoundingClientRect(pickerListRect);
    const absVelocity = this.getTouchMoveVelocity();
    const MIN_VELOCITY = 0.03;
    let transitionDuration = this.basicTransitionDuration;
    // if you slide quickly, use inertial slide
    if (absVelocity > MIN_VELOCITY) {
      currentIndex = this.getIndexByVelocity(absVelocity, direction, currentIndex);
      transitionDuration = this.getTransitionDurationByDistance(
        currentIndex,
        this.start.activeIndex,
      );
    }
    this.isInTransition = true;
    const max = this.getSwipeByIndex(0);
    const min = this.getSwipeByIndex(list.length - 1);
    let swipe = this.getSwipeByIndex(currentIndex); // add this for lower performance machine, limit boundary
    if (swipe < min) {
      swipe = min;
    } else if (swipe > max) {
      swipe = max;
    }
    this.setState({
      swipe,
      transitionDuration,
      activeIndex: currentIndex,
    });
    if (typeof onChange === 'function' && activeIndex !== currentIndex) {
      onChange(list[currentIndex], currentIndex);
    }
    typeof onTouchEnd === 'function' && onTouchEnd();
  };

  render() {
    const { className, list, direction = 'horizontal' } = this.props;
    const { swipe, transitionDuration } = this.state;
    const style = {
      transform: `translate3d(${swipe}px, 0, 0)`,
      transitionDuration: `${transitionDuration}ms`,
    };
    if (direction === DIRECTION.VERTICAL) {
      style.transform = `translate3d(0, ${swipe}px, 0)`;
    }
    return (
      <div
        className="i-picker-container"
        ref={(elem) => {
          this.pickerContainerRef = elem;
        }}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        <div
          className={cx('i-picker-wrapper', className)}
          style={style}
          onTransitionEnd={this.handleTransitionEnd}
        >
          <ul
            className={cx('i-picker-list', `i-picker-list-${direction}`)}
            ref={(elem) => {
              this.pickerListRef = elem;
            }}
          >
            {list.map((item, index) => (
              <li className="i-picker-item" key={index}>
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className={cx('i-picker-item-mask', `i-picker-item-mask-${direction}`)}>
          <div className={`i-picker-item-mask-${direction}-top`} />
          <div className={`i-picker-item-mask-${direction}-middle`} />
          <div className={`i-picker-item-mask-${direction}-bottom`} />
        </div>
      </div>
    );
  }
}

export default PickerItem;
