import Content from '@/layouts/Dashboard/Content';
import { Row, Col, Input, Form } from 'antd';

import { FieldTypeUpdateProduct } from '../../models/businessSchema';

import { FormInstance } from 'antd/lib';

interface IProps {
  form: FormInstance;
  watchData: FieldTypeUpdateProduct | null;
}

export default function ProductInformation({ form }: IProps) {
  return (
    <Content style={{ marginBottom: '1.5em' }}>
      <Row>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
          style={{ marginBottom: '1em' }}
        >
          <p style={{ fontSize: 16, fontWeight: 600 }}>Product Information</p>
          <p style={{ fontSize: 14, fontWeight: 400 }}>
            Add complete information about your product by filling out each form
            below.
          </p>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
          style={{ marginBottom: '1em' }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              marginBottom: 10,
            }}
          >
            Pricing Name *
          </div>
          <Form.Item<FieldTypeUpdateProduct>
            style={{ margin: 0 }}
            name="productName"
            hasFeedback
            rules={[{ required: true, message: 'pricing name is required' }]}
          >
            <Input
              placeholder="Input your pricing name"
              name="productName"
              value={form.getFieldValue('productName')}
              onChange={(e) =>
                form.setFieldValue('productName', e.target.value)
              }
            />
          </Form.Item>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
          style={{ marginBottom: '1em' }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              marginBottom: 10,
            }}
          >
            Pricing Description *
          </div>
          <Form.Item<FieldTypeUpdateProduct>
            style={{ margin: 0 }}
            name="description"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'pricing description is required',
              },
            ]}
          >
            <Input.TextArea
              rows={3}
              placeholder="Input your pricing description"
              name="description"
              value={form.getFieldValue('description')}
              onChange={(e) =>
                form.setFieldValue('description', e.target.value)
              }
            />
          </Form.Item>
        </Col>
      </Row>
    </Content>
  );
}
