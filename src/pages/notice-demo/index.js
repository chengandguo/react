import React from "react";
import ReactDOM from 'react-dom';
import "./index.scss";

let bottomNode = document.createElement('div');
bottomNode.className = 'i-bottom-container';
document.body.appendChild(bottomNode);

let topNode = document.createElement('div');
topNode.className = 'i-top-container';
document.body.appendChild(topNode);
class Popup extends React.Component {
  handleTouchStart = e => {

  }

  handleTouchMove = e => {
    const { id } = this.props;
    console.log(id);
  }

  handleTouchEnd = e => {

  }

  render () {
    const { children, height, backgroundColor, id } = this.props;
    let node = <div  style={{height: `${height}px`, backgroundColor}}
        className="bottom-popup"
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      > {children}</div>
    let container = id === "top" ? topNode : bottomNode;
    return ReactDOM.createPortal(node, container);
  }
}


class NoticeDemo extends React.PureComponent {
  render () {
    return (
      <>
        <Popup height={500} backgroundColor="blue" id="bottom"/>
        <Popup height={400} backgroundColor="rgb(255, 152, 0, 0.6)" id="top">
          <div className="popup-content" onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}></div>
        </Popup>
      </>
    );
  }
}

export default NoticeDemo;