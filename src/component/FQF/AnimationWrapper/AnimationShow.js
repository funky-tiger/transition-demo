/* eslint-disable curly */
/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-07-18 16:02:04
 * @LastEditTime: 2019-07-25 16:16:00
 */
import React, { Component } from 'react';
import { StaggeredMotion, spring } from 'react-motion';
import './index.css';

let timer = window.timer;
let fadeOutTimer;
// mock展示数据

// line
const lineSet = [{ class: 'svg-line1' }, { class: 'svg-line2' }];

class AnimationShow extends Component {
  constructor() {
    super();
    this.state = {
      unmountComponent: false,
      ReceiveProp: false,
      isFade: false,
    };
    // 一端动画标示位
    this.transDown = false;
  }

  componentWillReceiveProps() {
    // if (!this.state.ReceiveProp) {
    //   this.setState({ unmountComponent: false, ReceiveProp: true });
    //   this.unmountTransition();
    // }
  }
  componentDidMount() {
    this.unmountTransition();
  }
  unmountTransition = () => {
    const timeout = this.props.timeout || 4000;
    // const timeout = this.props.timeout;
    timer = setTimeout(() => {
      this.props.handleFadeOutShow();
    }, timeout);

    // 淡出动画
    fadeOutTimer = setTimeout(() => {
      this.fadeOut();
    }, timeout - 800);
  };

  // 控制淡出动画
  fadeOut = () => {
    this.setState({ isFade: true });
  };

  componentWillUnmount() {
    clearTimeout(timer);
    clearTimeout(fadeOutTimer);
  }
  checkShowDataIsEmpty = () => {
    const { currentShowData } = this.props;
    if (!currentShowData) return false;
    if (
      Array.isArray(currentShowData) &&
      currentShowData.length !== 0 &&
      !Object.values(currentShowData[0])[1]
    ) {
      return false;
    }
    return true;
  };
  render() {
    const {
      startPoint,
      endPoint,
      frameType,
      transparentDown,
      frameWidth,
      frameHeight,
    } = this.props;
    /**
     * 判断线段的连接位置
     * 左边 true
     * 右边 false
     */
    let lineConnectDire = endPoint.x - startPoint.x > 0 ? true : false;

    /**
     * 全透明且为transparentDowntrue
     */
    let transDown = frameType === 'parent' && transparentDown ? true : false;
    /**
     * @param initPointPoint 坐标点初始坐标
     * @param initLinePoint 斜线初始坐标
     */
    /**
     *  @param x 旋转图标x坐标
     *  @param y 旋转图标y坐标
     *  @param w 旋转图标宽度
     *  @param h 旋转图标高度
     */
    let initPointPoint = { x: startPoint.x, y: startPoint.y, w: 30, h: 30 };
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
      x2: endPoint.x,
      y2: endPoint.y,
      offsetx: initPointPoint.w / 2,
      offsety: initPointPoint.h / 2,
      t: 1,
      progress: 0,
    };
    /**
     * stiffness 和 damping
     * 将设置动画的物体想象成弹簧，stiffness相当于弹簧的强度，
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
     * 二段动画内容区域配置定制
     */
    let secondSetting = { width: frameWidth };

    /**
     *  @param isFade 淡出动画的显示时机
     */
    const { isFade } = this.state;
    /**
     * @param currentShowData 当前动画展示数据
     */
    const { currentShowData, type } = this.props;
    if (Array.isArray(currentShowData) && currentShowData.length !== 0) {
      console.log('props:', Object.values(currentShowData[0]));
    }
    return (
      <React.Fragment>
        <div className={isFade ? 'card-fade-out' : ''}>
          <StaggeredMotion
            defaultStyles={[
              initPointPoint,
              initLinePoint,
              initialWidth,
              initialWidth,
              initialHeight,
            ]} // 初始
            styles={styles => {
              return styles.map((_, i) => {
                switch (i) {
                  case 0:
                    return {
                      x: spring(initPointPoint.x),
                      y: spring(initPointPoint.y),
                      w: spring(initPointPoint.w),
                      h: spring(initPointPoint.h),
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
                      progress: spring(100), // svg绘制进度
                    };
                  case 2:
                    return { w: spring(secondSetting.width) };
                  case 3:
                    return { w: spring(secondSetting.width) };
                  case 4:
                    return { h: spring(frameHeight) };
                  default:
                    return '';
                }
              });
            }}
          >
            {interpolatingStyles => {
              return (
                <React.Fragment>
                  {this.checkShowDataIsEmpty() && (
                    <div
                      className="second-transition"
                      style={{
                        // 二段内容区域定制
                        width: secondSetting.width,
                        // 二段动画定位(判断连接处的左右方向)
                        left: lineConnectDire
                          ? initLinePoint.x2
                          : initLinePoint.x2 - secondSetting.width,
                        // 修正二段动画偏移量
                        top: initLinePoint.y2 - 8,
                      }}
                    >
                      {interpolatingStyles.map((style, i) => {
                        if (
                          style.progress &&
                          style.progress > 90 &&
                          style.progress < 100
                        ) {
                          // 等待一段动画结束
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
                                  height: style.h,
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
                                style={{ position: 'fixed', top: 0, left: 0 }}
                              >
                                <svg width="100vw" height="100vh">
                                  {lineSet.map((item, index) => {
                                    return (
                                      <line
                                        key={index}
                                        className={item.class}
                                        x1={style.x1 + style.offsetx}
                                        y1={style.y1 + style.offsety}
                                        x2={style.x2}
                                        y2={style.y2}
                                      />
                                    );
                                  })}
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
                                  style={{
                                    height: style.h,
                                    backgroundColor:
                                      frameType === 'lucent'
                                        ? 'rgba(255, 255, 255, 0.75)'
                                        : 'rgba(255, 255, 255, 0)',
                                    bottom: transDown ? -frameHeight : null,
                                  }}
                                >
                                  {this.checkShowDomInfo(
                                    currentShowData,
                                    secondSetting
                                  )
                                  //
                                  }
                                </div>
                              )
                            );
                          default:
                            return null;
                        }
                      })}
                    </div>
                  )}
                </React.Fragment>
              );
            }}
          </StaggeredMotion>
        </div>
      </React.Fragment>
    );
  }

  checkShowDomInfo = (currentShowData, secondSetting) => {
    const { type } = this.props;
    switch (type) {
      case 'before1':
        return (
          <div className="final-content-table">
            <h2 className="table-title">前道生产排单</h2>
            <table
              width={secondSetting.width}
              border="0"
              cellPadding="0"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th>订单编号</th>
                  <th>客户名称</th>
                  <th>楞别</th>
                  <th>数量</th>
                </tr>
              </thead>
              <tbody>
                {currentShowData &&
                  currentShowData.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.orderId}</td>
                        <td>{item.name}</td>
                        <td>{item.stuffClass}</td>
                        <td>{item.orderNum}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        );
      case 'before2':
        return (
          <div className="final-content-item">
            {currentShowData &&
              currentShowData.map((item, index) => {
                return (
                  <div key={index} className="content-title">
                    <span>{item.title}</span>
                    &nbsp;&nbsp;&nbsp;
                    <span>{item.result}</span>
                  </div>
                );
              })}
          </div>
        );
      case 'before3':
        return (
          <div className="final-content-item">
            {currentShowData &&
              currentShowData.map((item, index) => {
                return (
                  <div key={index} className="content-speed">
                    <span>{item.title}</span>
                    <span>{item.speed}</span>
                  </div>
                );
              })}
          </div>
        );
      case 'before4':
        return (
          <div className="final-content-item">
            {currentShowData &&
              currentShowData.map((item, index) => {
                return (
                  <div key={index} className="currentOrder-title">
                    <span>{item.title}</span>
                    &nbsp;&nbsp;&nbsp;
                    <span>{item.result}</span>
                  </div>
                );
              })}
          </div>
        );
      case 'before5':
        return (
          <div className="final-content-item">
            {currentShowData &&
              currentShowData.map((item, index) => {
                return (
                  <div key={index} className="finsh-title">
                    <span>{item.title}</span>
                    &nbsp;&nbsp;&nbsp;
                    <span>{item.result}</span>
                  </div>
                );
              })}
          </div>
        );
      case 'after1':
        return (
          <div className="final-content-item">
            {currentShowData &&
              currentShowData.map((item, index) => {
                return (
                  <div key={index} className="content-boardFinishSum">
                    <span>{item.title}</span>
                    <span>{item.result}</span>
                  </div>
                );
              })}
          </div>
        );
      case 'after2':
        return (
          <div className="final-temporary-item">
            <p>待生产订单</p>
            {currentShowData &&
              currentShowData.map((item, index) => {
                return (
                  <div key={index} className="content-temporary">
                    <span>{item.title}</span>
                    <span>{item.result}</span>
                  </div>
                );
              })}
          </div>
        );
      case 'after3':
        return (
          <div className="final-temporaryData-item">
            {currentShowData &&
              currentShowData.map((item, index) => {
                return (
                  <div key={index} className="content-temporaryData">
                    <span>{item.title}</span>
                    <span>{item.result}</span>
                  </div>
                );
              })}
          </div>
        );
      case 'after4':
        return (
          <div className="final-content-item">
            {currentShowData &&
              currentShowData.map((item, index) => {
                return (
                  <div key={index} className="content-afterSpeed">
                    <p>{item.title}</p>
                    <p>{item.result}</p>
                  </div>
                );
              })}
          </div>
        );
      case 'after5':
        return (
          <div className="final-content-item">
            {currentShowData &&
              currentShowData.map((item, index) => {
                return (
                  <div key={index} className="content-realTimeSpeed">
                    <p>{item.title}</p>&nbsp;
                    <p>{item.result}</p>
                  </div>
                );
              })}
          </div>
        );
      case 'after6':
        return (
          <div className="final-content-item">
            {currentShowData &&
              currentShowData.map((item, index) => {
                return (
                  <div key={index} className="content-realTimeSpeed">
                    <p>{item.title}</p>&nbsp;
                    <p>{item.result}</p>
                  </div>
                );
              })}
          </div>
        );
      case 'after7':
        return (
          <div className="final-content-item">
            {currentShowData &&
              currentShowData.map((item, index) => {
                return (
                  <div key={index} className="content-realTimeSpeed">
                    <p>{item.title}</p>&nbsp;
                    <p>{item.result}</p>
                  </div>
                );
              })}
          </div>
        );
      case 'after8':
        return (
          <div className="final-content-item">
            {currentShowData &&
              currentShowData.map((item, index) => {
                return (
                  <div key={index} className="content-realTimeSpeed">
                    <p>{item.title}</p>&nbsp;
                    <p>{item.result}</p>
                  </div>
                );
              })}
          </div>
        );
      case 'after9':
        return (
          <div className="final-content-item">
            {currentShowData &&
              currentShowData.map((item, index) => {
                return (
                  <div key={index} className="content-shipmentSum">
                    <p>{item.title}</p>&nbsp;
                    <p>{item.result}</p>
                  </div>
                );
              })}
          </div>
        );
      case 'after10':
        return (
          <div className="final-content-item">
            {currentShowData &&
              currentShowData.map((item, index) => {
                return (
                  <div key={index} className="content-agv">
                    <span>{item.title}</span>&nbsp;&nbsp;&nbsp;
                    <span>{item.result}</span>
                  </div>
                );
              })}
          </div>
        );
      default:
        return '';
    }
  };
}

export default AnimationShow;
