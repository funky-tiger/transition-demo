/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-07-29 11:44:18
 * @LastEditTime: 2019-07-29 15:39:12
 */
import React from 'react';
import AnimationShow from './AnimationShow';

export default function() {
  return function decorate(WrappedComponent) {
    class ProxyComponent extends React.Component {
      getAnimationShow = (fadeOutFunc, options) => {
        let failedRender = false;
        let AnimationSetting = options.setting || [];
        return fieldElement => {
          // 因为fieldElement是实例原生DOM组件 所以不能通过props进行传值 通过克隆一份ReactElement组件，再将props传递给该组件
          let inputElement = React.cloneElement(fieldElement);
          let inputElementTest = inputElement.props.children;
          // console.log('options.setting', inputElementTest);
          let inputElementArr = null;
          if (!Array.isArray(AnimationSetting)) {
            throw Error('setting必须是一个数组');
          }
          if (AnimationSetting.length > 1) {
            // 多个组件
            inputElementArr = inputElement.props.children.props.children;
          } else {
            // 单个组件
            if (typeof inputElement.props.children === 'string') {
              inputElementArr = [inputElement.props.children];
              return;
            }
            inputElementArr = [inputElement.props.children];
          }
          if (inputElementArr.length === 0) {
            failedRender = true;
          }
          // console.log('最终要渲染的DOM：', inputElementArr);
          return (
            <div className="tiger">
              <React.Fragment>
                {AnimationSetting.length !== 0 &&
                  !failedRender &&
                  AnimationSetting.map((item, index) => {
                    return (
                      <AnimationShow
                        key={index}
                        {...item}
                        childShowElement={inputElementArr[index]}
                        handleFadeOutShow={fadeOutFunc}
                      />
                    );
                  })}
              </React.Fragment>
              {}
            </div>
          );
        };
      };

      render() {
        let controlProps = {
          control: {
            getAnimationShow: this.getAnimationShow,
          },
        };
        // 实现对WrappedComponent组件的增强，组件获得{...props}属性
        return <WrappedComponent {...controlProps} {...this.props} />;
      }
    }
    return ProxyComponent;
  };
}
