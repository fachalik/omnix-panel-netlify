// import React from 'react';
import { Button, Form, Input, Select, InputNumber } from 'antd';
import useFormDetailProduct from '../Hooks/useFormDetailProduct';
import { usecreateProduct } from '@/hooks/ReactQuery/admin/useGetProduct';

import { FieldTypeAddProduct } from '../models/businessSchema';

interface IFormMenu {
  handleClose: () => void;
  productType: string;
  productCategory: string;
}

export default function FormAddDetailProduct({
  handleClose,
  productType,
  productCategory,
}: IFormMenu) {
  const { mutate: mutateCreate } = usecreateProduct();
  const { form, isLoading, onFinish, onFinishFailed } = useFormDetailProduct({
    handleCloseForm: handleClose,
    mutate: mutateCreate,
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

        <Form.Item<FieldTypeAddProduct>
          name="typeDetails"
          hasFeedback
          rules={[{ required: true, message: 'Product type is required' }]}
        >
          <Select
            // loading={isLoadingMember}
            showSearch
            style={{ width: '100%' }}
            onChange={(value: any) => {
              form.setFieldValue('typeDetails', value);
            }}
            defaultValue={form.getFieldValue('typeDetails')}
            optionFilterProp="children"
            filterOption={(input: any, option: any) =>
              (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())
            }
            options={[
              {
                value: 'PACKAGE',
                label: 'Package',
              },
              {
                value: 'ALACARTE',
                label: 'Ala Carte',
              },
              {
                value: 'ADDON',
                label: 'Add On',
              },
            ]}
          />
        </Form.Item>

        <Form.Item<FieldTypeAddProduct>
          name="typeSchema"
          hasFeedback
          rules={[{ required: true, message: 'Product Price is required' }]}
        >
          <Select
            showSearch
            style={{ width: '100%' }}
            onChange={(value: any) => {
              form.setFieldValue('typeSchema', value);
            }}
            defaultValue={form.getFieldValue('typeSchema')}
            optionFilterProp="children"
            filterOption={(input: any, option: any) =>
              (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())
            }
            options={[
              {
                value: 'LICENSE_GENERAL',
                label: 'License General',
              },
              {
                value: 'LICENSE_USER',
                label: 'License User',
              },
              {
                value: 'TRANSACTION',
                label: 'Transaction',
              },
            ]}
          />
        </Form.Item>

        <div
          style={{
            fontSize: 12,
            fontWeight: 'bold',
            marginBottom: 10,
          }}
        >
          Price *
        </div>
        <Form.Item<FieldTypeAddProduct>
          name="productPrice"
          hasFeedback
          rules={[{ required: true, message: 'Product Price is required' }]}
        >
          <InputNumber
            prefix="Rp."
            style={{ width: '100%' }}
            autoComplete="false"
            placeholder="Input your product price"
            formatter={(value) =>
              ` ${value}`
                .replace(/\./, ',')
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
            }
            parser={(x) =>
              parseFloat(
                `${x}`.replace(/,/, '#').replace(/\./g, '').replace(/#/, '.')
              )
            }
          />
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
        {/* 
        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Is Active
        </div>
        <Form.Item<FieldTypeAddProduct> name="status" valuePropName="checked">
          <Switch defaultChecked />
        </Form.Item> */}

        <Button
          type="primary"
          block
          disabled={isLoading}
          htmlType="submit"
          style={{ fontSize: 14, fontWeight: 700 }}
        >
          {!isLoading ? 'Add product' : 'Loading ...'}
        </Button>
      </Form>
    </main>
  );
}
