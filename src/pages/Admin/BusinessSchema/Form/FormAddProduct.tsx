import { Button, Form, InputNumber, Row, Col, Input, Switch } from 'antd';
import useFormAddProduct from '../Hooks/useFormAddProduct';

import { usecreateProductAdmin } from '../Hooks/useGetProduct';

interface IFormAddProduct {
  handleClose: () => void;
  productType: string;
  productCategory: string;
  typeDetails: string;
  query_key: string;
  refetch: any;
}

type FieldType = {
  productName?: string;
  productPrice?: string;
  description?: string;
  status?: boolean;
  digital?: number;
  voice?: number;
  svp?: number;
  backroom?: number;
  email?: number;
  sms?: number;
  whatsapp?: number;
};

export default function FormEditBusinessSchemaProduct({
  handleClose,
  productCategory,
  productType,
  typeDetails,
  query_key,
  refetch,
}: IFormAddProduct) {
  const handleCloseForm = () => {
    handleClose();
  };

  const { mutate } = usecreateProductAdmin({ query_key });

  const { form, isLoading, onFinish, onFinishFailed } = useFormAddProduct({
    handleCloseForm,
    mutate,
    productCategory,
    productType,
    typeDetails,
    refetch,
  });

  const init: any = {};

  form.setFieldsValue(init);

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
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
              Product Name
            </div>
            <Form.Item<FieldType>
              name="productName"
              hasFeedback
              rules={[{ required: true, message: 'Product name is required' }]}
            >
              <Input placeholder="Input your product Name" name="productName" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
              Product Price
            </div>
            <Form.Item<FieldType>
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
                    `${x}`
                      .replace(/,/, '#')
                      .replace(/\./g, '')
                      .replace(/#/, '.')
                  )
                }
              />
            </Form.Item>
          </Col>
          {typeDetails === 'PAKET' &&
            productCategory === 'PLATFORM_OMNIX_SERVICE' && (
              <>
                <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      marginBottom: 3,
                    }}
                  >
                    Agent Digital
                  </div>
                  <Form.Item<FieldType>
                    name="digital"
                    hasFeedback
                    rules={[
                      { required: true, message: 'agent digital is required' },
                    ]}
                  >
                    <Input type="number" placeholder="0" name="digital" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      marginBottom: 3,
                    }}
                  >
                    Agent Voice
                  </div>
                  <Form.Item<FieldType>
                    name="voice"
                    hasFeedback
                    rules={[
                      { required: true, message: 'agent voice is required' },
                    ]}
                  >
                    <Input type="number" placeholder="0" name="voice" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      marginBottom: 3,
                    }}
                  >
                    Agent SVP
                  </div>
                  <Form.Item<FieldType>
                    name="svp"
                    hasFeedback
                    rules={[
                      { required: true, message: 'agent svp is required' },
                    ]}
                  >
                    <Input type="number" placeholder="0" name="svp" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      marginBottom: 3,
                    }}
                  >
                    Backroom / Ticketing
                  </div>
                  <Form.Item<FieldType>
                    name="backroom"
                    hasFeedback
                    rules={[
                      { required: true, message: 'backroom is required' },
                    ]}
                  >
                    <Input type="number" placeholder="0" name="backroom" />
                  </Form.Item>
                </Col>
              </>
            )}

          {typeDetails === 'PAKET' &&
            productCategory === 'PLATFORM_OMNIX_SALES' && (
              <>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      marginBottom: 3,
                    }}
                  >
                    Agent Voice
                  </div>
                  <Form.Item<FieldType>
                    name="voice"
                    hasFeedback
                    rules={[
                      { required: true, message: 'agent voice is required' },
                    ]}
                  >
                    <Input type="number" placeholder="0" name="voice" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      marginBottom: 3,
                    }}
                  >
                    Agent SVP
                  </div>
                  <Form.Item<FieldType>
                    name="svp"
                    hasFeedback
                    rules={[
                      { required: true, message: 'agent svp is required' },
                    ]}
                  >
                    <Input type="number" placeholder="0" name="svp" />
                  </Form.Item>
                </Col>
              </>
            )}

          {typeDetails === 'PAKET' &&
            productCategory === 'PLATFORM_OMNIX_MARKETING' && (
              <>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      marginBottom: 3,
                    }}
                  >
                    SMS
                  </div>
                  <Form.Item<FieldType>
                    name="sms"
                    hasFeedback
                    rules={[{ required: true, message: 'sms is required' }]}
                  >
                    <Input type="number" placeholder="0" name="sms" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      marginBottom: 3,
                    }}
                  >
                    EMAIL
                  </div>
                  <Form.Item<FieldType>
                    name="email"
                    hasFeedback
                    rules={[{ required: true, message: 'email is required' }]}
                  >
                    <Input type="number" placeholder="0" name="email" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      marginBottom: 3,
                    }}
                  >
                    WHATSAPP
                  </div>
                  <Form.Item<FieldType>
                    name="whatsapp"
                    hasFeedback
                    rules={[
                      { required: true, message: 'whatsapp is required' },
                    ]}
                  >
                    <Input type="number" placeholder="0" name="whatsapp" />
                  </Form.Item>
                </Col>
              </>
            )}
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
              Description
            </div>
            <Form.Item<FieldType>
              name="description"
              hasFeedback
              rules={[{ required: true, message: 'description is required' }]}
            >
              <Input.TextArea placeholder="" name="description" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
              Is Active
            </div>
            <Form.Item<FieldType> name="status" valuePropName="checked">
              <Switch defaultChecked />
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
          {!isLoading ? 'Add Product' : 'Loading ....'}
        </Button>
      </Form>
    </main>
  );
}
