import { Form, Input } from "antd";

const CustomFormItem = () => {
  // 自定义渲染函数
  const customRender = {
    mark: "pro_table_render",
    render: (props, { input, errorList, extra }) => {
      console.log(errorList, "errorList");
      return (
        <div className="custom-form-item">
          {/* 自定义输入框的包装器 */}
          <div className="custom-input-wrapper">{input}</div>

          {/* 自定义错误信息展示 */}
          {errorList && <div className="custom-error">{errorList}</div>}

          {/* 自定义额外信息展示 */}
          {extra && <div className="custom-extra">{extra}</div>}
        </div>
      );
    },
  };

  return (
    <Form.Item
      label="用户名"
      name="username"
      rules={[{ required: true, message: "请输入用户名" }]}
      // @ts-expect-error
      _internalItemRender={customRender}
    >
      <Input />
    </Form.Item>
  );
};

export default CustomFormItem;
