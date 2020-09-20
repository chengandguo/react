import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// redux-saga  
function Home(props) {
  return (
    <div>
      <h1>I am home page</h1>   
      <div>
        <h1>Login: {props.isLogin + ""}</h1>
        <div onClick={() => props.setLogin(true)}>change login state</div>
      </div>
      <Link to="about" className="about-link">to about</Link>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLogin: state.login.isLogin,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setLogin: isLogin => dispatch({
      type: "login/setIsLogin",
      payload: isLogin,
    }),

  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
