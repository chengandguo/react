import React from "react";
import cx from "classnames";
import "./index.scss";


const E = 0.1;

class Tab extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      left: 0,
    }
  }

  handleClick = (e, index) => {
    this.setSliderLeft(e.target);
    this.setScroll(e.target);
    this.props.onSwitch(index);
  }

  setSliderLeft(target) {
    let itemLeft = target.offsetLeft;
    let itemWidth = target.clientWidth;
    let barWidth = this.sliderElem.clientWidth;
    this.setState({
      left: itemLeft + (itemWidth - barWidth) / 2,
    });
  }

  setScroll(target) {
    let bodyWidth = document.querySelector("body").clientWidth;
    let itemLeft = target.offsetLeft;
    let itemWidth = target.clientWidth;
    let scrollLeft = this.tabElem.scrollLeft;
    if (itemLeft < bodyWidth + scrollLeft && 
      itemLeft + itemWidth > bodyWidth + scrollLeft) {  // right border
      this.smoothScrollTo(this.tabElem, scrollLeft + itemWidth, 0);
    } else if (scrollLeft > itemLeft && scrollLeft < itemLeft + itemWidth) {  // left border
      let left = itemLeft - 60;
      if (left < 0) {
        left = 0;
      }
      this.smoothScrollTo(this.tabElem, left, 0);
    }
  }

  smoothScrollTo (element, left, top) {
    let currentLeft = element.scrollLeft,
      currentTop = element.scrollTop,
      speed = 6;
    (function loop () {
      currentLeft += (left - currentLeft) / speed;
      currentTop += (top - currentTop) / speed;
      element.scrollTo(currentLeft, currentTop);

      if(Math.abs(left - currentLeft) < E && Math.abs(top - currentTop) < E) {
        element.scrollTo(left, top);
        return;
      }
      window.setTimeout( () => {
        loop();
      }, 1000 / 60);
    })();
  }

  render() {
    let { tab } = this.props;
    let { left } = this.state;
    return (
      <div className="tab" ref={elem => this.tabElem = elem}>
        <ul className="tab-list">
          {tab.map((item, index) => (
            <li className={cx("tab-item", { "tab-item-active": item.isActive })}
              key={index}
              onClick={e => this.handleClick(e, index)}>
              {item.label}
            </li>
          ))}
        </ul>

        <div ref={elem => this.sliderElem = elem} className="tab-slider"
          style={{ left: `${left}px`, }}></div>
      </div>
    );
  }
}

export default Tab;