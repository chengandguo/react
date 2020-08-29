import React from "react";
import { connect } from "react-redux";


let mapStateToProps = state => ({
  address: state.address,
});


let mapDispatchToProps = dispatch => ({
  setAddress: value => dispatch({
    type: "SET_ADDRESS",
    payload: value,
  }),

  getAddress: () => dispatch({
    type: "GET_ADDRESS",
  }),
});


class TransitionPractice extends React.Component {

  getAddress = () => {
    this.props.getAddress();
  }

  render () {
    let { province, city, district } = this.props.address;
    return (
      <div className="transition-practice">
        <h1>transition practice</h1>
        <div className="address">
          <h1>Here is address</h1>
          <div>province: {province}</div>
          <div>city: {city}</div>
          <div>district: {district}</div>
        </div>

        <div onClick={this.getAddress}>get address</div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransitionPractice);