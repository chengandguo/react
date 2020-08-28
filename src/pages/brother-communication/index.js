import React from "react";
import "./index.scss";
import { withRouter } from "react-router";

class BrotherCommunication extends React.Component {
  gotoAboutPage = () => {
    console.log(this.props);
    this.props.history.push({
      pathname: "/about",
      search: "name=chengzhen&age=28"
    });
  }

  render () {
    return (
      <div>
        <h1>I am brother communication</h1>
        <div onClick={this.gotoAboutPage}>goto about page</div>
      </div>
    );
  }
}

export default withRouter(BrotherCommunication);