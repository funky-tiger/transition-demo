<!--
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 1985-10-26 16:15:00
 * @LastEditTime: 2019-07-25 16:38:59
 -->

# 大体逻辑

- 在高阶组件 control 中, 通过 this.props.control.getFieldDecorator()来获取之前通过 props 传递的值
- 同时，通过引入 <AnimationShow /> 组件 来进行对原组件的增强 从而增加该组件的动画渲染的特性
  > 通过 getFieldDecorator() 传递的 options 来获取动画参数

# 整体具体思路

## <AnimationControl/> 对原组件进行分割，将其视频播放和数据动画展示分开，分为 <AnimationWrapper.VideoBg/>和<control/>

- AnimationControl 组件的主要作用是对传入的数据和通过 AnimationControl.VideoBg 获取的相应时间节点进行处理，将处理后的数据和配置等传入给高阶组件 control。它对 AnimationWrapper.VideoBg 和 control 进行了深入一层的包裹，该组件需传入 src/serializeData 和 serializeDom，三个参数的作用分别是：
  > src -> string 视频源
  > serializeData -> object 动画在相应时间节点展示的相关配置
  > serializeDom -> func 动画在相应时间节点展示的 DOM
  > 该组件中通过 AnimationControl.VideoBg 组件获取的动画展示的时间节点
- AnimationControl.VideoBg 组件是一个纯展示 video 组件，需要传入 video 的 src 和时间节点 timeout 以及 handleToggleNextShow 的回调（该函数会在到相应时间节点时触发）等一些配置，其组件内部主要功能是解析该 video，获取相关时间参数，返回给主组件 AnimationControl 使用
- conntrol 是一个高阶组件，实现对 AnimationControl 组件的增强，使组件获得{...props}属性。它返回了通过 AnimationShow 组件包裹后的 dom，并生成动画。它对外暴露了 getAnimationShow 方法，该方法需要传入三个参数，第一个参数是动画消失时机的回调 handleFadeOutShow，第二个参数是相关动画展示的一些配置和动画的数量等，第三个参数是相应动画对应的 dom，通过 props.children 获取到传入的 dom，将其 dom 再次传给最终的动画组件 AnimationShow

- AnimationShow 组件是动画组件，它将其动画分为 5 段，1 段：图标旋转，2 段： svg 画线，3 段和 4 段画出两个粗细不同的直线，最终 5 段动画来渲染通过高阶组件传入的 dom, 该组件需要传入一些配置...

## 使用方法

- 组件中引入
  > `import AnimationControl from '../../component/AnimationControl'`
- <AnimationControl />组件中传入相应参数(参数参考上方)
  > `<AnimationControl src={videoSrc} serializeData={xxxData} serializeDom={getDom} />`

## 要点

- 每个动画的配置和 dom 的数量/结构是否对应
- 一个时间节点有多个动画的情况，dom 的结构要同级(除了第一层 dom，其他不要出现父子结构)
- 默认在不传动画展示 DOM 情况下不显示整个动画过程以及 DOM

# 遇到的问题

- 1. AnimationShow 组件内存泄漏
- 原因

  > A. 组件卸载时没有及时清除定时器.
  > 解决办法:清除所有定时器: `componentWillUnmount() {clearTimeout(timer); }`
  > B. 组件还没挂载时/组件卸载时使用 setState(). (setState()是异步方法)
  > 解决办法:清除所有的 state 状态: `this.setState = (state, callback) => {return; };`

- 2. <AnimationControl />组件的 props 丢失问题
- 原因
  > A. 该组件通过高阶函数 control 进行包裹， 其中的 props 可能没处理好.
  > 解决办法:在高阶组件中将{this.props}和新的 {props} 合并后再传给代理组件 ProxyComponent

# 想法

- 一次性将动画所需的所有数据传递给高阶组件 control,在 control 组件中处理所有切换动画的逻辑

# 问题

- 在高阶组件 control 中无法执行 this.setState()

# 解决办法

- 参考 antd-form
