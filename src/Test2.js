/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-07-18 16:02:04
 * @LastEditTime: 2019-07-22 10:26:22
 */
import React, { Component } from "react";
import { StaggeredMotion, spring, presets } from "react-motion";

import "./test2.css";

const mockContentInfo = [
  { title: "生产总长", num: 92876 },
  { title: "生产总长", num: 92876 },
  { title: "生产总长", num: 92876 },
  { title: "生产总长", num: 92876 }
];
class Test2 extends Component {
  constructor() {
    super();
    this.state = {};
    this.transDown = false;
  }
  addLength() {
    let newLength;
    if (this.state.length) {
      newLength = 0;
    } else {
      newLength = 10;
    }

    this.setState({
      length: newLength
    });
  }

  render() {
    /**
     * initPointPoint 坐标点初始坐标
     * initLinePoint 斜线初始坐标
     */
    /**
     *  @param x 旋转图标x坐标
     *  @param y 旋转图标y坐标
     *  @param w 旋转图标宽度
     *  @param h 旋转图标高度
     */
    let initPointPoint = { x: 200, y: 500, w: 30, h: 30 };
    /**
     *  @param x1 line起始x坐标
     *  @param y1 line起始y坐标
     *  @param x2 line终点x坐标
     *  @param y2 line终点y坐标
     *  @param offsetx x轴偏移量
     *  @param offsety y轴偏移量
     *  @param t 动画时间
     *  @param progress svg动画进度 标示位 表示动画是否绘制完毕
     */
    let initLinePoint = {
      x1: initPointPoint.x,
      y1: initPointPoint.y,
      x2: 300,
      y2: 700,
      offsetx: initPointPoint.w / 2,
      offsety: initPointPoint.h / 2,
      t: 1,
      progress: 0
    };
    /**
     * stiffness 和 damping
     * 如果把我们要设置动画的物体想象成弹簧，stiffness相当于弹簧的强度，
     * 其影响的是弹簧回弹的速度，相同damping情况下，stiffness越大，
     * 回弹速度越快；damping是弹簧的减震性，其影响的是弹簧的回弹次数，
     * 相同stiffness情况下，damping越大，回弹次数越少
     */
    /**
     *  @param initialWidth 负数表示初始宽度的时间间隔
     *  @param initialHeight 负数表示初始高度的时间间隔
     */
    let initialWidth = { w: -1000 };
    let initialHeight = { h: -5000 };

    /**
     * @param defaultStyles 初始样式集合
     * @param styles 目标样式集合
     * @param interpolatingStyles transition children DOM
     */

    /**
     * 二段内容区域配置定制
     */
    let secondSetting = { width: 300 };
    return (
      <div style={{ width: "100vh", height: "100vh", backgroundColor: "pink" }}>
        <div>
          <StaggeredMotion
            defaultStyles={[
              initPointPoint,
              initLinePoint,
              initialWidth,
              initialWidth,
              initialHeight
            ]} // 初始
            styles={styles => {
              // console.log("styles", styles);
              return styles.map((_, i) => {
                // console.log("i", i);
                switch (i) {
                  case 0:
                    return {
                      x: spring(initPointPoint.x),
                      y: spring(initPointPoint.y),
                      w: spring(initPointPoint.w),
                      h: spring(initPointPoint.h)
                    };
                  case 1:
                    return {
                      x1: spring(initLinePoint.x1), // x
                      y1: spring(initLinePoint.y1), // y
                      x2: spring(initLinePoint.x2), // x
                      y2: spring(initLinePoint.y2), // y
                      offsetx: spring(initLinePoint.offsetx),
                      offsety: spring(initLinePoint.offsety),
                      t: spring(initLinePoint.t), // 动画时间
                      progress: spring(100) // svg绘制进度
                    };
                  case 2:
                    return { w: spring(secondSetting.width) };
                  case 3:
                    return { w: spring(secondSetting.width) };
                  case 4:
                    return { h: spring(100) };
                  default:
                    return "";
                }
              });
            }}
          >
            {interpolatingStyles => {
              // console.log("interpolatingStyles", interpolatingStyles);
              return (
                <div
                  className="second-transition"
                  style={{
                    // 二段内容区域定制
                    width: secondSetting.width,
                    // 二段动画定位
                    left: initLinePoint.x2 - secondSetting.width,
                    // left: initLinePoint.x2,
                    // 修正二段动画偏移量
                    top: initLinePoint.y2 - 8
                  }}
                >
                  {interpolatingStyles.map((style, i) => {
                    // console.log("style", style);
                    if (
                      style.progress &&
                      style.progress > 90 &&
                      style.progress < 100
                    ) {
                      console.log(style);
                      this.transDown = true;
                    }
                    switch (i) {
                      case 0:
                        return (
                          <div
                            className="rotate-point"
                            key={i}
                            style={{
                              top: style.y,
                              left: style.x,
                              width: style.w,
                              height: style.h
                            }}
                          >
                            <div className="rotate-big" />
                            <div className="rotate-inner" />
                          </div>
                        );
                      case 1:
                        return (
                          <div
                            key={i}
                            style={{ position: "fixed", top: 0, left: 0 }}
                          >
                            <svg width="100vw" height="100vh">
                              {/* <line x1="10" y1="10" x2="70" y2="90" />
                              <line x1="10" y1="10" x2="70" y2="90" /> */}
                              <line
                                className="svg-line1"
                                x1={style.x1 + style.offsetx}
                                y1={style.y1 + style.offsety}
                                x2={style.x2}
                                y2={style.y2}
                              />
                              <line
                                className="svg-line2"
                                x1={style.x1 + style.offsetx}
                                y1={style.y1 + style.offsety}
                                x2={style.x2}
                                y2={style.y2}
                              />
                            </svg>
                          </div>
                        );
                      case 2:
                        return (
                          this.transDown && (
                            <div
                              className="sec-trans-item2"
                              key={i}
                              style={{ width: style.w }}
                            />
                          )
                        );
                      case 3:
                        return (
                          this.transDown && (
                            <div
                              className="sec-trans-item1"
                              key={i}
                              style={{ width: style.w }}
                            />
                          )
                        );
                      case 4:
                        return (
                          this.transDown && (
                            <div
                              className="sec-trans-item3"
                              key={i}
                              style={{ height: style.h }}
                            >
                              {mockContentInfo.map((item, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="final-content-item"
                                  >
                                    <p className="content-title">
                                      {item.title}
                                      <span>{item.num}</span>
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          )
                        );
                      default:
                        return "";
                    }
                  })}
                </div>
              );
            }}
          </StaggeredMotion>
        </div>
      </div>
    );
  }
}

export default Test2;
