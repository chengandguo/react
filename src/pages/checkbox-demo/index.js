import React from "react";
import "./index.scss";
import Checkbox from "@/components/checkbox/index.js";
// import {Checkbox} from "antd-mobile";

class CheckboxDemo extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      checked: true,
    }
  }

  create = () => {
    console.log(this.state);
  }

  handleChange= value => {
    console.log(value)
   this.setState({
    checked: value,
   }); 
  }

  render () {
    return (+-
      <div className="checkbox-demo">
        <h1>checkbox demo</h1>
        <Checkbox checked={this.state.checked} onChange={this.handleChange}>
          I agree to Lazada agreement
        </Checkbox>
        <div class="test-block"></div>
        <div onClick={this.create}>create</div>
      </div>
    );
  }
}


export default CheckboxDemo;