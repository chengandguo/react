import React from "react";
import cx from "classnames";

import "./index.scss";

class Center extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      list: [{
        value: "basics",
        isActive: false,
      }, {
        value: "redux",
        isActive: false,
      }, {
        value: "Saga",
        isActive: false
      }],

      isLogin: false,
    }
  }

  addClassName (activeIndex) {
    let newList = this.state.list.map((item,index) => 
      index === activeIndex ? {...item, isActive: true} : {...item, isActive: false});
    
    this.setState({
      list: newList
    });
  }

  setLogin = () => {
    this.setState({
      isLogin: !this.state.isLogin,
    });
  }

  renderFooter () {
    return (
      <div className="footer">
        <h1>I am footer</h1>
        <div>
          I love you
        </div>
      </div>
    );
  }

  render () {
    return (
      <div className="about">
        <h1 onClick={this.setLogin}>I am center page</h1>
        {this.state.isLogin && <div>I am login</div>}
        <ul className="fruit-list">
          {this.state.list.map((item,index) => 
            (<li className={cx("fruit-item", {"fruit-item-active": item.isActive})}
              onClick={this.addClassName.bind(this, index)} 
              key={index}>{item.value}</li>))
          }
        </ul>
        {this.renderFooter()}
      </div>
    );
  }
}

export default Center;
