import React from "react";
import { isWeex, isWeb } from "universal-env";

console.log(isWeex, isWeb);
class QueryStringDemo extends React.Component {
  // constructor (props) {
  //   super(props);
  // }

  render () {
    return (
      <div>
        query string demo
      </div>
    );
  }
}

export default QueryStringDemo;

// 

