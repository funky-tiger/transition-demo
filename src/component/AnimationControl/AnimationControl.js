/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-07-22 13:59:39
 * @LastEditTime: 2019-07-22 17:12:41
 */
import React from "react";
import AnimationShowVideo from "./AnimationShowVideo";
import AnimationShowWrapper from "./AnimationShowWrapper";

export default class AnimationControl extends React.Component {
  static VideoBg = AnimationShowVideo;
  static Show = AnimationShowWrapper;
  render() {
    return <div {...this.props} />;
  }
}
