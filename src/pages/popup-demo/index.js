import React, { PureComponent } from "react";
import Popup from "@/components/popup/index.js";
import "./index.scss";


class PopupDemo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visibility: true,
    }
  }

  show = () => {
    this.setState({
      visibility: true,
    });
  }

  onClose = () => {
    this.setState({
      visibility: false,
    });
  }

  render () {
    let { visibility } = this.state;
    return (
      <div>
        <div onClick={this.show}>show</div>
        <Popup visibility={visibility} onClose={this.onClose}/>
      </div>
    );
  }
}

export default PopupDemo;