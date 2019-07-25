import * as React from "react";

interface Props {}
interface Objects {
  //任意属性
  [propsName: string]: any;
}
interface State {
  values: Objects;
  errors: Objects;
}

type CallBack = (error: any, values: any) => void;

export default function() {
  //WrappedComponent是一个组件
  return function decorate(WrappedComponent: any) {
    class ProxyComponent extends React.Component<Props, State> {
      //ProxyComponent组件实现了对WrappedComponent组件的增强与包裹

      state = {
        // 收集的值放入values中
        values: {},
        // 存放所有字段的错误信息 {username:{errors[{field:'username',message:'用户名不能为空'}]}}
        errors: {}
      };

      rules: { [propName: string]: any } = {
        // 存放所有字段的校验规则
      };
      // 高阶函数 getFieldDecorator("username",rules:[required:true])(<input />)
      getFieldDecorator = (name: string, options: any) => {
        if (options.rules) {
          // 缓存字段的rules 到当前组件的实例上
          this.rules[name] = options.rules;
        }
        return (fieldElement: any) => {
          // 需实现的功能点：显示和改变
          let values: Objects = this.state.values;
          let props: Objects = {
            values: values[name] || "",
            style: {},
            onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
              // input发生变化时，更新values中的值
              this.handleChange(event, name)
          };

          // 处理错误信息的显示 拿到该
          let errors: Objects = this.state.errors; //{username:{errors:[field,message]}}
          let fieldErrors = errors[name]; //当前字段的error
          let messages = []; // 该字段的所有错误信息message的p标签数组
          if (fieldErrors && fieldErrors.errors.length > 0) {
            // 字段有错误 显示错误信息message
            console.log("props", props);
            props.style = { border: "1px solid orange" }; // 出错时 输入框变红色
            messages = fieldErrors.errors
              .map((item: any) => item.message) // 拿到每个错误的message
              .map((item: any, index: any) => (
                <p style={{ color: "orange" }} key={index}>
                  {/* 返回p标签  */}
                  {item}
                </p>
              ));
          }
          // 因为fieldElement是实例原生DOM组件input 所以不能通过props进行传值
          // 只能通过克隆一份ReactElement组件，再将props传递给该组件
          let inputElement = React.cloneElement(fieldElement, props);
          console.log("fieldElement", fieldElement);
          return (
            <div>
              {inputElement}
              {messages.length > 0 && messages}
            </div>
          );
        };
      };

      // 获取values中的所有值
      getFieldsValue = () => {
        console.log("this.state.values", this.state.values);
        return this.state;
      };

      handleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        name: string
      ) => {
        let value = event.target.value;
        // 更新values中的值，拿新值去覆盖旧值
        this.setState(
          {
            values: { ...this.state.values, [name]: value }
          },
          // 每次字段值发生变化时 都会执行校验合法性的方法 并传入数组[name]
          () => this.validateFields([name])
        );
      };

      // 校验字段的合法性
      // 类型Array<string>|CallBack 一个函数兼容多种传参方式
      validateFields = (
        fields: Array<string> | CallBack,
        cb?: CallBack | Array<string>
      ) => {
        // 常用技巧 2个参数和1个参数兼容
        if (typeof fields === "function") {
          // this.props.form.validateFields
          cb = fields;
          // 如果没有指明rules校验规则的字段，就获取所有具有rules校验规则的字段
          fields = Object.keys(this.rules); //{username: [{ required: true, message: "请输入用户名" }]}
        }
        let errors: Objects = this.state.errors;
        fields.forEach((field: string) => {
          // 拿到每个字段的校验规则rules  [{ required: true, message: "请输入用户名" }]
          let rules = this.rules[field];
          if (rules && rules.length > 0) {
            // 获取该字段的值value并解析该字段的每个规则  { required: true, message: "请输入用户名" }
            let values: Objects = this.state.values;
            let value: any = values[field];
            let fieldErrors = rules
              .map((rule: Objects) => {
                if (
                  // 1.必填，但没有值
                  (rule.required && !value) ||
                  // 2.小于最小长度
                  (rule.min && value && value.length < rule.min) ||
                  // 3.大于最大长度
                  (rule.max && value && value.length > rule.max)
                ) {
                  return { field, message: rule.message };
                }
              })
              .filter((item: any) => item); // 过滤掉undefined
            if (fieldErrors.length > 0) {
              // 该字段至少有一个错误 将错误信息放入到this.state.error中
              //{username:{errors[{field:'username',message:'用户名不能为空'}]}}
              errors[field] = { errors: fieldErrors };
            } else {
              // 没有错误 清除该字段的错误信息
              delete errors[field];
            }
          }
        });
        // 如果this.state.error中有错误信息，就表示至少有一个字段有错误；返回错误信息，否则返回null
        let errorInfo = Object.keys(errors).length > 0 ? errors : null;
        this.setState({ errors }, () => {
          // 如果有回调函数 就传递参数并执行回调函数
          cb && (cb as CallBack)(errorInfo, this.state.values);
        });
      };
      render() {
        let props = {
          form: {
            name: "form属性...",
            //收集字段装饰器
            getFieldDecorator: this.getFieldDecorator,
            //获取所有字段值
            getFieldsValue: this.getFieldsValue,
            //校验字段的合法性
            validateFields: this.validateFields
          }
        };
        // 实现对WrappedComponent组件的增强，组件获得{...props}属性
        return <WrappedComponent {...props} />;
      }
    }
    return ProxyComponent;
  };
}
