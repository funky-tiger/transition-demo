import * as React from "react";

interface Props {
  label?: string; // <Form.Item label="用户名">
}

export default class FormItem extends React.Component<Props> {
  render() {
    // children 子内容 是什么就是什么
    let { label, children } = this.props;
    return (
      <div>
        {label && <label>{label}</label>}
        {children}
      </div>
    );
  }
}

/**
 *  <Form.Item label="用户名">
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "请输入用户名" }]
          })(<input />)}
        </Form.Item>
 */