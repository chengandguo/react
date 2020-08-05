import React from 'react';
import "./index.scss";

class Dialogue extends React.Component {
  render () {
    console.log(this.props.className)
    return (
      this.props.isShow && (<div className={this.props.className + " dialogue"}>
        <div className="dialogue-mask"></div>
        <div className="dialogue-content">
          {this.props.children}
          <div className="dialogue-btn">
            <div>取消</div>
            <div>确定</div>
          </div>
        </div>
        
      </div>)
    );
  }
}

export default Dialogue;

