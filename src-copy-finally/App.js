/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 1985-10-26 16:15:00
 * @LastEditTime: 2019-07-19 08:54:50
 */
import React from "react";
import { Motion, spring, presets } from "react-motion";
import "./App2.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false, open2: false };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ open: true });
    }, 1000);
  }
  render() {
    return (
      // <div className="line" />
      <div className="box">
        {/* 第一段 */}
        <Motion
          style={{ x: spring(this.state.open ? 300 : 0) }}
          onRest={() => {
            console.log("动画执行完毕");
            // this.setState({ open2: true });
          }}
        >
          {({ x }) => (
            <div className="demo0">
              <div
                className="lean-line"
                style={{
                  width: `${x}px`
                }}
              />
            </div>
          )}
        </Motion>
        {/* 第二段 */}
        <Motion
          style={{ x: spring(this.state.open2 ? 200 : 0) }}
          onRest={() => {
            console.log("动画执行完毕");
          }}
        >
          {({ x }) => (
            <div className="demo0">
              <div
                className="line"
                style={{
                  width: `${x}px`
                }}
              />
            </div>
          )}
        </Motion>
      </div>
    );
  }
}

export default App;
