/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-07-22 14:01:20
 * @LastEditTime: 2019-07-24 14:42:46
 */
import React from 'react';
import AnimationShow from './AnimationShow';

export default class AnimationShowControl extends React.Component {
  render() {
    const { transData, handleFadeOutShow } = this.props;
    return (
      <React.Fragment>
        {transData.length !== 0 &&
          transData.map((item, index) => {
            return (
              <AnimationShow
                key={index}
                startPoint={item.startPoint}
                type={item.type}
                endPoint={item.endPoint}
                frameType={item.frameType}
                transparentDown={item.transparentDown && item.transparentDown}
                frameWidth={item.frameWidth}
                frameHeight={item.frameHeight}
                handleFadeOutShow={handleFadeOutShow}
                currentShowData={item.currentShowData}
                timeout={item.timeout}
              />
            );
          })}
      </React.Fragment>
    );
  }
}
