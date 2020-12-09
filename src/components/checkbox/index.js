import React from "react";
import cx from "classnames";

import "./index.scss";

class Checkbox extends React.PureComponent {
  handleChange = () => {
    let { onChange, checked } = this.props;
    typeof onChange === "function" && onChange(!checked);
  }


  render () {
    let { children, className, checked } = this.props;
    return (
      <label className={cx("checkbox-container", className)} onClick={this.handleChange}>
        <span className={cx("checkbox-basic", {"checkbox-checked": checked})}></span>
        <span className="checkbox-text">{children}</span>
      </label>
    );
  }
}

export default Checkbox;