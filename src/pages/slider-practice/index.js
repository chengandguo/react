import React from "react";
import Slider from "@/components/slider/index.js";

class SliderPractice extends React.Component {
  constructor (props) {
    super(props);
    this.sliderRef = React.createRef();
  }

  handleSuccess = () => {
    console.log("I am success function");
    console.log("The Slider will reset after 3 seconds");
    window.setTimeout( () => {
      this.sliderRef.current.reset();
    }, 3000);
  }

  render () {
    return (
      <Slider ref={this.sliderRef}
        trackText="slide to get email code" 
        onSuccess={this.handleSuccess}/>
    );
  }
}

export default SliderPractice;