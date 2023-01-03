import React from "react";
import "./index.scss";

class NextDemo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      contentTopHeight: 0,
      left: 0,
      // overflowY: "hidden",
    }
  }

  componentDidMount () {
    console.log(this.containerRef.scrollHeight);
    this.init();
    // this.handleScroll ();
  }

  handleScroll () {
    window.addEventListener("scroll", e => {
      const scrollTop = document.documentElement.scrollTop;
      console.log(scrollTop, this.swiperWrapperRef.offsetTop);
      if(scrollTop >= this.swiperWrapperRef.offsetTop) {
        this.setState({
          overflowY: "scroll",
        })
      } else {
        this.setState({
          overflowY: "hidden",
        });
        document.querySelectorAll(".swiper-item").forEach(item => {
          item.scrollTop = 0;
        })
      }
    })
  }

  init () {
    this.setState({
      contentTopHeight: this.contentTopRef.clientHeight,
    });
  }

  handleSetTransform (x=0) {
    this.setState({
      left: x,
    });
  }

  handleSwiperItemScroll = e => {
    // const scrollTop = e.target.scrollTop;
    // e.target.scrollTop = 0;
  }


  render () {
    const { contentTopHeight, left, overflowY } = this.state;
    return (
      <div className="my-container" ref={elem => this.containerRef = elem}>

        <div className="switch-btn">
          <div onClick={() => this.handleSetTransform()}>left</div>
          <div onClick={() => this.handleSetTransform("-50%")}>right</div>
        </div>

        <div className="content-top" 
          ref={elem => this.contentTopRef = elem}>
          {contentTopHeight}
        </div>

        <div className="swiper-wrapper" ref={elem => this.swiperWrapperRef = elem}>
          <ul className="swiper-list" style={{transform: `translateX(${left})`}}>
            <li className="swiper-item" style={{"overflowY": overflowY}}
              onTouchMove={this.handleTouchMove}
              // onScroll={this.handleSwiperItemScroll}
              >
              {new Array(100).fill(1).map((item, index) => (<div key={index}>{index}</div>))}
            </li>
            <li className="swiper-item" style={{"overflowY": overflowY}}>
              {new Array(200).fill(1).map((item, index) => (<div key={index}>{index}</div>))}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default NextDemo;
