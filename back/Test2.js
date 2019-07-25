/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-07-18 16:02:04
 * @LastEditTime: 2019-07-19 10:26:26
 */
import React, { Component } from "react";
import { StaggeredMotion, spring, presets } from "react-motion";

import "./test2.css";

class Test2 extends Component {
  state = {
    length: 10
  };

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
    let initPointPoint = { x: 300, y: 100 };
    let initLinePoint = { x: 245, y: 85, w: 0, t: 0.5 };
    /**
     * stiffness 和 damping
     * 如果把我们要设置动画的物体想象成弹簧，stiffness相当于弹簧的强度，
     * 其影响的是弹簧回弹的速度，相同damping情况下，stiffness越大，
     * 回弹速度越快；damping是弹簧的减震性，其影响的是弹簧的回弹次数，
     * 相同stiffness情况下，damping越大，回弹次数越少
     */
    return (
      <div>
        <div>
          <StaggeredMotion
            defaultStyles={[initPointPoint, initLinePoint]} // 初始
            styles={styles => {
              // console.log("styles", styles);
              return styles.map((_, i) => {
                // console.log("i", i);
                return i === 0
                  ? // 目标
                    { x: spring(initPointPoint.x), y: spring(initPointPoint.y) }
                  : {
                      x: spring(initLinePoint.x), // x
                      y: spring(initLinePoint.y), // y
                      w: spring(initLinePoint.w + 300, {
                        stiffness: 120,
                        damping: 17
                      }), // 宽度变化
                      t: spring(initLinePoint.t) // 动画时间
                    };
              });
            }}
          >
            {interpolatingStyles => {
              // console.log("interpolatingStyles", interpolatingStyles);
              return (
                <div className="second-transition">
                  {interpolatingStyles.map((style, i) => {
                    // console.log("style", style);
                    switch (i) {
                      case 0:
                        return (
                          <div
                            className="rotate-point"
                            key={i}
                            style={{ top: style.y, left: style.x }}
                          >
                            <div className="rotate-big" />
                            <div className="rotate-inner" />
                          </div>
                        );
                      case 1:
                        return (
                          <div
                            className="fir-trans-line"
                            key={i}
                            style={{
                              top: style.y,
                              left: style.x,
                              width: style.w,
                              transition: "all " + style.t + "s linear"
                            }}
                          />
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
