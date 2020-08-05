import React from 'react';
import './App.scss';
import Dialogue from "./components/dialogue";

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      name: "",
      mobile: "",
      isShow: true,
    }
  }

  textChange = (e) => {
    let {name, value} = e.target;
    this.setState({
      [name]: value,
    });
  }

  createOrder () {
    this.setState({
      isShow: true,
    });
    console.log(this.state);
  }

  render () {
    return (
      <div className="container">
        <div className="item">
          <div className="item-title">姓名</div>
          <div className="item-content">
            <input type="text" 
              name="name" 
              autoComplete="off" 
              placeholder="请输入姓名"
              value={this.state.name} 
              onChange={this.textChange}/>
          </div>
        </div>

        <div className="item">
          <div className="item-title">手机号</div>
          <div className="item-content">
            <input type="number" 
              name="mobile" 
              autoComplete="off"
              placeholder="请输入手机号"
              value={this.state.mobile} 
              onChange={this.textChange}/>
          </div>
        </div>

        <div className="create-btn" 
          onClick={this.createOrder.bind(this)}>立即下单</div>

        <Dialogue className="warm-notice" isShow={this.state.isShow}>
          <div className="warm-content">温馨提示</div>
        </Dialogue>
      </div>
    );
  }
}


export default App;
