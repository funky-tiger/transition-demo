/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-07-24 17:51:16
 * @LastEditTime: 2019-07-24 18:17:14
 */
import React, { Component } from "react";
import "./tiger.css";

class Tiger extends Component {
  constructor() {
    super();
    this.state = {
      arr: [
        { num: 1, top: 20 },
        { num: 2, top: 40 },
        { num: 3, top: 60 },
        { num: 4, top: 80 },
        { num: 5, top: 100 }
      ]
    };
  }
  componentDidMount() {
    this.updateData(0, 1, 1000);
    this.updateData(3, 4, 3000);
    this.updateData(0, 4, 4000);
  }

  updateData = (prev, next, timeout) => {
    let { arr } = this.state;
    setTimeout(() => {
      let current = arr[prev];
      arr[prev] = arr[next];
      arr[next] = current;
      this.setState({ arr }, () => {
        console.log(this.state.arr);
      });
    }, timeout);
  };
  render() {
    const { arr } = this.state;
    return (
      <div className="box">
        {arr.map((item, index) => {
          return (
            <div className="mian" key={index} style={{ top: item.top + "px" }}>
              {item.num}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Tiger;
