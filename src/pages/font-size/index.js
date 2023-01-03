import React from "react";
import "./index.scss";


class RefPractice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // text: "hello world"
      text: "hello world, do you love me and give me one more chance"
    }
  }

  renderSalute() {
    return (<>
      <div className="abc">
        Nice to meet you
      </div>
    </>);
  }

  render() {
    const { text } = this.state;
    return (
      <div>
        <div>one month warranty</div>
        <svg id="text-svg" width={text.length} height="9">
          <text x="0"
            y="9"
            id="text-size"
            fontSize="9"
            dominantBaseline="baseline">
            {text}
          </text>
        </svg>

        {this.renderSalute()}
      </div>
    );
  }
}

export default RefPractice;
