/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-07-19 14:31:50
 * @LastEditTime: 2019-07-22 17:05:01
 */
import React, { Component } from "react";
import video1 from "../assets/video/video1.mp4";
import AnimationControl from "../component/AnimationControl/index";

class VideoPage extends Component {
  constructor() {
    super();
    this.state = {
      mockData: [],
      timePoint: [1, 5, 10, 14, 19]
    };
  }

  /**
   * handleToggleNextShow 切换动画
   * @param currentShowSec number 动画时间节点秒数
   */
  handleToggleNextShow = currentShowSec => {
    const { timePoint } = this.state;
    /** 当前动画数 */
    switch (timePoint.indexOf(currentShowSec)) {
      case 0:
        this.setState({
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
        break;
      case 1:
        this.setState({
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
        break;
      case 2:
        this.setState({
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
        break;
      case 3:
        this.setState({
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
        break;
      case 4:
        this.setState({
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
        break;
      default:
        return "";
    }
  };

  /**
   * handleFadeOutShow 淡出动画
   */
  handleFadeOutShow = () => {
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
     * @param timePoint number[] 动画展示的时间节点
     * @param handleToggleNextShow func 隐藏显示信息卡片
     */
    let { mockData, timePoint } = this.state;
    return (
      <React.Fragment>
        <div style={{ width: "100vw", height: "100vh" }}>
          <AnimationControl
            src={video1}
            autoPlay={true}
            loop="loop"
            style={{ width: "100%", height: "100%" }}
            timePoint={timePoint}
            handleToggleNextShow={this.handleToggleNextShow}
            transData={mockData}
            handleFadeOutShow={this.handleFadeOutShow}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default VideoPage;
// export default AnimationShow.control()(VideoPage);
