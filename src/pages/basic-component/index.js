import React from "react";
import "./index.scss";
import Loading from "@/components/loading/index.js";
import Toast from "@/components/toast/index.js";
// import {Toast} from "antd-mobile";

class BasicComponent extends React.PureComponent {

  showLoading = () => {
    // Loading.show();
    Toast.info("hello world", 2, false);
    // Toast.info("hello world", 300)
  }

  hideLoading = () => {
    Loading.hide();
  }

  render () {
    return (
      <div>
        <h1>basic component test</h1>
        <div onClick={this.showLoading}>show loading</div>
        <div onClick={this.hideLoading}>hide loading</div>
      </div>
    );
  }
}

export default BasicComponent;


// Toast Radio 