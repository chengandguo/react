import React from "react";
import { connect } from "react-redux";
import {setLogin} from "@/store/reducers/thunk.js";


let mapStateToProps = (state, ownProps) => ({
  isLogin: state.thunk.isLogin
});

let queryLogin = () => {
  return dispatch => {
    new Promise((resolve, reject) => {
      window.setTimeout( () => {
        resolve(true);
      }, 1000);
    }).then(res => {
      dispatch({
        type: "SET_LOGIN",
        payload: res,
      });
    })
  }
}

let mapDispatchToProps = (dispatch, ownProps) => ({
  setLogin: value => dispatch(setLogin(value)),
  queryLogin:() => dispatch(queryLogin()),
});


class Thunk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Reeo",
    }
  }

  changeLoginState = () => {
    // this.props.queryLogin();
    this.props.setLogin(!this.props.isLogin);
  }

  render() {
    return (
      <div>
        <h1>I am thunk</h1>
        <div>{this.state.name}</div>
        <div>
          login state: {this.props.isLogin.toString()}
        </div>
        <div onClick={this.changeLoginState} style={{cursor: "pointer", userSelect: "none"}}>
          change login state
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Thunk);
