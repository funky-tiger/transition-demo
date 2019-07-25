/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-07-19 14:31:50
 * @LastEditTime: 2019-07-22 16:42:04
 */
import React, { Component } from "react";
import video1 from "../assets/video/video1.mp4";
import AnimationShow from "../component/AnimationShow";

class VideoPage extends Component {
  constructor() {
    super();
    this.state = {
      mockData: [],
      ReceiveProp: false
    };
  }
  componentDidMount() {
    let timeNow = new Date().getTime();
    // console.log("时间戳", timeNow);
    //监听视频播放事件
    this.video.addEventListener(
      "timeupdate",
      () => {
        let currentTime = this.video.currentTime;
        // console.log("视频当前播放时间 ", this.video.currentTime);

        if (parseInt(currentTime) == 1) {
          this.setState({
            ReceiveProp: true,
            mockData: [
              {
                startPoint: { x: 450, y: 300 },
                endPoint: { x: 600, y: 430 },
                frameType: "lucent",
                transparentDown: false,
                frameWidth: 300,
                frameHeight: 100
              }
            ]
          });
        } else if (parseInt(currentTime) == 5) {
          this.setState({
            ReceiveProp: true,
            mockData: [
              {
                startPoint: { x: 250, y: 455 },
                endPoint: { x: 350, y: 700 },
                frameType: "lucent",
                transparentDown: false,
                frameWidth: 300,
                frameHeight: 100
              }
            ]
          });
        } else if (parseInt(currentTime) == 10) {
          this.setState({
            ReceiveProp: true,
            mockData: [
              {
                startPoint: { x: 320, y: 510 },
                endPoint: { x: 400, y: 680 },
                frameType: "parent",
                transparentDown: false,
                frameWidth: 150,
                frameHeight: 100
              },
              {
                startPoint: { x: 500, y: 510 },
                endPoint: { x: 600, y: 380 },
                frameType: "parent",
                transparentDown: true,
                frameWidth: 150,
                frameHeight: 100
              },
              {
                startPoint: { x: 685, y: 510 },
                endPoint: { x: 750, y: 680 },
                frameType: "parent",
                transparentDown: false,
                frameWidth: 150,
                frameHeight: 100
              },
              {
                startPoint: { x: 880, y: 510 },
                endPoint: { x: 980, y: 380 },
                frameType: "parent",
                transparentDown: true,
                frameWidth: 150,
                frameHeight: 100
              }
            ]
          });
        } else if (parseInt(currentTime) == 14) {
          this.setState({
            ReceiveProp: true,
            mockData: [
              {
                startPoint: { x: 1520, y: 452 },
                endPoint: { x: 1350, y: 350 },
                frameType: "lucent",
                transparentDown: false,
                frameWidth: 400,
                frameHeight: 100
              }
            ]
          });
        } else if (parseInt(currentTime) == 19) {
          this.setState({
            ReceiveProp: true,
            mockData: [
              {
                startPoint: { x: 1680, y: 660 },
                endPoint: { x: 1620, y: 750 },
                frameType: "lucent",
                transparentDown: false,
                frameWidth: 300,
                frameHeight: 100
              }
            ]
          });
        }
      },
      false
    );

    //监听视频结束事件
    // this.video.addEventListener(
    //   "ended",
    //   function() {
    //     // window.location.reload();
    //   },
    //   false
    // );
  }

  handleToggleNextShow = () => {
    this.setState({ mockData: [] });
  };

  render() {
    /**
     * @param startPoint Object 起点坐标
     * @param endPoint Object 终点坐标
     * @param frameType 展示区类型
     *        @param lucent string 半透明
     *        @param parent string 全透明
     * @param transparentDown boolen 全透明情况下的下方展示(必须frameType为parent)
     * @param frameWidth number 展示区宽度
     * @param frameHeight number 展示区高度
     * @param timeout number 动画展示时长
     */
    let { mockData } = this.state;
    return (
      <React.Fragment>
        <div style={{ width: "100vw", height: "100vh" }}>
          <video
            ref={video => (this.video = video)}
            src={video1}
            autoPlay={true}
            loop="loop"
            style={{ width: "100%", height: "100%" }}
          />
          {mockData.map((item, index) => {
            return (
              <AnimationShow
                key={index}
                startPoint={item.startPoint}
                endPoint={item.endPoint}
                frameType={item.frameType}
                transparentDown={item.transparentDown && item.transparentDown}
                frameWidth={item.frameWidth}
                frameHeight={item.frameHeight}
                handleToggleNextShow={this.handleToggleNextShow}
                timeout={4000}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default VideoPage;
