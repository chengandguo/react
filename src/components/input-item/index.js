import React from "react";
import "./index.scss";


class Input extends React.PureComponent {
  constructor (props) {
    super(props);
    this.inputRef = React.createRef();
  }

  handleFocus = () => {
    this.inputRef.current.focus();
  }


  handleChange = value => {
    this.props.onChange(this.props.name, value);
  }

  render () {
    let { 
      title,
      value,
    } = this.props;

    return (
      <div className="input-item">
        <label className="input-item-label"
          onClick={this.handleFocus}>
            {title}
        </label>
        <div className="input-item-content">
          <input
            ref= {this.inputRef}
            value={value} 
            type="text" 
            onChange={e => this.handleChange(e.target.value)}/>
          {
            value && <div className="input-item-content-clear"
            onClick={ () => this.handleChange("")}>
              clear
          </div>
          }
        </div>
      </div>
    );
  }
}

export default Input;