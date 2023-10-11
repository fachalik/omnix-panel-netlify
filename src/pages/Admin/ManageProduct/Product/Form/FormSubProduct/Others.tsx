import React from 'react';
import { Button, Form, Input, InputNumber, Row, Col, Select } from 'antd';
import useFormSubProduct from '../../Hooks/useFormSubProduct';
import { useCreateSubProduct } from '../../Hooks/useGetProductAdmin';
import useGetProducts from '@/hooks/useGetProducts';

interface IFormUsers {
  handleClose: () => void;
  setChooseForm: (text: any) => void;
  data: any;
}

export default function Others({
  handleClose,
  data,
  setChooseForm,
}: IFormUsers) {
  const handleCloseForm = () => {
    handleClose();
  };

  const { data: dataProducts, isLoading: isLoadingProducts } = useGetProducts();
  const { mutate } = useCreateSubProduct();

  const { form, isLoading, onFinish, onFinishFailed } = useFormSubProduct({
    handleCloseForm,
    mutate,
    setChooseForm,
  });

  React.useEffect(() => {
    let isMount = true;

    if (isMount && data) {
      form.setFieldValue('productId', data?.productId);
    }

    return () => {
      isMount = false;
    };
  }, [data]);

  return (
    <main style={{ width: '100%', height: '100%', overflow: 'scroll' }}>
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
        <Row
          gutter={[12, 12]}
          style={{
            width: '100%',
            alignItems: 'start',
          }}
        >
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
              Sub Product ID
            </div>
            <Form.Item
              name="subproductId"
              hasFeedback
              rules={[
                { required: true, message: 'Sub Product id is required' },
              ]}
            >
              <Input
                autoComplete="false"
                placeholder="Input your Sub Product ID"
                name="subproductId"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
              Sub Product Name
            </div>
            <Form.Item
              name="subproductName"
              hasFeedback
              rules={[
                { required: true, message: 'Sub Product Name is required' },
              ]}
            >
              <Input
                autoComplete="false"
                placeholder="Input your Sub Product Name"
                name="subproductName"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
              Sub Product Unit
            </div>
            <Form.Item
              name="subproductUnit"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Sub Product Unit is required',
                },
              ]}
            >
              <Input
                autoComplete="false"
                placeholder="Input your Sub Product Unit"
                name="subproductUnit"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
              Sub Product Price
            </div>
            <Form.Item
              name="subproductPrice"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Sub Product Price is required',
                },
              ]}
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
                    `${x}`
                      .replace(/,/, '#')
                      .replace(/\./g, '')
                      .replace(/#/, '.')
                  )
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
              Products
            </div>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Select something!',
                },
              ]}
              name="productId"
            >
              <Select
                disabled
                showSearch
                placeholder="Search products id"
                optionFilterProp="children"
                loading={isLoadingProducts}
                filterOption={(input, option) =>
                  (option?.label?.toLowerCase() ?? '').includes(
                    input?.toLowerCase()
                  )
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare(
                      (optionB?.label?.toLowerCase() ?? '').toLowerCase()
                    )
                }
                options={dataProducts}
                defaultValue={data?.productId}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
              Sub Product Description
            </div>
            <Form.Item
              name="subproductDescription"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Sub Product Description is required',
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                autoComplete="false"
                placeholder="Input your Sub Product description"
                name="subproductDescription"
              />
            </Form.Item>
          </Col>
        </Row>

        <Button
          type="primary"
          block
          disabled={isLoading}
          htmlType="submit"
          style={{ fontSize: 14, fontWeight: 700 }}
        >
          {!isLoading ? 'Tambah Sub Product' : 'Loading ....'}
        </Button>
      </Form>
    </main>
  );
}
