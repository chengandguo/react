import React from "react";
import Input from "@/components/input";
import Checkbox from "@/components/checkbox";
import Popup from "@/components/popup";
import Tab from "@/components/tab";
import SwiperList from "@/components/swiper-list";
import Tooltip from "@/components/tooltip";
import "./index.scss";

let addressTagList = [
  {
    label: "Home",
    value: "home",
    checked: true,
  },
  {
    label: "Office",
    value: "office",
    checked: false,
  },
  {
    label: "Other",
    value: "other",
    checked: false,
  },
];


class TabDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: [
        {
          label: "DKI Jakarta",
          value: "1234",
          isActive: false,
        },
        {
          label: "Mampang Prapatan",
          value: "1234",
          isActive: false,
        },
        {
          label: "Kota Jakarta Timur Timur Timur",
          value: "1234",
          isActive: false,
        },
        {
          label: "Kota Jakarta Timur Timur Timur",
          value: "1234",
          isActive: false,
        },
        {
          label: "Select District",
          value: null,
          isActive: true,
        }
      ],
      isShowPopup: true,
      addressTagList,
      isShowNameTooltip: true,
    }
  }

  handleSwitch = activeIndex => {
    let { tab } = this.state;
    let newTab = tab.map((item, index) => {
      let newItem = null;
      if(index === activeIndex) {
        newItem = {
          ...item,
          isActive: true,
        }
      } else {
        newItem = {
          ...item, 
          isActive: false,
        }
      }
      return newItem;
    });
    this.setState({
      tab: newTab,
    });
  }
  
  handleClose = () => {
    this.setState({
      isShowPopup: false,
    });
  }

  render() {
    let { tab, isShowPopup, addressTagList, isShowNameTooltip} = this.state;
    return (
      <div className="wrapper">
        <div className="form">
          <div className="form-item">
            <Input label="Recipient's name"
              placeholder="Input the real name"
              error=""
              type="text"
            />

            <Tooltip visibility={isShowNameTooltip} 
              className="name-tooltip"
              position="bottom">
              Ikea Lee, 08210-293-123
            </Tooltip>
          </div>
          
          <Input label="Phone Number"
            placeholder="Input your phone Number"
            error="Please input a valid number"
            type="number"
          />

          <Input label="Region/City/District"
            placeholder="Please select your address"
            type="text"
          />
          <div className="address-tag-list">
            {
              addressTagList.map((item, index) => (
              <Checkbox className="address-tag-item" 
                key={index} 
                checked={item.checked}>{item.label}</Checkbox>
              ))
            }
          </div>
        </div>

        <Popup
          title="Select Address"
          className="address-popup" 
          visibility={isShowPopup} 
          onClose={this.handleClose}>
          <Tab tab={tab}
            onSwitch={this.handleSwitch}/>
          <SwiperList/>
        </Popup>
      </div>

    );
  }
}

export default TabDemo;