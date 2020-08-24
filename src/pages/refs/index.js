import React from "react";
import "./index.scss";


class RefPractice extends React.Component {
  constructor (props) {
    super(props);
    this.setInputElement = elem => {
      this.inputElem = elem;
    }

    this.rectRef = React.createRef();
  }

  focusInput = () => {
    this.inputElem.focus();
  }

  componentDidMount () {
    let rectElem = this.rectRef.current;
    console.log(rectElem.clientWidth, rectElem.clientHeight, rectElem.offsetLeft);
  }

  render () {
    return (
      <div className="container">
        <input type="text" ref={this.setInputElement}/>
        <div onClick={this.focusInput}>focus the input</div>
        <div className="rect" ref={this.rectRef}></div>
      </div>
    );
  }
}

export default RefPractice;