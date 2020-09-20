import React, { PureComponent } from "react";
import Context from "@/pages/express/context.js";
import cx from "classnames";
import { withRouter } from "react-router";
import { URLSearchParser } from "@/utils/UrlSearchParser.js";
import "./index.scss";


class Address extends PureComponent {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      list: [
        "Anhui",
        "Jilin",
        "Guangdong",
        "Hunan",
        "Guangxi"
      ]
    }
    this.currentAddress = new URLSearchParser().get("name");
  }

  handleClick(item) {
    this.context.setAddress(item);
    this.props.history.go(-1);
  }


  render() {
    return (
      <ul className="address">
        {this.state.list.map(item =>
          <li className={cx({ "active": item === this.currentAddress })}
            key={item}
            onClick={() => this.handleClick(item)}>
            {item}
          </li>)}
      </ul>
    );
  }
}

export default withRouter(Address);

// history location match
