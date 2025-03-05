import { Form, Popover } from 'antd'
import { NamePath } from 'antd/es/form/interface'
import { FC, useState } from 'react'

interface InlineErrorFormItemPopoverProps {
  fieldName: NamePath
  // 错误信息展示类型
  errorType: 'popover' | undefined
  children: React.ReactNode
}
/**
 * @description 行内错误信息展示
 *  1. 获取errors 错误信息；
 *  2. 如果有错误就展示，没有就不需要展示；
 *
 *
 *
 */
const InlineErrorFormItemPopover: FC<InlineErrorFormItemPopoverProps> = ({
  children,
  fieldName,
  //   errorType,
}) => {
  const [open, setOpen] = useState(false)
  const [refresh, setRefresh] = useState(0)
  const form = Form.useFormInstance()

  console.log(form.getFieldError(fieldName))

  return (
    <Form.Item
      noStyle
      shouldUpdate={(prevValues, curValues) => {
        // 监听字段值变化
        setTimeout(() => {
          setRefresh(Math.random())
          // console.log('refresh')
        }, 0)

        return (
          prevValues[fieldName as string] !== curValues[fieldName as string]
        )
      }}
    >
      {/*  */}
      {(form) => {
        const errors = form.getFieldError(fieldName)
        const hasError = errors.length > 0

        return (
          <Popover
            open={hasError && open}
            onOpenChange={setOpen}
            content={
              <span style={{ color: '#ff4d4f' }}>{errors.join(', ')}</span>
            }
            placement="topLeft"
            trigger={['click']}
          >
            <div>{children}</div>
          </Popover>
        )
      }}
    </Form.Item>
  )
}

export default InlineErrorFormItemPopover
