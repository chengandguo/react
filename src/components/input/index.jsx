import React from "react";
import cx from "classnames";
import "./index.scss";


class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLabelTop: false,
      isShowPlaceholder: false,
      isShowFocusState: false,
    }
  }

  handleFocus = () => {
    this.inputElem.focus();
    if(!this.props.error) {
      this.setState({
        isShowFocusState: true,
      });
    }
  }

  handleBlur = () => {
    this.setState({
      isShowFocusState: false,
    });
  }

  handleLabelClick = () => {
    this.setState({
      isLabelTop: true,
      isShowFocusState: true,
    });
    this.inputElem.focus();
  }

  handleClear = () => {
    this.handleFocus();
  }

  render() {
    let { isLabelTop, isShowFocusState } = this.state;
    let { label, placeholder, error } = this.props;
    return (
      <div className={cx("input-item", {
        "input-item-focus": isShowFocusState,
        "input-item-error": !!error,
      })}>
        <input className="input-text"
          ref={elem => this.inputElem = elem}
          placeholder={placeholder}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          type="text" />
        <p className={cx("input-label", { "input-label-top": isLabelTop })}
          onClick={this.handleLabelClick}>{label}</p>
        <div className="input-clear" onClick={this.handleClear}></div>
        {error && <span className="input-error">{error}</span>}
      </div>
    );
  }
}

Input.propTypes = {

}

Input.defaultProps = {

}

export default Input;