import React from 'react';
import "./index.scss";

class Transition extends React.Component {
  constructor (props) {
    super(props);
    const {name} = props;
    this.state = {
      currentClassName: `${name}-enter-from`,
      innerVisible: props.visible,
    };

    this.transitionEndFlag = false;
    this.clientWidth = null;  // just this to trigger reflow
  }

  componentDidMount () {
    const { name, appear } = this.props;
    if(appear) {
      this.clientWidth = document.body.clientWidth;
      this.setState({
        currentClassName: `${name}-enter-active ${name}-enter-to`,
      });
    }
  }

  componentWillReceiveProps (nextProps) {
    const { name } = nextProps;
    if(nextProps.visible !== this.props.visible) {
      if(nextProps.visible) {
        this.setState({
          innerVisible: true,
        }, () => {
          this.clientWidth = document.body.clientWidth;
          this.setState({
            currentClassName: `${name}-enter-active ${name}-enter-to`,
          });
        });
      } else {
        this.setState({
          currentClassName: `${name}-leave-active ${name}-leave-to`,
        });
        this.transitionEndFlag = false;
      }
    }
  }

  handleTransitionEnd = () => {
    const { visible, name } = this.props;
    if(!visible && !this.transitionEndFlag) {
      this.transitionEndFlag = true;
      this.setState({
        innerVisible: false,
        currentClassName: `${name}-enter-from`,
      })
    }
  }

  render () {
    const { children } = this.props;
    const { currentClassName, innerVisible } = this.state;
    if(!innerVisible) return null;
    return (
      <div className={currentClassName} onTransitionEnd={this.handleTransitionEnd}>
        { children }
      </div>
    );
  }
}

export default Transition;

// name-enter-from
// name-enter-active
// name-enter-to

// name-leave-from
// name-leave-active
// name-leave-to