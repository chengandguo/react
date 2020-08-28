import React from "react";
import ReactDOM from "react-dom";
import cx from "classnames";
import "./index.scss";

class Loading extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      isAddEnterStyle: true,
    }
  }

  async componentDidMount () {
    await new Promise(resolve => {
      window.setTimeout( () => {
        resolve();
      }, 0);
    });
    this.setState({
      isAddEnterStyle: false,
    });
  }

  addEnterStyle () {
    this.setState({
      isAddEnterStyle: true,
    });
  }

  render () {
    let { isAddEnterStyle } = this.state;
    return (
      <div className={cx("loading-wrapper", {"loading-wrapper-enter": isAddEnterStyle})}>
        <div className="loading-circle"></div>
      </div>
    );
  }
}

let container = null,
  loading = null;
export default {
  show () {
    if(!container) {
      container = document.createElement("div");
      container.className = "loading-container";
      document.body.appendChild(container);
    }
    loading = ReactDOM.render(<Loading/>, container);
  },

  hide () {
    if(!container) return;
    loading && loading.addEnterStyle();
    window.setTimeout( () => {
      ReactDOM.unmountComponentAtNode(container);
    }, 300);

  }
}
