/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-07-22 14:01:20
 * @LastEditTime: 2019-07-22 17:51:41
 */
import React from "react";

export default class AnimationShowVideo extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    const { timePoint, handleToggleNextShow } = this.props;
    console.log("timePoint", timePoint);
    //监听视频播放事件
    this.video.addEventListener("timeupdate", () => {
      //视频当前播放时间
      let currentTime = parseInt(this.video.currentTime);
      // let timePointArr = timePoint;
      if (timePoint.indexOf(currentTime) > -1) {
        // timePointArr.splice(currentTime, -1);
        handleToggleNextShow(currentTime);
      }
    });
  }
  render() {
    let { src, autoPlay, loop, style } = this.props;
    return (
      // 无滚动条
      <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
        <video
          ref={video => (this.video = video)}
          src={src ? src : ""}
          autoPlay={autoPlay ? autoPlay : true}
          loop={loop ? loop : "loop"}
          style={style ? style : {}}
        />
      </div>
    );
  }
}
