import React from "react";
import cx from "classnames";
import "./index.scss";


const ThemeContext = React.createContext("light");
class Toolbar extends React.PureComponent {
  render () {
    return (
      <ThemeButton/>
    );
  }
}


class ThemeButton extends React.PureComponent {
  static contextType = ThemeContext;
  render () {
    return (
      <div className={cx("basic", this.context)}>

      </div>
    );
  }
}


class Context extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      theme: "dark"
    }
  }

  handleChangeValue = () => {
    this.setState({
      theme: "bright",
    });
  }

  render () {
    return (
      <div>
        <h1>hello world</h1>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar/>
        </ThemeContext.Provider>

        <div onClick={this.handleChangeValue}>change value</div>
      </div>
    );
  }
}

export default Context;

// React.createContext



