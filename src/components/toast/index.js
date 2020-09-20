import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import cx from "classnames";
import "./index.scss";

class Toast extends React.PureComponent {
  static propTypes = {
    message: PropTypes.string.isRequired,
    duration: PropTypes.number,
    mask: PropTypes.bool,
  }

  static defaultProps = {
    duration: 3,
    mask: true,
  }

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
    let { message, mask } = this.props;
    return (
      <div className="toast-wrapper">
        {mask && <div className="toast-wrapper-mask"></div>}
        <div className={cx("toast-wrapper-content", {"toast-wrapper-content-enter": isAddEnterStyle})}>
          {message}
        </div>
      </div>
    );
  }
}

// function isObject (obj) {
//   if(Object.prototype.toString(obj) === "[object Object]") {
//     return true;
//   }
//   return false;
// }

let container = null,
  toast = null;
export default {
  info (message, duration, mask) {
    if(container) return;
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
    toast = ReactDOM.render(<Toast {...{message, duration, mask}}/>, container);
    window.setTimeout( () => {
      this.hide();
    }, duration * 1000);
  },

  hide () {
    if(!container) return;
    toast.addEnterStyle();
    window.setTimeout( () => {
      container && ReactDOM.unmountComponentAtNode(container);
      container && document.body.removeChild(container)
      container = null;
    }, 300);

  }
}
