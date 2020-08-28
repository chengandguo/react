import React from "react";
import InputItem from "@/components/input-item/index.js";
import loading from "@/components/loading/index.js";
import "./index.scss";



class ReduxActionsPractice extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
    }
  }

  submit = () => {
    loading.show();
    console.log(this.state);
  }

  hide = () => {
    loading.hide();
  }

  handleInputChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  }

  render () {
    let { name, phone } = this.state;
    return (
      <div className="redux-action">
        <h1>redux actions</h1>
        <InputItem title="Name" name="name" value={name} onChange={this.handleInputChange}/>
        <InputItem title="Phone" name="phone" value={phone} onChange={this.handleInputChange}/>
        <div onClick={this.submit}>get state</div>
        <div onClick={this.hide}>loading hide</div>
      </div>
    );
  }
}


export default ReduxActionsPractice;
