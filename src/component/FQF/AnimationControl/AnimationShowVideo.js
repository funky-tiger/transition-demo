/* eslint-disable radix */
/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-07-22 14:01:20
 * @LastEditTime: 2019-07-29 13:52:22
 */
import React from 'react';

export default class AnimationShowVideo extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    const { timePoint, handleToggleNextShow } = this.props;
    //监听视频播放事件
    this.video.addEventListener('timeupdate', () => {
      // console.log("播放了 ", this.video);
      //视频当前播放时间
      let currentTime = parseInt(this.video.currentTime);
      // console.log("currentTime", currentTime);
      if (timePoint.indexOf(currentTime) > -1) {
        handleToggleNextShow(currentTime);
      }
    });
  }
  render() {
    let { src, autoPlay, loop, style, timePoint } = this.props;
    // console.log("timePoint", timePoint);
    return (
      // 无滚动条
      <div style={{ overflowX: 'hidden', overflowY: 'hidden' }}>
        <video
          ref={video => (this.video = video)}
          src={src ? src : ''}
          autoPlay={autoPlay ? autoPlay : true}
          loop={loop ? loop : 'loop'}
          style={style ? style : {}}
        />
      </div>
    );
  }
}
