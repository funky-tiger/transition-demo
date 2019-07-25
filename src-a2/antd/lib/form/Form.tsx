import * as React from "react";
import FormItem from "./FormItem";
import create from "./create";

interface Props {
  onSubmit: any;
}

export default class Form extends React.Component<Props> {
  // 添加静态方法
  static Item = FormItem; // <Form.Item />
  static create = create; // Form.create()(UserForm);

  // render中返回form
  render() {
    // 将传递的属性给原生DOMform
    return <form {...this.props} />;
  }
}

