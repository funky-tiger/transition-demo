/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-07-19 14:31:50
 * @LastEditTime: 2019-07-22 16:49:40
 */
import React, { Component } from "react";
import video1 from "../assets/video/video1.mp4";
import AnimationControl from "../component/AnimationControl/index";

class VideoPage extends Component {
  constructor() {
    super();
    this.state = {
      mockData: [],
      currentShowSec: 0,
      timePoint: [1, 5, 10, 14, 19], // 动画展示节点
      serializeData: [], // 展示数据与配置
      showData: {}
    };
  }

  componentDidMount() {
    this.setState({
      mockData: [
        {
          showSecond: 1,
          data: [
            {
              type: "before1",
              startPoint: { x: 450, y: 300 },
              endPoint: { x: 600, y: 430 },
              frameType: "lucent",
              transparentDown: false,
              frameWidth: 500,
              frameHeight: 200,
              timeout: 3800
            }
          ]
        },
        {
          showSecond: 5,
          data: [
            {
              type: "before2",
              startPoint: { x: 250, y: 455 },
              endPoint: { x: 350, y: 700 },
              frameType: "lucent",
              transparentDown: false,
              frameWidth: 450,
              frameHeight: 100,
              timeout: 4000
            }
          ]
        },
        {
          showSecond: 10,
          data: [
            {
              type: "before3",
              startPoint: { x: 320, y: 510 },
              endPoint: { x: 400, y: 680 },
              frameType: "parent",
              transparentDown: false,
              frameWidth: 100,
              frameHeight: 100,
              timeout: 4000
            },
            {
              type: "before3",
              startPoint: { x: 500, y: 510 },
              endPoint: { x: 600, y: 380 },
              frameType: "parent",
              transparentDown: true,
              frameWidth: 100,
              frameHeight: 100,
              timeout: 4000
            },
            {
              type: "before3",
              startPoint: { x: 685, y: 510 },
              endPoint: { x: 750, y: 680 },
              frameType: "parent",
              transparentDown: false,
              frameWidth: 100,
              frameHeight: 100,
              timeout: 4000
            },
            {
              type: "before3",
              startPoint: { x: 880, y: 510 },
              endPoint: { x: 980, y: 380 },
              frameType: "parent",
              transparentDown: true,
              frameWidth: 100,
              frameHeight: 100,
              timeout: 4000
            }
          ]
        },
        {
          showSecond: 14,
          data: [
            {
              type: "before4",
              startPoint: { x: 1520, y: 452 },
              endPoint: { x: 1350, y: 350 },
              frameType: "lucent",
              transparentDown: false,
              frameWidth: 500,
              frameHeight: 180,
              timeout: 4000
            }
          ]
        },
        {
          showSecond: 19,
          data: [
            {
              type: "before5",
              startPoint: { x: 1680, y: 660 },
              endPoint: { x: 1620, y: 750 },
              frameType: "lucent",
              transparentDown: false,
              frameWidth: 200,
              frameHeight: 100,
              timeout: 4000
            }
          ]
        }
      ]
    });
  }
  /**
   * handleToggleNextShow 切换动画
   * @param currentShowSec number 动画时间节点秒数
   */
  handleToggleNextShow = currentShowSec => {
    const { timePoint } = this.state;
    console.log("时间节点:", currentShowSec);
    this.setState({ currentShowSec });
    /** 当前动画数 */
  };

  /**
   * handleFadeOutShow 淡出动画
   */
  handleFadeOutShow = () => {
    console.log("该动画即将结束");
    this.setState({ mockData: [] });
  };

  getDom = currentTime => {
    switch (currentTime) {
      case 0:
        return (
          <div style={{ fontSize: "100px" }}>
            <div style={{ fontSize: "50px" }}>传递的组件1</div>
          </div>
        );
      case 1:
        return (
          <div style={{ fontSize: "100px" }}>
            <div style={{ fontSize: "30px" }}>传递的组件2</div>
          </div>
        );
      case 2:
        return (
          <div>
            <div style={{ fontSize: "10px" }}>传递的组件3-1</div>
            <div style={{ fontSize: "10px" }}>传递的组件3-2</div>
            <div style={{ fontSize: "10px" }}>传递的组件3-3</div>
            <div style={{ fontSize: "10px" }}>传递的组件3-4</div>
          </div>
        );
      case 3:
        return (
          <div style={{ fontSize: "100px" }}>
            <div style={{ fontSize: "55px" }}>传递的组件4</div>
          </div>
        );
      case 4:
        return (
          <div style={{ fontSize: "100px" }}>
            <div style={{ fontSize: "60px" }}>传递的组件5</div>
          </div>
        );
      default:
        return "";
    }
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
    let { mockData, timePoint, currentShowSec } = this.state;
    return (
      <React.Fragment>
        <div style={{ width: "100vw", height: "100vh" }}>
          {mockData.length !== 0 && (
            <AnimationControl
              src={video1}
              serializeData={mockData}
              serializeDom={this.getDom}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default VideoPage;
