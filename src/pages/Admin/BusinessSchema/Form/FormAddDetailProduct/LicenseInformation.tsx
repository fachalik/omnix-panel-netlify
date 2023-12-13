import Content from '@/layouts/Dashboard/Content';
import { Row, Col, Input, Form } from 'antd';

import { FieldType } from '../../models/businessSchema';

import { FormInstance } from 'antd/lib';

interface IProps {
  form: FormInstance;
}

export default function LicenseInformation({ form }: IProps) {
  return (
    <Content style={{ marginBottom: '1.5em' }}>
      <Row
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
        }}
      >
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
          style={{ marginBottom: '1em' }}
        >
          <p style={{ fontSize: 16, fontWeight: 600 }}>License Information</p>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
          style={{ marginBottom: '1em' }}
        >
          <Row
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Col xs={24} md={4}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginBottom: 10,
                }}
              >
                License Agent
              </div>
            </Col>
            <Col xs={24} md={10}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginBottom: 10,
                }}
              >
                Minimum Quantity
              </div>
              <Form.Item<FieldType>
                name={['licenseAgent', 'minQuantity']}
                hasFeedback
                rules={[
                  { required: true, message: 'Product Price is required' },
                ]}
              >
                <Input
                  type="number"
                  onChange={(e) =>
                    form.setFieldsValue({
                      licenseAgent: {
                        minQuantity: e.target.value,
                      },
                    })
                  }
                  value={
                    // form.getFieldValue('licenseAgent.minquantity')
                    form.getFieldValue(['licenseAgent', 'minquantity'])
                  }
                  style={{ width: '90%' }}
                  autoComplete="false"
                  placeholder="Input your product price"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={10}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginBottom: 10,
                }}
              >
                Maximum Quantity
              </div>
              <Form.Item<FieldType>
                name={['licenseAgent', 'maxQuantity']}
                hasFeedback
                rules={[
                  { required: true, message: 'Product Price is required' },
                ]}
              >
                <Input
                  type="number"
                  onChange={(e) =>
                    form.setFieldsValue({
                      licenseAgent: {
                        maxQuantity: e.target.value,
                      },
                    })
                  }
                  value={
                    // form.getFieldValue('licenseAgent.maxQuantity')
                    form.getFieldValue(['licenseAgent', 'maxQuantity'])
                  }
                  style={{ width: '90%' }}
                  autoComplete="false"
                  placeholder="Input your product price"
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
          style={{ marginBottom: '1em' }}
        >
          <Row
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Col xs={24} md={4}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginBottom: 10,
                }}
              >
                License SVP
              </div>
            </Col>
            <Col xs={24} md={10}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginBottom: 10,
                }}
              >
                Minimum Quantity
              </div>
              <Form.Item<FieldType>
                name={['licenseSVP', 'minQuantity']}
                hasFeedback
                rules={[
                  { required: true, message: 'Product Price is required' },
                ]}
              >
                <Input
                  onChange={(e) =>
                    form.setFieldsValue({
                      licenseSVP: {
                        minQuantity: e.target.value,
                      },
                    })
                  }
                  value={form.getFieldValue(['licenseSVP', 'minQuantity'])}
                  type="number"
                  style={{ width: '90%' }}
                  autoComplete="false"
                  placeholder="Input your product price"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={10}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginBottom: 10,
                }}
              >
                Maximum Quantity
              </div>
              <Form.Item<FieldType>
                name={['licenseSVP', 'maxQuantity']}
                hasFeedback
                rules={[
                  { required: true, message: 'Product Price is required' },
                ]}
              >
                <Input
                  onChange={(e) =>
                    // form.setFieldValue('licenseSVP.maxQuantity', e.target.value)
                    form.setFieldsValue({
                      licenseSVP: {
                        maxQuantity: e.target.value,
                      },
                    })
                  }
                  value={
                    // form.getFieldValue('licenseSVP.maxQuantity')
                    form.getFieldValue(['licenseSVP', 'maxQuantity'])
                  }
                  type="number"
                  style={{ width: '90%' }}
                  autoComplete="false"
                  placeholder="Input your product price"
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
          style={{ marginBottom: '1em' }}
        >
          <Row
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Col xs={24} md={4}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginBottom: 10,
                }}
              >
                License Backroom
              </div>
            </Col>
            <Col xs={24} md={10}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginBottom: 10,
                }}
              >
                Minimum Quantity
              </div>

              <Form.Item<FieldType>
                name={['licenseBackroom', 'minQuantity']}
                hasFeedback
                rules={[
                  { required: true, message: 'Product Price is required' },
                ]}
              >
                <Input
                  onChange={(e) =>
                    form.setFieldsValue({
                      licenseBackroom: {
                        minQuantity: e.target.value,
                      },
                    })
                  }
                  value={form.getFieldValue(['licenseBackroom', 'minQuantity'])}
                  type="number"
                  style={{ width: '90%' }}
                  autoComplete="false"
                  placeholder="Input your product price"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={10}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginBottom: 10,
                }}
              >
                Maximum Quantity
              </div>

              <Form.Item<FieldType>
                name={['licenseBackroom', 'maxQuantity']}
                hasFeedback
                rules={[
                  { required: true, message: 'Product Price is required' },
                ]}
              >
                <Input
                  onChange={(e) =>
                    form.setFieldsValue({
                      licenseBackroom: {
                        maxQuantity: e.target.value,
                      },
                    })
                  }
                  value={form.getFieldValue(['licenseBackroom', 'maxQuantity'])}
                  type="number"
                  style={{ width: '90%' }}
                  autoComplete="false"
                  placeholder="Input your product price"
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Content>
  );
}
