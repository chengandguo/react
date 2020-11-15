import React from "react";
import "./index.scss";

class Notice extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      trimText: "",
    };
  }

  componentDidMount() {
    this.setTrimText();
  }

  setTrimText() {
    let { text, lines } = this.props,
      font = window.getComputedStyle(this.contentElem).font,
      totalWidth = this.getTextWidth(text, font),
      singleCharLength = totalWidth / text.length,
      ellipsisLength = this.getTextWidth("...", font),
      iconMarginLeft = Number.parseInt(window.getComputedStyle(this.iconElem).marginLeft),
      trimTextLength = (this.noticeElem.clientWidth * lines - 
        this.iconElem.clientWidth - iconMarginLeft - ellipsisLength) / singleCharLength;
    console.log(this.getTextWidth(text.slice(0, trimTextLength), font))
    this.setState({
      trimText: text.slice(0, trimTextLength)
    });
  }

  getTextWidth(text, font) {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
  }

  render() {
    let { image, text} = this.props;
    let { trimText } = this.state;
    return (
      <div className="notice"
        ref={elem => this.noticeElem = elem}>
        <span className="notice-content"
          ref={elem => this.contentElem = elem}>
          {trimText}
        </span>
        {text.length > trimText.length && (<span>...</span>)}
        <i className="notice-icon"
          ref={elem => this.iconElem = elem}
          style={{ backgroundImage: `url(${image})` }}></i>
      </div>
    );
  }
}




export default Notice;