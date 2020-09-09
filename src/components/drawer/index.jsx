import React from "react";
import cx from "classnames";

import "./index.scss";

class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render () {
    return (
      <div className="drawer">
        <div className="drawer-mask"></div>
        <div className="drawer-content">
          <div className="drawer-content-header"></div>
          <div className="drawer-content-body">

          </div>
        </div>
      </div>
    );
  }
}

export default Drawer;