import React, { useCallback, useState, useMemo, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useDrag, useGesture } from "@use-gesture/react";

import "./index.scss";

/**
 * 
 * velocity
 * timestamp
 * 
 */

// function Demo() {
//   const [{ moveX, moveY }, setPosition] = useState({ moveX: 0, moveX: 0 });
//   const dragConfig = {
//   };

//   const bind = useDrag((res) => {
//     const { type, movement: [moveX, moveY], offset: [offsetX, offsetY] } = res;
//     setPosition({
//       moveX: offsetX,
//       moveY: offsetY
//     });
//   }, dragConfig);

//   return (
//     <div>


//       <ul>
//         {
//           new Array(100).fill(0).map((item, index) => <li>{index}</li>)
//         }
//       </ul>

//       <div className="block"
//         {...bind()}
//         style={
//           {
//             transform: `translate(${moveX}px, ${moveY}px)`
//           }
//         }
//       >
//         me
//       </div>

//       <ul>
//         {
//           new Array(100).fill(0).map((item, index) => <li>{index}</li>)
//         }
//       </ul>
//     </div>
//   );
// }

function Demo() {
  const [ {moveX, moveY}, setPosition ] = useState({moveX: 0, moveY: 0});
  const start = useRef({ clientX: 0, clientY: 0, moveX, moveY});

  const handlePointerDown = (event) => {
    start.current = {
      clientX: event.clientX,
      clientY: event.clientY,
      moveX,
      moveY,
    }
  };

  const handlePointerMove = event => {
    const startPosition = start.current;
    setPosition({
      moveX: startPosition.moveX + (event.clientX - startPosition.clientX),
      moveY: startPosition.moveY + (event.clientY - startPosition.clientY),
    });
  };

  const handlePointerUp = (event) => {
    console.log("up: ", event.clientX, event.clientY);
  };

  return (
    <div>
      <ul>
        {
          new Array(100).fill(0).map((item, index) => <li>{index}</li>)
        }
      </ul>
      <div className="block"
        onPointerDown = { handlePointerDown }
        onPointerMove = { handlePointerMove }
        onPointerUp = { handlePointerUp }
        style={
          {
            transform: `translate(${moveX}px, ${moveY}px)`
          }
        }
      >
        me
      </div>

      <ul>
        {
          new Array(100).fill(0).map((item, index) => <li>{index}</li>)
        }
      </ul>
    </div>

  );
}


// function createUseState () {
//   let state = [];
//   let index = 0;
//   return function (initialState) {
//     const currentIndex = index;
//     state[currentIndex] = state[currentIndex] === undefined ? initialState : state[currentIndex];
//     const setState = (currentState) => {
//       state[currentIndex] = currentState;
//       reRender();
//     }
//     index++;
//     return [state[currentIndex], setState];
//   }

//   function reRender () {
//     index = 0;
//     ReactDOM.render(<Demo/>, document.querySelector("#root"))
//   }
// }

// const useState = createUseState();

// let index = 0;
// function Demo () {
//   console.count("Demo Render")
//   const [ count, setCount] = useState(calc());
//   const [ name, setName] = useState("joey");
//   const handleAdd = () => {
//     setCount(count + 1);
//   };

//   const handleSubtract = () => {
//     setCount(count - 1);
//   };

//   return <div>
//     <h1>count: {count}</h1>
//     <div onClick={handleAdd}>add</div>
//     <div onClick={handleSubtract}>subtract</div>

//     <div>
//       name: {name}
//     </div>

//     <div onClick={() => setName(Math.random())}>set name</div>
//   </div>
// }

// function useClientViewport () {
//   const [width, setWidth ] = useState(window.innerWidth);
//   let [height, setHeight ] = useState(window.innerHeight);
//   useEffect( () => {
//     window.addEventListener("resize", e => {
//       setWidth(window.innerWidth)
//       setHeight(window.innerWidth);
//     })
//   }, []);

//   return { width ,height };
// }

// function Demo () {
//   const [count, setCount] = useState(0);
//   const { width, height } = useClientViewport();
//   return (
//     <div>
//       <h1>hello world</h1>
//       <div>{count}</div>
//       <div>{width}, {height}</div>
//       <div onClick={() => setCount(count+1)}>add</div>
//     </div>
//   );
// }

export default Demo;

