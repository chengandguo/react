import React from "react";
import "./index.scss";


class SvgDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // rotation: 0,
    };
  }

  componentDidMount () {
    console.log("I am from svg matrix demo")
  }

  handleRefresh = () => {
    window.location.reload();
  }

  renderSvg () {
    // const { rotation } = this.state;
    return (
      <svg width="300" height="300" style={{backgroundColor: "#f1f1f1"}}>
        {/* <g fill="red">
          <rect width="100" height="100" x="50" y="50"/>
        </g> */}
        <defs>
          <clipPath id="cut-off-bottom">
            <rect x="0" y="0" width="100" height="100" />
          </clipPath>
        </defs>
        <circle cx="100" cy="100" r="100" fill="blue" clipPath="url(#cut-off-bottom)" />
      </svg>
    );
  }

  render () {
    return <div className="container ruler">
      {/* <div>svg demo</div> */}
      {this.renderSvg()}
      <div className="refresh-btn" onClick={this.handleRefresh}>refresh your page</div>
    </div>
  }
}

export default SvgDemo;