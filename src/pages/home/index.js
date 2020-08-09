import React from "react";
import "./index.scss";
import {Link} from "react-router-dom";

export default function () {
  return (
    <div>
      <h1>I am home</h1>
      <Link to="about" className="about-link">to about</Link>
    </div>
  );
}