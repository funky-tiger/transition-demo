/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-07-22 13:59:08
 * @LastEditTime: 2019-07-24 16:22:22
 */
import React, { Component } from 'react';
import AnimationControl from './AnimationControl';

class AnimationWrapper extends Component {
  constructor() {
    super();
    this.state = {
      transData: [], // 展示数据
      timePoint: [], // 展示节点
    };
  }
  componentDidMount() {
    /** 处理动画时间节点 timePoint */
    const { serializeData } = this.props;
    let timePoint = [];
    serializeData.forEach(item => {
      timePoint.push(item.showSecond);
    });
    this.setState({ timePoint });
  }
  /**
   * handleToggleNextShow 切换动画
   * @param currentShowSec number 动画时间节点秒数
   */
  handleToggleNextShow = currentShowSec => {
    const { timePoint } = this.state;
    const { serializeData } = this.props;
    this.setState({
      transData: serializeData[timePoint.indexOf(currentShowSec)].data,
    });
  };

  /**
   * handleFadeOutShow 淡出动画
   */
  handleFadeOutShow = () => {
    this.setState({ transData: [] });
  };

  render() {
    const { transData, timePoint } = this.state;
    const { src } = this.props;
    return (
      <React.Fragment>
        <div
          style={{
            width: '100vw',
            height: '100vh',
            overflowX: 'hidden',
            overflowY: 'hidden',
          }}
        >
          {timePoint.length !== 0 && (
            <AnimationControl.VideoBg
              src={src}
              autoPlay={true}
              loop="loop"
              style={{ width: '100%', height: '100%' }}
              timePoint={timePoint}
              handleToggleNextShow={this.handleToggleNextShow}
            />
          )}
          <AnimationControl.Show
            transData={transData}
            handleFadeOutShow={this.handleFadeOutShow}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default AnimationWrapper;
