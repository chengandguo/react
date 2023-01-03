import React, { useEffect, useState,} from 'react';
import "./index.scss";

function toPercent (current, total) {
  return Math.round(current / total * 100) + "%";
}

function Slider(props) {
  const { last, current, total } = props;
  const [ progress, setProgress ] = useState(toPercent(last, total));

  useEffect( () => {
    window.setTimeout( () => {
      setProgress(toPercent(current, total));
    }, 300);
  }, [current, total]);

  return (
    <div className="slider-track">
      <div className="slider-block" style={{width: progress}}></div>
    </div>
  );
}

export default Slider;
