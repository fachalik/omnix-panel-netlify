// import React from 'react';
import { Button, Form, Input } from 'antd';
import useFormDetailPackage from '../Hooks/useFormDetailPackage';

import { FieldTypeAddProduct } from '../models/businessSchema';

interface IFormMenu {
  handleClose: () => void;
  productType: string;
  productCategory: string;
}

export default function FormAddDetailPackage({
  handleClose,
  productType,
  productCategory,
}: IFormMenu) {
  const { form, isLoading, onFinish, onFinishFailed } = useFormDetailPackage({
    handleCloseForm: handleClose,
    // mutate: mutateCreate,
    productType,
    productCategory,
  });

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
          Product Name *
        </div>
        <Form.Item<FieldTypeAddProduct>
          name="productName"
          hasFeedback
          rules={[{ required: true, message: 'Product name is required' }]}
        >
          <Input placeholder="Input your product name" name="productName" />
        </Form.Item>

        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Description
        </div>
        <Form.Item<FieldTypeAddProduct>
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

        <Button
          type="primary"
          block
          disabled={isLoading}
          htmlType="submit"
          style={{ fontSize: 14, fontWeight: 700 }}
        >
          {!isLoading ? 'Add package' : 'Loading ...'}
        </Button>
      </Form>
    </main>
  );
}
