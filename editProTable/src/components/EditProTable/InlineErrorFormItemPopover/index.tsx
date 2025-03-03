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
      noStyle
      shouldUpdate={(prevValues, curValues) => {
        // 监听字段值变化
        return (
          prevValues[fieldName as string] !== curValues[fieldName as string]
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
            trigger={["click"]}
            placement="topLeft"
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
