import React, { useState } from "react";
import { Scroll, List } from "@ali/infinite-ui";
import cx from "classnames";
import { sleep } from "../../utils/utils";
import "./index.scss";

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      innerVisible: false,
      isAddSliderClass: true,
    };
  }

  componentDidUpdate (prevProps) {
    let { visible } = this.props;
    if(visible && !this.state.innerVisible && this.state.isAddSliderClass) {
      this.setState({
        innerVisible: true,
      });
      window.setTimeout(() => {
        this.setState({
          isAddSliderClass: false,
        });
      }, 0)
    }

    if(!visible && this.state.innerVisible && !this.state.isAddSliderClass) {
      this.setState({
        isAddSliderClass: true,
      });

      window.setTimeout( () => {
        this.setState({
          innerVisible: false,
        });
      }, 300);
    }
  }

  componentDidMount () {
  }

  render () {
    let { innerVisible, isAddSliderClass } = this.state;
    return innerVisible ? (
    <div className={cx(["slider", {"slider-enter": isAddSliderClass}])}>
      <h1>I am a slider</h1>
      <div onClick={this.props.handleCloseEvent}>close</div>
    </div>) : null
  }
}

class Test extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidUpdate () {
  }

  setVisible = () => {
    this.setState({
      visible: true,
    });
  }

  render () {
    return (
      <div>
        <h1>I am Test Component</h1>
        <div onClick={this.setVisible}>set isShow</div>
        {this.state.visible && <div>I am test block</div>}
      </div>
    );
  }
}

let count = 0

async function mockRequest() {
  if (count >= 5) {
    return []
  }
  await sleep(100000)
  count++
  return [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
  ]
}

function ScrollComponent () {
  const [data, setData] = useState([])
  const [hasMore, setHasMore] = useState(true)
  async function loadMore() {
    const append = await mockRequest()
    setData(val => [...val, ...append])
    setHasMore(append.length > 0)
  }

  return (
    <>
      <List>
        {data.map((item, index) => (
          <List.Item key={index}>{item}</List.Item>
        ))}
      </List>
      <Scroll loadMore={loadMore} hasMore={hasMore} />
    </>
  )
}


export default function () {
  let [visible, setVisible] = useState(false);

  return (
    <div className="center">
      <h1>I am center page</h1>
      <div onClick={() => setVisible(true)}>showSlider</div>
      <Slider 
        visible={visible}
        handleCloseEvent={() => setVisible(false)}
      />
      <Test/>
      <ScrollComponent></ScrollComponent>
    </div>
  );
}


