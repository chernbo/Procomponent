import { useState } from "react";
import { Table, Form, Select, Button, Input } from "antd";
import InlineErrorFormItemPopover from "./InlineErrorFormItemPopover";

type DataSourceType = {
  id: React.Key;
  title?: string;
  decs?: string;
  state?: string;
  created_at?: number;
  children?: DataSourceType[];
  [key: string]: unknown;
};

const defaultData: DataSourceType[] = new Array(5).fill(1).map((_, index) => {
  return {
    id: (Date.now() + index).toString(),
    title: `活动名称${index}`,
    decs: "这个活动真好玩",
    state: "open",
    created_at: 1590486176000,
  };
});

const EditProTable = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<DataSourceType[]>(defaultData);
  const [editingKey, setEditingKey] = useState<React.Key | null>(null);

  const isEditing = (record: DataSourceType) => record.id === editingKey;

  const edit = (record: DataSourceType) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  const save = async (id: React.Key) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
        setEditingKey(null);
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "活动名称",
      dataIndex: "title",
      render: (value, record) => {
        if (isEditing(record)) {
          return (
            <InlineErrorFormItemPopover fieldName="title" errorType="popover">
              <Form.Item
                rules={[{ required: true, message: "请输入活动名称" }]}
                name="title"
                noStyle
              >
                <Input style={{ width: "100%" }} allowClear />
              </Form.Item>
            </InlineErrorFormItemPopover>
          );
        }
        return value;
      },
    },
    {
      title: "状态",
      dataIndex: "state",
      render: (value, record) => {
        if (isEditing(record)) {
          return (
            <InlineErrorFormItemPopover fieldName="state" errorType="popover">
              <Form.Item name="state" noStyle>
                <Select style={{ width: "100%" }} allowClear />
              </Form.Item>
            </InlineErrorFormItemPopover>
          );
        }
        return value;
      },
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: (text: string, record: DataSourceType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button type="link" onClick={() => save(record.id)}>
              保存
            </Button>
            <Button type="link" onClick={() => setEditingKey(null)}>
              取消
            </Button>
          </span>
        ) : (
          <Button type="link" onClick={() => edit(record)}>
            编辑
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Form form={form} component={false}>
        <Table
          rowKey="id"
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          style={{ marginTop: 16 }}
        />
      </Form>
      <pre>{JSON.stringify(dataSource, null, 2)}</pre>
    </>
  );
};

export default EditProTable;
