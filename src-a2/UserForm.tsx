import * as React from "react";
import Form from "./antd/lib/form";

interface Props {
  form: any;
}

class UserForm extends React.Component<Props> {
  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    //获取所有字段的值：getFieldsValue
    // let { values } = this.props.form.getFieldsValue();
    // console.log(values);
    /** validateFields校验字段的合法性 */
    this.props.form.validateFields((error: any, values: any) => {
      console.error("error", error);
      console.info("values:", values);
    });
  };
  render() {
    //收集字段装饰器：getFieldDecorator 高阶函数
    const { getFieldDecorator } = this.props.form;
    console.log(this.props);
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="用户名">
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "请输入用户名" }]
          })(<input />)}
        </Form.Item>
        <Form.Item label="密码">
          {getFieldDecorator("password", {
            rules: [
              { required: true, message: "请输入密码" },
              { min: 6, message: "密码不能少于6位" },
              { max: 10, message: "密码不能超过10位" }
            ]
          })(<input />)}
        </Form.Item>
        <Form.Item>
          <button>提交</button>
        </Form.Item>
      </Form>
    );
  }
}

// 第一个传配置项
export default Form.create()(UserForm);
