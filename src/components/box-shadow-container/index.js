import React from 'react';
import "./index.scss";


class BoxShadow extends React.Component {
  render () { 
    const { children } = this.props;
    return <div className="box-shadow-container">
      <div className="shadow-top"></div>
      <div className="box-shadow-wrapper">
        <div className="box-shadow-left"></div>
        {children}
        <div className="box-shadow-right"></div>
      </div>
      <div className="shadow-bottom"></div>
      <div className="box-shadow-left-top"></div>
    </div>
  }
}

export default BoxShadow;

