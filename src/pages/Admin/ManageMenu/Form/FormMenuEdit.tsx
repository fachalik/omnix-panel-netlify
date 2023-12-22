import { Button, Form, Input, Switch, Typography } from 'antd';
import useFormMenu from '../Hooks/useFormMenu';
import { usePatchMenu } from '@/hooks/ReactQuery/admin/useGetMenu';

type FieldType = {
  accessor?: string;
  label?: string;
  icon?: string;
  parentAccessor?: string;
  status?: string;
  path?: string;
};

interface IFormTeam {
  handleClose: () => void;
  data: any;
}

export default function FormMenuEdit({ handleClose, data }: IFormTeam) {
  const { mutate } = usePatchMenu();
  const { form, isLoading, onFinish, onFinishFailed } = useFormMenu({
    handleCloseForm: handleClose,
    mutate,
  });

  const init: any = {
    accessor: data.accessor,
    path: data.path,
    label: data.label,
    icon: data.icon,
    parentAccessor: data.parentAccessor,
    status: data.status == '1' ? true : false,
  };

  form.setFieldsValue(init);

  return (
    <main style={{ width: '100%', height: '100%' }}>
      <Form
        style={{ marginTop: 20 }}
        autoComplete="off"
        name="basic"
        layout="vertical"
        form={form}
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Accessor
        </div>
        <Form.Item<FieldType>
          name="accessor"
          hasFeedback
          rules={[{ required: true, message: 'accessor is required' }]}
        >
          <Input placeholder="Input your accessor" name="accessor" />
        </Form.Item>

        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Path
        </div>
        <Form.Item<FieldType>
          name="path"
          hasFeedback
          rules={[{ required: true, message: 'path is required' }]}
        >
          <Input placeholder="Input your path" name="path" />
        </Form.Item>

        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Label
        </div>
        <Form.Item<FieldType>
          name="label"
          hasFeedback
          rules={[{ required: true, message: 'label is required' }]}
        >
          <Input placeholder="Input your label" name="label" />
        </Form.Item>

        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Icon
        </div>
        <div style={{ display: 'flex' }}>
          <Typography.Paragraph>you can get icon here</Typography.Paragraph>
          <a
            href="https://remixicon.com/"
            target="_blank"
            style={{ marginLeft: '0.2em' }}
          >
            https://remixicon.com/
          </a>
        </div>
        <Form.Item<FieldType>
          name="icon"
          hasFeedback
          rules={[{ required: true, message: 'icon is required' }]}
        >
          <Input placeholder="Input your icon" name="icon" />
        </Form.Item>

        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Parent Accessor
        </div>
        <Form.Item<FieldType> name="parentAccessor" hasFeedback>
          <Input
            placeholder="Input your Parent Accessor"
            name="parentAccessor"
          />
        </Form.Item>

        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Is Active
        </div>
        <Form.Item<FieldType> name="status" valuePropName="checked">
          <Switch defaultChecked />
        </Form.Item>

        <Button
          type="primary"
          block
          disabled={isLoading}
          htmlType="submit"
          style={{ fontSize: 14, fontWeight: 700 }}
        >
          {!isLoading ? 'Edit Akun' : 'Loading ...'}
        </Button>
      </Form>
    </main>
  );
}
