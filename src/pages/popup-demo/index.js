import React, { PureComponent } from "react";
import Popup from "@/components/popup/index.js";
import cx from "classnames";
import "./index.scss";


class PopupDemo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      selectedFruit: "",
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

  handleSelectFruit (item){
    this.setState({
      selectedFruit: item,
      visibility: false,
    });
  }

  renderTable () {
    let list = ["apple", "banana", "coconut", "pineapple"];
    return (
      <ul className="fruit-list">
        {list.map((item, index) => 
          <li className={cx("fruit-item", {"fruit-item-active": this.state.selectedFruit === item})}
            onClick={() => this.handleSelectFruit(item)} key={index}>{item}</li>)}
      </ul>
    );
  }

  render () {
    let { visibility, selectedFruit } = this.state;
    return (
      <div>
        <div onClick={this.show}>choose fruit</div>
        <div>selected fruit: {selectedFruit}</div>
        <Popup visibility={visibility}
          title="Select your fruit"
          onClose={this.onClose}>
            { this.renderTable() }
        </Popup>
      </div>
    );
  }
}

export default PopupDemo;