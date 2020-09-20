import React, { PureComponent } from "react";
import cx from "classnames";
import "./index.scss";


let ThemeContext = React.createContext({});
class Toolbar extends PureComponent {
  render () {
    return <ThemeButton></ThemeButton>;
  }
}


class ThemeButton extends PureComponent {
  static contextType = ThemeContext;

  handleClick = () => {
    console.log("show something");
  }

  render () {
    return (
      <div className="theme-button">
        <div className={cx("basic", this.context.theme)} onClick={this.handleClick}>
          create
        </div>
        <div onClick={this.context.toggleTheme}>
          toggle theme
        </div>
      </div>

    );
  }
}


function Card () {
  return (
    <ThemeContext.Consumer>
      { ({title }) => <div>{title}</div>}
    </ThemeContext.Consumer>
  );
}

class ContextDemo extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      theme: "light",
      title: "A Cat Named Reeo",
      toggleTheme: () => {
        this.setState(state => ({
          theme: state.theme === "light" ? "dark" : "light",
        }));
      }
    }
  }

  changeTheme = () => {
    if(this.state.theme === "light") {
      this.setState({
        theme: "dark",
      });
    } else {
      this.setState({
        theme: "light"
      });
    }
  }

  render () {
    return (
      <div>
        <h1>context demo</h1>
        <div onClick={this.changeTheme}>change Theme</div>
        <ThemeContext.Provider value={this.state}>
          <Toolbar></Toolbar>
          <Card></Card>
        </ThemeContext.Provider>
      </div>
    );
  }
}

export default ContextDemo;

