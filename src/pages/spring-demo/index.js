import React, { useState, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";

import "./index.scss";


// function Demo () {
//   const [ name, setName ] = useState("joey");
//   const { number } = useSpring({
//     from: {
//       number: 0
//     },

//     number: 100,

//   });

  

//   return (
//     <div>
//       <h1>Hello world, {name}</h1>
//       <animated.div>
//         {number.to(n => n.toFixed(2))}
//       </animated.div> 

//       <div onClick={() => setName("Alvin")}>click me</div>
//     </div>
//   );
// }


// function Demo () {
//   const [ isPending, startTransition] = useTransition();
//   console.log("render: ", isPending);
//   const [ count, setCount ] = useState(0);

//   const handleAdd = () => {
//     setCount(count => count+1);
//     startTransition(() => {
//       console.log("start transition")
//       setCount(count => count + 1)
//     });
//     console.log("123")
//   };

//   return (
//     <div>
//       <h1>{isPending} pending</h1>
//       <div>count: { count }</div>
//       <div onClick={handleAdd}> add one</div>
//     </div>
//   );
// }

const SWIPE_DIRECTION = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  TOP: "TOP",
  BOTTOM: "BOTTOM"
};

function getSwipeDirection (start, end) {
  const MOVE_EPSILON = 3;
  const MOVE_TIME_EPSILON = 100;
  const moveX = end.clientX - start.clientX;
  const moveY = end.clientY - start.clientY;
  const moveTime = end.timestamp - start.timestamp;
  // if(moveTime > MOVE_TIME_EPSILON) {
  //   return "";
  // }
  if(Math.abs(moveX) > Math.abs(moveY)) {
    if(moveX < 0) {
      return SWIPE_DIRECTION.RIGHT;
    } else {
      return SWIPE_DIRECTION.LEFT;
    }
  } else {
    if(moveY < 0) {
      return SWIPE_DIRECTION.BOTTOM;
    } else {
      return SWIPE_DIRECTION.TOP;
    }
  }
}

function Swiper (props) {
  const { children } = props;
  const [ {moveX, moveY}, setPosition ] = useState({moveX: 0, moveY: 0});
  const start = useRef({ clientX: 0, clientY: 0, moveX, moveY});
  const max = 0;  // bounds
  const min = -(children.length -1) * document.documentElement.clientWidth;
  const handlePointerDown = (event) => {
    start.current = {
      clientX: event.clientX,
      clientY: event.clientY,
      moveX,
      moveY,
      timestamp: new Date().getTime(),
    }
  };

  const handlePointerMove = event => {
    event.preventDefault();
    const startPosition = start.current;
    const currentTimestamp = new Date().getTime();
    let currentMoveX = startPosition.moveX + (event.clientX - startPosition.clientX);
    if(currentMoveX > max) {
      currentMoveX = 0;
    } else if(currentMoveX < min) {
      currentMoveX = min;
    }
    setPosition({
      moveX: currentMoveX,
      moveY: 0
      // moveY: startPosition.moveY + (event.clientY - startPosition.clientY),
    });
    console.log("pointerMove: ", event);
  };

  const handlePointerUp = (event) => {
    console.log("pointerUp: ", event)
    const currentTimestamp = new Date().getTime();
    const endPosition = {
      clientX: event.clientX,
      clientY: event.clientY,
      timestamp: currentTimestamp,
    }
    const direction = getSwipeDirection(start.current, endPosition);
    switch(direction) {
      case SWIPE_DIRECTION.LEFT:
        
        break;
      case SWIPE_DIRECTION.RIGHT:
        break;
    }
  };

  return <div className="swiper-container">
    <div className="swiper-list"
    style={
      {
        transform: `translate(${moveX}px, ${moveY}px)`
      }
    }
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}>

      {children}
    </div>
  </div>
}

Swiper.Item = function (props) {
  const {children} = props;
  return (
    <div className="swiper-item">{children}</div>
  );
}


function Demo () {
  return <div>
    <h1>swiper practice</h1>
    <Swiper>
      <Swiper.Item>1</Swiper.Item>
      <Swiper.Item>2</Swiper.Item>
      <Swiper.Item>3</Swiper.Item>
    </Swiper>
  </div>
}


export default Demo;

