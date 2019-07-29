/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-07-22 13:59:39
 * @LastEditTime: 2019-07-24 16:21:43
 */
import React from 'react';
import AnimationShowVideo from './AnimationShowVideo';
import AnimationShowWrapper from './AnimationShowWrapper';

export default class AnimationControl extends React.Component {
  static VideoBg = AnimationShowVideo;
  static Show = AnimationShowWrapper;
  render() {
    return (
      <div
        style={{ overflowX: 'hidden', overflowY: 'hidden' }}
        {...this.props}
      />
    );
  }
}
