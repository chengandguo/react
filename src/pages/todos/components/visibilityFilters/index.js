import React from "react";
import cx from "classnames";
import { connect } from "react-redux";
import "./index.scss";

let mapActionsToProps = dispatch => ({
  switchStoreVisibility: (value) => dispatch({
    type: "SWITCH_VISIBILITY",
    payload: value,
  }),
});


class VisibilityFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          value: "all",
          isSelected: true,
        },

        {
          value: "completed",
          isSelected: false,
        },

        {
          value: "uncompleted",
          isSelected: false,
        }
      ]
    }
  }

  switchVisibility = (activeIndex) => {
    let newList = this.state.list.map((item, index) => {
      if(index === activeIndex) {
        return {
          ...item,
          isSelected: true,
        };
      } else {
        return {
          ...item,
          isSelected: false,
        };
      }
    });

    this.props.switchStoreVisibility(newList[activeIndex].value);

    this.setState({
      list: newList,
    });
  }

  render() {
    return (
      <ul className="todo-btn-list">
        {this.state.list.map((item, index) => (
          <li className={cx("todo-btn-item", {"todo-btn-item-active": item.isSelected})}
            onClick={() => this.switchVisibility(index)}
            key={index}>{item.value}</li>
        ))}
      </ul>
    );
  }
}

export default connect(
  null,
  mapActionsToProps,
)(VisibilityFilters);

