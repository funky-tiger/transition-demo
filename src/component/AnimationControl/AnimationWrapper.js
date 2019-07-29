/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-07-22 13:59:39
 * @LastEditTime: 2019-07-22 16:18:43
 */
import React from "react";
import AnimationShowVideo from "./AnimationShowVideo";
// import AnimationShowWrapper from "./AnimationShowWrapper";
import control from "./control";

export default class AnimationWrapper extends React.Component {
  // <AnimationShow.VideoBg />
  static VideoBg = AnimationShowVideo;
  // static Show = AnimationShowWrapper;
  /** show组件在create高阶组件中实现 */
  static control = control;
  render() {
    return <div {...this.props} />;
  }
}
