import { Button, Form, InputNumber, Row, Col } from 'antd';
import useFormEditBusinessSchemaUser from '../Hooks/useFormBusinessSchemaUser';

import { usePatchProductPlatform } from '../Hooks/useGetProductDefaultUser';

import { useAuthStore } from '@/store';

interface IFormUsers {
  handleClose: () => void;
  data: any;
  changeKey: string;
  id_user: any;
}

export default function FormEditBusinessSchemaProductUser({
  handleClose,
  data,
  changeKey,
  id_user,
}: IFormUsers) {
  const handleCloseForm = () => {
    handleClose();
  };

  const { user } = useAuthStore((state) => state);
  const { mutate } = usePatchProductPlatform();

  const { form, isLoading, onFinish, onFinishFailed } =
    useFormEditBusinessSchemaUser({
      handleCloseForm,
      mutate,
      data,
      changeKey,
      id_reseller: user?._id,
      id_user,
    });

  const init: any = {
    productPrice: data[changeKey] ? parseInt(data[changeKey]) : '',
  };

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
              Product Price
            </div>
            <Form.Item
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
        </Row>

        <Button
          type="primary"
          block
          disabled={isLoading}
          htmlType="submit"
          style={{ fontSize: 14, fontWeight: 700 }}
        >
          {!isLoading ? 'Edit Business Schema' : 'Loading ....'}
        </Button>
      </Form>
    </main>
  );
}
