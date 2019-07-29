/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-07-18 16:02:04
 * @LastEditTime: 2019-07-19 08:47:43
 */
import React, { Component } from "react";
import { StaggeredMotion, spring, presets } from "react-motion";
import "./avatar.css";

class Test2 extends Component {
  render() {
    return (
      <div className="App">
        <div className="rotate-point">
          <div className="rotate-big" />
          <div className="rotate-inner" />
        </div>
      </div>
    );
  }
}

export default Test2;
