import React from "react";
import PropTypes from "prop-types";
import "./index.scss";


class Tooltip extends React.Component {

  render () {
    return (
      <div className="tooltip">
        
      </div>
    );
  }
}

Tooltip.propTypes = {
  className: "",
  position: PropTypes.oneOf(["top, bottom"]),
}

Tooltip.defaultProps = {
  position: "bottom",
}

export default Tooltip;

