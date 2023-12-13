import React from 'react';
import { Button, Form, Switch, Input } from 'antd';
import useFormMProduct from '../Hooks/useFormMProduct';
import {
  usecreateMProduct,
  usepatchMProduct,
} from '@/hooks/ReactQuery/admin/useGetMProduct';

type FieldType = {
  name?: string;
  description?: string;
  status?: boolean;
};

interface IFormMenu {
  handleClose: () => void;
  productType: string;
  data?: any;
}

export default function FormMProduct({
  handleClose,
  productType,
  data,
}: IFormMenu) {
  const { mutate: mutateCreate } = usecreateMProduct();
  const { mutate: mutatePatch } = usepatchMProduct();
  const { form, isLoading, onFinish, onFinishFailed } = useFormMProduct({
    handleCloseForm: handleClose,
    mutate: data ? mutatePatch : mutateCreate,
    productType,
    data,
  });

  React.useEffect(() => {
    let isMount = true;

    if (isMount && data) {
      form.setFieldsValue({
        name: data.name,
        description: data.description,
        status: data.status === 1 ? true : false,
      });
    }

    if (isMount && !data) {
      form.setFieldsValue({
        name: '',
        description: '',
        status: true,
      });
    }

    return () => {
      isMount = false;
    };
  }, [data]);

  return (
    <main style={{ width: '100%', height: '100%' }}>
      <Form
        style={{ marginTop: 20 }}
        autoComplete="off"
        name="basic"
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Name
        </div>
        <Form.Item<FieldType>
          name="name"
          hasFeedback
          rules={[{ required: true, message: 'name is required' }]}
        >
          <Input placeholder="Input your name" name="name" />
        </Form.Item>

        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Description
        </div>
        <Form.Item<FieldType>
          name="description"
          hasFeedback
          rules={[{ required: true, message: 'description is required' }]}
        >
          <Input.TextArea
            rows={5}
            placeholder="Input your description"
            name="description"
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
          {!isLoading ? (data ? 'Edit product' : 'Add product') : 'Loading ...'}
        </Button>
      </Form>
    </main>
  );
}
