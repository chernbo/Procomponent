import { Form, Popover } from "antd";
import { NamePath } from "antd/es/form/interface";
import { FC, useState } from "react";

interface InlineErrorFormItemPopoverProps {
  fieldName: NamePath;
  // 错误信息展示类型
  errorType: "popover" | undefined;
  children: React.ReactNode;
}
/**
 * @description 行内错误信息展示
 */
const InlineErrorFormItemPopover: FC<InlineErrorFormItemPopoverProps> = ({
  children,
  fieldName,
  //   errorType,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Form.Item
      shouldUpdate={(prevValues, curValues, info) => {
        // 监听字段值变化或者验证状态变化
        return (
          prevValues[fieldName as string] !== curValues[fieldName as string] ||
          info.type === "validateField" ||
          info.type === "validateFields"
        );
      }}
    >
      {(form) => {
        const errors = form.getFieldError(fieldName);
        const hasError = errors.length > 0;

        return (
          <Popover
            open={hasError && open}
            onOpenChange={setOpen}
            content={
              <span style={{ color: "#ff4d4f" }}>{errors.join(", ")}</span>
            }
            trigger={["hover", "focus"]}
            placement="topLeft"
            overlayStyle={{ maxWidth: 250 }}
          >
            <div onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>
              {children}
            </div>
          </Popover>
        );
      }}
    </Form.Item>
  );
};

export default InlineErrorFormItemPopover;
