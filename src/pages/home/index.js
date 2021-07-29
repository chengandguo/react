import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


// redux-saga  
function Home(props) {
  window.onload = () => {
    document.addEventListener("click", e => {
      console.log(e.target.href)
      e.preventDefault()
    });
  }

  return (
    <div>
      <h1>I am home page</h1>   
      <a href="https://www.baidu.com">go baidu</a>
      <div>
        <h1>Login: {props.isLogin + ""}</h1>
        <div onClick={() => props.setLogin(true)}>change login state</div>
      </div>
      <Link to="about" className="about-link">to about</Link>
      <div className="detail-notice">
        <span>I love you</span>
        <span></span>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLogin: state.login.isLogin,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setLogin: isLogin => dispatch({
      type: "login/setIsLogin",
      payload: isLogin,
    }),

  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

// let params = {
//   avatar: "//www.baidu.com'",
// }
// checkSpecialChar(params);
// console.log(params);
// function checkSpecialChar (params) {
//   if(!params.avatar) return;
//   let avatar = decodeURIComponent(params.avatar);
//   let pattern = /^(https?:)?\/\/:?/;
//   let list = ["'", '"', ">", "<"];
//   if(pattern.test(avatar)) {
//     for(let i=0; i<list.length; ++i) {
//       if(avatar.indexOf(list[i]) > 0) {
//         delete params.avatar;
//         return;
//       } 
//     }
//   } else {
//     delete params.avatar;
//   }
// }

// P1
// Function.prototype._bind = function (context={}, ...args) {
//   let that = this;
//   return function (...others) {
//     that.apply(context, [...args, ...others]);
//   }
// }

// function func (x) {
//   console.log(x, this.y);
// }

// func._bind({y: "foo"})();
// func._bind()();
// func._bind({y: "bar"}, "foo")();


// // P3
// class Money {
//   constructor (fen) {
//     this.fen = fen;
//   }

//   static add (...args) {
//     let total = 0;
//     args.forEach(item => total += item.fen);
//     return new Money(total);
//   }

//   add (instance) {
//     return new Money(this.fen + instance.fen);
//   }

//   valueOf () {
//     return this.fen;
//   }

//   toString () {
//     return this.switch(this.fen);;
//   }

//   switch (fen) {
//     let yuan = Math.floor(fen / 100),
//       jiao = Math.floor(fen % 100 / 10);
//     fen = fen % 10;
//     let result = [];
//     (yuan !== 0) && result.push(`${yuan}元`);
//     (jiao !== 0) && result.push(`${jiao}角`);
//     (fen !== 0) && result.push(`${fen}分`);
//     return result.join("");
//   }
// }

// const c1 = new Money(99);
// const c2 = new Money(88);
// console.log(`${c1}`);
// const c3 = c1.add(c2);
// console.log(`${c3}`);
// const c4 = Money.add(c1, c2);
// console.log(`${c4}`)
// const c5 = new Money(c1 + c2);
// console.log(`${c3}`, `${c4}`, `${c5}`);

// // P2
// let obj = {
//   // a: [1, 2, 3, 4]
//   a: 1,
//   b: [1, 2, {c: true}, [3], {a: 10, b: 20}],
//   d: {
//     e: 2,
//     f: 3,
//   },
//   g: null,
// };

// console.log(flatten(obj))


// function flatten (obj) {
//   let result = {};
//   for(let [key, value] of Object.entries(obj)) {
//     if(isObject(value)) {
//       let subResult = {};
//       for(let [subkey, subValue] of Object.entries(value)) {
//         subResult[key +"."+subkey] = subValue;
//       }
//       result = {
//         ...result,
//         ...flatten(subResult),
//       }
//     } else if(isNull(value)) {
//       result[key] = value;
//     } else if(isArray(value)) {
//       let subResult = {};
//       for(let [subKey, subValue] of value.entries()) {
//         subResult[key + "[" + subKey + "]"] = subValue;
//       }
//       result = {
//         ...result,
//         ...flatten(subResult),
//       }
//     } else {
//       result[key] = value;
//     }

//   }
//   return result;
// }

// function isObject (obj) {
//   return Object.prototype.toString.call(obj) === "[object Object]";
// }

// function isNull (obj) {
//   return Object.prototype.toString.call(obj) === "[object Null]";
// }

// function isArray (arr) {
//   return Object.prototype.toString.call(arr) === "[object Array]";
// }


// const o = { a: 1, b: [1, 2, { c: true }], d: { e: 2, f: 3 }, g: null };
// // { "a": 1, "b[0]": 1, "b[2]": 2, "b[2].c": true }
// // function isObject(o) {
// //   return toString.call(o) === '[object Object]';
// // }
// function flatten1(o) {
//   const ret = {};
//   function recur(target, acc) {
//     for(let x in target) {
//       if (target.hasOwnProperty(x)) {
//         let key = '';
//         if (Array.isArray(target)) {
//           key = `${acc}[${x}]`;
//         } else {
//           key = acc ? `${acc}.${x}` : x;
//         }
//         const value = target[x];
//         if (Array.isArray(value)) {
//           recur(value, key);
//         } else if (value === null) {
//           ret[key] = value;
//         } else if (isObject(value)) {
//           recur(value, key);
//         } else {
//           ret[key] = value;
//         }
//       }
//     }
//   }
//   recur(o, '');
//   return ret;
// }
// console.log(flatten1(o));
