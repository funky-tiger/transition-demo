/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-07-19 14:31:50
 * @LastEditTime: 2019-07-23 09:38:57
 */
import React, { Component } from "react";
import video1 from "../assets/video/video1.mp4";
import AnimationWrapper from "../component/AnimationControl/index";

class VideoPage extends Component {
  constructor() {
    super();
    this.state = {
      timePoint: [1, 5, 10, 14, 19], // 动画展示节点
      serializeData: [] // 展示数据与配置
    };
  }

  componentDidMount() {
    /**
     * 参数说明
     * @param showSecond number 当前动画展示时间节点
     * @param data array 当前动画的配置和数据
     * @param currentShowData array 当前节点要展示的数据
     */
    this.setState({
      serializeData: [
        {
          showSecond: 1,
          data: [
            {
              startPoint: { x: 450, y: 300 },
              endPoint: { x: 600, y: 430 },
              frameType: "lucent",
              transparentDown: false,
              frameWidth: 300,
              frameHeight: 100,
              currentShowData: [
                { title: "生产总长", num: 92876 },
                { title: "生产总长", num: 92876 },
                { title: "生产总长", num: 92876 },
                { title: "生产总长", num: 92876 }
              ]
            }
          ]
        },
        {
          showSecond: 5,
          data: [
            {
              startPoint: { x: 250, y: 455 },
              endPoint: { x: 350, y: 700 },
              frameType: "lucent",
              transparentDown: false,
              frameWidth: 300,
              frameHeight: 100,
              currentShowData: [
                { title: "生产总长", num: 92876 },
                { title: "生产总长", num: 92876 },
                { title: "生产总长", num: 92876 },
                { title: "生产总长", num: 92876 }
              ]
            }
          ]
        },
        {
          showSecond: 10,
          data: [
            {
              startPoint: { x: 320, y: 510 },
              endPoint: { x: 400, y: 680 },
              frameType: "parent",
              transparentDown: false,
              frameWidth: 150,
              frameHeight: 100,
              currentShowData: [
                { title: "生产总长", num: 92876 },
                { title: "生产总长", num: 92876 },
                { title: "生产总长", num: 92876 },
                { title: "生产总长", num: 92876 }
              ]
            },
            {
              startPoint: { x: 500, y: 510 },
              endPoint: { x: 600, y: 380 },
              frameType: "parent",
              transparentDown: true,
              frameWidth: 150,
              frameHeight: 100,
              currentShowData: [
                { title: "生产总长", num: 92876 },
                { title: "生产总长", num: 92876 },
                { title: "生产总长", num: 92876 },
                { title: "生产总长", num: 92876 }
              ]
            },
            {
              startPoint: { x: 685, y: 510 },
              endPoint: { x: 750, y: 680 },
              frameType: "parent",
              transparentDown: false,
              frameWidth: 150,
              frameHeight: 100,
              currentShowData: [
                { title: "生产总长", num: 92876 },
                { title: "生产总长", num: 92876 },
                { title: "生产总长", num: 92876 },
                { title: "生产总长", num: 92876 }
              ]
            },
            {
              startPoint: { x: 880, y: 510 },
              endPoint: { x: 980, y: 380 },
              frameType: "parent",
              transparentDown: true,
              frameWidth: 150,
              frameHeight: 100,
              currentShowData: [
                { title: "生产总长", num: 92876 },
                { title: "生产总长", num: 92876 },
                { title: "生产总长", num: 92876 },
                { title: "生产总长", num: 92876 }
              ]
            }
          ]
        },
        {
          showSecond: 14,
          data: [
            {
              startPoint: { x: 1520, y: 452 },
              endPoint: { x: 1350, y: 350 },
              frameType: "lucent",
              transparentDown: false,
              frameWidth: 400,
              frameHeight: 100,
              currentShowData: [
                { title: "生产总长", num: 92876 },
                { title: "生产总长", num: 92876 },
                { title: "生产总长", num: 92876 },
                { title: "生产总长", num: 92876 }
              ]
            }
          ]
        },
        {
          showSecond: 19,
          data: [
            {
              startPoint: { x: 1680, y: 660 },
              endPoint: { x: 1620, y: 750 },
              frameType: "lucent",
              transparentDown: false,
              frameWidth: 300,
              frameHeight: 100,
              currentShowData: [
                { title: "生产总长", num: 92876 },
                { title: "生产总长", num: 92876 },
                { title: "生产总长", num: 92876 },
                { title: "生产总长", num: 92876 }
              ]
            }
          ]
        }
      ]
    });
  }
  render() {
    /**
     * 参数说明
     * @param startPoint Object 起点坐标
     * @param endPoint Object 终点坐标
     * @param frameType 展示区类型
     *        @param lucent string 半透明
     *        @param parent string 全透明
     * @param transparentDown boolen 全透明情况下的下方展示(必须frameType为parent)
     * @param frameWidth number 展示区宽度
     * @param frameHeight number 展示区高度
     * @param timeout number 动画展示时长（默认4000）
     * @param timePoint number[] 动画展示的时间节点
     */
    let { serializeData } = this.state;
    return (
      <React.Fragment>
        <div style={{ width: "100vw", height: "100vh" }}>
          {serializeData.length !== 0 && (
            <AnimationWrapper src={video1} serializeData={serializeData} />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default VideoPage;
// export default AnimationShow.control()(VideoPage);
