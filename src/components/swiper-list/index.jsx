import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { region, city } from "./mock.js";
import "swiper/swiper.scss";
import "./index.scss";


class SwiperList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			region,
			city,
		}
	}

	render() {
	  let regionList = this.state.region;
	  let cityList = this.state.city;
	  return (
	    <Swiper
	      loop={true}
	      onSlideChange={() => console.log('slide change')}
	      onSwiper={(swiper) => console.log(swiper)}
	    >
	      <SwiperSlide>
	        {regionList.map((item, index) => {
	          return (
	            <div className="address-item"
	              key={index}>
	              <span className="address-item-text">{item.name}</span>
	              <span className="address-item-icon"></span>
	            </div>
	          );
	        })}
	      </SwiperSlide>

	      <SwiperSlide>
	        {cityList.map((item, index) => {
	          return (
	            <div className="address-item"
	              key={index}>
	              <span className="address-item-text">{item.name}</span>
	              <span className="address-item-icon"></span>
	            </div>
	          );
	        })}
	      </SwiperSlide>
	    </Swiper>
	  );
	}
}

export default SwiperList;