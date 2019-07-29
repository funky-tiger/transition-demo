/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-07-22 14:54:11
 * @LastEditTime: 2019-07-23 14:01:20
 */
import React from 'react';
import AnimationShowVideo from './AnimationShowVideo';

export { AnimationShowVideo };
export default function(mediaProps) {
  return function wrapper(WrapperCom) {
    class ProxyComponent extends React.Component {
      // static VideoBg = AnimationShowVideo;
      render() {
        let props = {
          control: {
            name: 'control属性...',
            //收集字段装饰器
            getFieldDecorator: this.getFieldDecorator,
            //获取所有字段值
            getFieldsValue: this.getFieldsValue,
            //校验字段的合法性
            validateFields: this.validateFields,
          },
        };
        console.log('mediaProps', mediaProps);
        return <WrapperCom {...props} />;
      }
    }
    return ProxyComponent;
  };
}
