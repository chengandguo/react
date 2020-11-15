import React from "react";
import Carousel from "@/components/carousel";
import "./index.scss";


class CarouselDemo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      dataSource: ["A", "B", "C",],
    }
  }

  componentDidMount () {
    window.setTimeout(() => {
      this.setState({
        dataSource: [...this.state.dataSource, "D", "E", "F"],
      });
    }, 4000);
  }

  render() {
    let {dataSource} = this.state;
    return (
      <Carousel className="carousel-demo"
        dataSource={dataSource}
        stayTime={2000} transitionTime={300} />
    );

  }
}

export default CarouselDemo;