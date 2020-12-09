import React, { PureComponent } from "react";
import "./index.scss";
import { withRouter } from "react-router";
import Context, {initialState, } from "./context.js";


class Express extends PureComponent {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    }
  }

  gotoAddress = () => {
    this.props.history.push({
      pathname: "/address",
      search: `name=${this.state.address.province}`
    });
  }

  render () {
    return (
      <Context.Provider value={this.state}>
        <div className="express">
          <div className="express-item" onClick={this.gotoAddress}>
            <h1>address</h1>
            <div>{this.state.address.province}</div>
          </div>

          <div className="express-item">
            <h1>company</h1>
            <div>{this.state.company.name}</div>
          </div>

          <div className="express-item">
            <h1>parcel</h1>
            <div></div>
          </div>
        </div>
      </Context.Provider>
    );
  }
}



export default withRouter(Express);
