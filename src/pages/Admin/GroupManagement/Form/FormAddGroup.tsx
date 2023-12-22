import { Button, Form, Input, Switch } from 'antd';
import useFormGroup from '../Hooks/useFormGroup';
import { usecreateGroup } from '@/hooks/ReactQuery/admin/useGetGroup';

type FieldType = {
  name_group?: string;
  status?: boolean;
  description?: string;
};

interface IFormTeam {
  handleClose: () => void;
}

export default function FormAddGroup({ handleClose }: IFormTeam) {
  const { mutate } = usecreateGroup();
  const { form, isLoading, onFinish, onFinishFailed } = useFormGroup({
    handleCloseForm: handleClose,
    mutate,
  });

  form.setFieldsValue({
    name_group: '',
    status: true,
    description: '',
  });
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
          Group
        </div>
        <Form.Item<FieldType>
          name="name_group"
          hasFeedback
          rules={[{ required: true, message: 'group is required' }]}
        >
          <Input placeholder="Input your group" name="name_group" />
        </Form.Item>

        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Is Active
        </div>
        <Form.Item<FieldType> name="status" valuePropName="checked">
          <Switch defaultChecked />
        </Form.Item>

        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Description
        </div>
        <Form.Item<FieldType>
          name="description"
          hasFeedback
          rules={[{ required: true, message: 'Description is required' }]}
        >
          <Input.TextArea placeholder="" name="description" />
        </Form.Item>

        <Button
          type="primary"
          block
          disabled={isLoading}
          htmlType="submit"
          style={{ fontSize: 14, fontWeight: 700 }}
        >
          {!isLoading ? 'Buat Group' : 'Loading ...'}
        </Button>
      </Form>
    </main>
  );
}
