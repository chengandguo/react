import React from "react";
import cx from "classnames";

import "./index.scss";

class Checkbox extends React.PureComponent {
  constructor (props) {
    super(props);
    console.log(props);
    this.state = {
      checked: this.props.checked,
    }
  }

  handleChange = () => {
    let { onChange } = this.props;
    this.setState({
      checked: !this.state.checked,
    }, () => {
      typeof onChange === "function" && onChange(this.state.checked);
    });
  }


  render () {
    console.log("checkbox render", this.state.checked)
    let { children } = this.props;
    let { checked } = this.state;
    return (
      <label className="checkbox-container" onClick={this.handleChange}>
        <span className={cx("checkbox-basic", {"checkbox-checked": checked})}></span>
        <span className="checkbox-text">{children}</span>
      </label>
    );
  }
}

export default Checkbox;