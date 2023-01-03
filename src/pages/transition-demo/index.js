import React from "react";
import Transition from "@/components/transition";
import "./index.scss";

class TransitionDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true,
    }
  }

  handleClick = () => {
    const { isShow } = this.state;
    this.setState({
      isShow: !isShow,
    });
  }

  render () {
    const { isShow } = this.state;
    return (
      <div className="stage">
        <div onClick={this.handleClick} className="toggle-btn">toggle</div>
        <Transition name="fade" visible={isShow} appear={true}>
          <div>I love you</div>
        </Transition>
      </div>
    );
  }
}

export default TransitionDemo;