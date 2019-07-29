/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-07-18 16:02:04
 * @LastEditTime: 2019-07-19 10:34:56
 */
import React, { Component } from "react";
import { StaggeredMotion, spring, presets } from "react-motion";

import "./test.css";

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
    let boxes = [];
    for (let i = 0, len = this.state.length; i < len; i++) {
      boxes.push({
        scale: 0
      });
    }

    return (
      <div>
        <div>
          <StaggeredMotion
            defaultStyles={[{ w: 0 }, { w: 0 }, { h: 0 }]}
            styles={styles => {
              // console.log("styles", styles);
              return styles.map((_, i) => {
                // console.log("i", i);
                return i === 0
                  ? { w: spring(300) } //1
                  : i === 1
                  ? { w: spring(styles[i - 1].w) } //2
                  : { h: spring(100) }; //3
              });
            }}
          >
            {interpolatingStyles => {
              console.log("interpolatingStyles", interpolatingStyles);
              return (
                <div className="second-transition">
                  {interpolatingStyles.map((style, i) => {
                    switch (i) {
                      case 0:
                        return (
                          <div
                            className="sec-trans-item"
                            key={i}
                            style={{ width: style.w }}
                          />
                        );
                      case 1:
                        return (
                          <div
                            className="sec-trans-item"
                            key={i}
                            style={{ width: style.w }}
                          />
                        );
                      case 2:
                        return (
                          <div
                            className="sec-trans-item"
                            key={i}
                            style={{ height: style.h }}
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
