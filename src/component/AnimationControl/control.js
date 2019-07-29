import React from "react";
import AnimationShow from "./AnimationShow";

export default function() {
  return function decorate(WrappedComponent) {
    class ProxyComponent extends React.Component {
      constructor() {
        super();
        this.state = {
          propsData: [],
          num: 0
        };
      }
      handleFadeOutShow = () => {
        // this.setState({ propsData: [] });
        this.setState({ num: 1 }, () => {
          console.log(this.state.num);
        });
      };
      getAnimationShow = (fadeOutFunc, options) => {
        console.log("options:::", options.setting.length);
        let AnimationSetting = options.setting || [];
        return fieldElement => {
          // 因为fieldElement是实例原生DOM组件 所以不能通过props进行传值
          // 只能通过克隆一份ReactElement组件，再将props传递给该组件
          let inputElement = React.cloneElement(fieldElement);
          let inputElementTest = inputElement.props.children;
          // console.log("单个组件", typeof inputElementTest, inputElementTest);

          let inputElementArr = null;
          if (options.setting.length > 1) {
            // 多个组件
            inputElementArr = inputElement.props.children;
          } else {
            // 单个组件
            if (typeof inputElement.props.children === "string") {
              inputElementArr = [inputElement.props.children];
              return;
            }
            inputElementArr = [inputElement.props.children];
          }
          console.log("inputElementArr", inputElementArr);
          // inputElementArr = inputElement.props.children;
          // if (Array.isArray(AnimationSetting) && AnimationSetting.length > 1) {
          //   // 多个element
          //   if (
          //     (!Array.isArray(inputElementTest) &&
          //       typeof inputElementTest === "object") ||
          //     (!Array.isArray(inputElementTest) &&
          //       typeof inputElementTest === "string") ||
          //     inputElementTest === undefined ||
          //     inputElementTest.length <= 1
          //   ) {
          //     throw Error("setting 和 dom 数量不匹配");
          //   }
          //   //<><></><></></>
          //   inputElementArr = inputElement.props.children;
          // } else if (
          //   Array.isArray(AnimationSetting) &&
          //   AnimationSetting.length === 1
          // ) {
          //   // 一个element 的时候 dom是 object(<><></></>) 或者  string(<></>)
          //   //...
          //   if (
          //     !Array.isArray(inputElementTest) &&
          //     typeof inputElementTest === "object"
          //   ) {
          //     //<><></></>
          //     inputElementArr = [inputElement.props.children];
          //   } else if (
          //     !Array.isArray(inputElementTest) &&
          //     typeof inputElementTest === "string"
          //   ) {
          //     //<></>
          //     inputElementArr = inputElement;
          //   } else {
          //     throw Error("setting 和 dom 数量不匹配");
          //   }
          // }
          // else {
          //   throw Error("setting 应该是一个length 大于 0 的数组");
          // }
          // console.log("AnimationSetting", AnimationSetting);
          return (
            <div className="tiger" style={{ color: "red" }}>
              <React.Fragment>
                {AnimationSetting.length !== 0 &&
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
            getAnimationShow: this.getAnimationShow
          }
        };
        // 实现对WrappedComponent组件的增强，组件获得{...props}属性
        return <WrappedComponent {...controlProps} {...this.props} />;
      }
    }
    return ProxyComponent;
  };
}
