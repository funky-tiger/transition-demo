/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-07-19 14:31:50
 * @LastEditTime: 2019-07-29 13:51:13
 */
import React, { Component } from 'react';
import AnimationWrapper from './AnimationWrapper';

class AnimationControl extends Component {
  constructor() {
    super();
    this.state = {
      transData: [], // 展示数据
      timePoint: [], // 展示节点
      currentTime: 0, // 当前动画时间节点
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
    // 获取当前该动画的数据
    this.setState({
      transData: serializeData[timePoint.indexOf(currentShowSec)].data,
      currentTime: timePoint.indexOf(currentShowSec),
    });
  };

  /**
   * handleFadeOutShow 淡出动画
   */
  handleFadeOutShow = () => {
    console.log('该动画即将结束');
    this.setState({ transData: [] });
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
    const { transData, timePoint, currentTime } = this.state;
    const { src } = this.props;
    return (
      <React.Fragment>
        <div style={{ width: '100vw', height: '100vh' }}>
          {timePoint.length !== 0 && (
            <AnimationWrapper.VideoBg
              src={src}
              autoPlay={true}
              loop="loop"
              style={{ width: '100%', height: '100%' }}
              timePoint={timePoint}
              handleToggleNextShow={this.handleToggleNextShow}
            />
          )}

          {this.props.control.getAnimationShow(this.handleFadeOutShow, {
            setting: transData,
          })(this.props.serializeDom(currentTime))}
        </div>
      </React.Fragment>
    );
  }
}

export default AnimationWrapper.control()(AnimationControl);
