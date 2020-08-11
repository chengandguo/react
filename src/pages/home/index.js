import React, { useState } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import Counter from "./Counter/index.js";
import axios from "axios";

axios.get("/getFruitList").then(res => {
  console.log(res);
})


export default function () {
  return (
    <div>
      <h1>I am home</h1>
      <Counter/>
      <Link to="about" className="about-link">to about</Link>
    </div>
  );
}