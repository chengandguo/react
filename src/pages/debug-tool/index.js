import React from "react";
import "./index.scss";


function queryState () {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve({
        state: "PROCESS"
      })
    }, 1000);
  });
}

let QUERY_CONFIG = {
  MAX_TIMES: 3,
  TIME_INTERVAL: 2000,
}

let currentCount = 0;  // current query count
class DebugTool extends React.PureComponent {
  handleClick = () => {
    let a = 10,
      b = 20;
    let c = a + b + this.getCurrentValue();
    console.log(c);
  }

  componentDidMount () {
    this.queryUploadState(123)
  }

  queryUploadState (taskId) {
    currentCount++;
    queryState({taskId}).then(res => {
      switch(res.state) {
        case "PROCESS":
          console.log("process");
          if(currentCount < QUERY_CONFIG.MAX_TIMES) {
            this.timeId = window.setTimeout( () => {
              this.queryUploadState(taskId);
            }, QUERY_CONFIG.TIME_INTERVAL);
          } else {
            console.log("fail");
          }
          break;
        case "SUCCESS":
          console.log("success");
          break;
        case "FAIL":
        default:
          console.log("fail")
      }
    })
  }

  getCurrentValue () {
    return 10;
  }

  render () {
    return (
      <div className="debug-tool abc" id="abc">
        <h1>debug tool</h1>
        <div onClick={this.handleClick}>add 1</div>
      </div>
    );
  }
}

export default DebugTool;



