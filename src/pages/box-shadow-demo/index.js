/*
  svg demo
*/

import React from "react";
import BoxShadowContainer from "@/components/box-shadow-container";
import "./index.scss";


class SvgDemo extends React.Component {
  render () {
    return (
      <div>
        <BoxShadowContainer>
          <div className="box"> </div>
        </BoxShadowContainer>
        <div className="wrapper"></div>
      </div>
    );
  }
}

export default SvgDemo;