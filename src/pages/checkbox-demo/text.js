import React from "react";


class Test extends React.Component {

  a() {
    return (
      <div className="a">

      </div>
    );
  }

  renderFruit() {
    return (
      <div className="container">
        <div className="wrapper fruit-wrapper">
          <ul className="fruit-list">
            <li className="fruit-item"></li>
          </ul>
        </div>
      </div>
    );
  }

  c() {
    return (
      <div className="container wallet">
        <div>
          <h1 className="wallet-title"></h1>
          <h1 className="wallet-content">
            <div>
              <h1></h1>
              <p>
                <a href="" className="wallet-link"></a>
                <a href="" className="wallet-link"></a>
              </p>
            </div>
          </h1>
        </div>
      </div>
    );
  }

  d() {
    return (
      <div className="a">
        hello
        <div className="qq">qq</div>
      </div>
    );
  }

  e() {
    return (
      <div className="a">
        <a href="" className="aa">fff</a>
        <div>hello<span className="b">qq</span></div>
      </div>
    );
  }

  f() {
    return (
      <div className="container">
        <div className="wrapper">
          <ul className="fruit-list">
            <li className="fruit-item abc">
              <span></span>
              <a href=""></a>
              <div className="a">ff</div>
              <div></div>
              <div className="fruit-item-title"></div>
              <div className="fruit-item-title"></div>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  g() {
    <div className="container">
      <h1></h1>
      <div>aa</div>
    </div>
  }

  h() {

  }
}

export default Test;
