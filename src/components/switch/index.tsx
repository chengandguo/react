import cx from 'classnames';
import { useState, useRef, useEffect } from 'react';
import './index.scss';

interface PropsType {
  checked?: boolean;

  onChange?: (value: boolean) => void;

  className?: string;

  checkedClassName?: string;

  sliderClassName?: string;
}

const TRANSITION_MAP = {
  ADD: 'all 200ms',
  REMOVE: 'none',
};

const Switch = (props) => {
  const { className, checkedClassName, sliderClassName, checked, onChange } = props;
  const getTranslateX = (currentChecked: boolean) => {
    if (currentChecked && switchRef.current && sliderRef.current) {
      return switchRef.current.clientWidth - sliderRef.current.clientWidth;
    }
    return 0;
  };
  const [transition, setTransition] = useState(TRANSITION_MAP.REMOVE);
  const [translateX, setTranslateX] = useState(0);
  const switchRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const startRef = useRef({ x: 0, time: 0 });

  useEffect(() => {
    setTranslateX(getTranslateX(checked));
    setTransition(TRANSITION_MAP.ADD);
  }, [checked]);


  const handleTouchStart = (e) => {
    const { screenX } = e.changedTouches[0];
    startRef.current = {
      x: screenX,
      time: new Date().getTime(),
    };
  };

  const handleTouchMove = (e) => {
    if (!(switchRef.current && sliderRef.current)) return;
    const { screenX } = e.changedTouches[0];
    const moveX = screenX - startRef.current.x;
    const startTranslateX = checked ? (switchRef.current.clientWidth - sliderRef.current.clientWidth) : 0;
    let currentTranslateX = startTranslateX + moveX;
    if (currentTranslateX < 0) {
      currentTranslateX = 0;
    } else if (currentTranslateX > (switchRef.current.clientWidth - sliderRef.current.clientWidth)) {
      currentTranslateX = switchRef.current.clientWidth - sliderRef.current.clientWidth;
    }

    setTranslateX(currentTranslateX);
    setTransition(TRANSITION_MAP.REMOVE);
  };

  const handleTouchEnd = (e) => {
    if (!(switchRef.current && sliderRef.current)) return;
    const endTime = new Date().getTime();
    const { screenX } = e.changedTouches[0];
    const moveX = screenX - startRef.current.x;
    const min = (switchRef.current.clientWidth - sliderRef.current.clientWidth) / 2;
    const TIME_LIMIT = 150;
    const MOVE_X_LIMIT = 3;

    // simulate click event
    if (endTime - startRef.current.time < TIME_LIMIT && Math.abs(moveX) < MOVE_X_LIMIT) {
      changeSuccess();
      return;
    }

    // slider distance is more than half distance
    if (Math.abs(moveX) > min && ((moveX > 0 && !checked) || (moveX < 0 && checked))) {
      changeSuccess();
    } else {
      setTranslateX(getTranslateX(checked)); // restore state
      setTransition(TRANSITION_MAP.ADD);
    }
  };

  const changeSuccess = () => {
    typeof onChange === 'function' && onChange(!checked);
    setTranslateX(getTranslateX(checked));
    setTransition(TRANSITION_MAP.ADD);
  };

  const style = {
    transform: `translate3d(${translateX}px, 0, 0)`,
    transition,
  };

  return (
    <div
      className={cx('i-switch-component', className, {
        'i-switch-component-checked': checked,
        [checkedClassName]: checked,
      })}
      ref={switchRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={cx('i-switch-component-slider', sliderClassName)}
        style={style}
        ref={sliderRef}
      />
    </div>
  );
};

export default Switch;
