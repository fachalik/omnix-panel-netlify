import Content from '@/layouts/Dashboard/Content';
import { Row, Col, Input, Form, Select, InputNumber } from 'antd';

import { FieldType } from '../../models/businessSchema';

import { FormInstance } from 'antd/lib';

interface IProps {
  form: FormInstance;
}
export default function ProductPricingInformation({ form }: IProps) {
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
            Pricing Category *
          </div>
          <Form.Item<FieldType>
            name="typeSchema"
            hasFeedback
            rules={[{ required: true, message: 'Product Price is required' }]}
          >
            <Select
              // loading={isLoadingMember}
              showSearch
              style={{ width: '100%' }}
              onChange={(value: any) => {
                form.setFieldValue('typeSchema', value);
              }}
              defaultValue={form.getFieldValue('typeSchema')}
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                (option?.label.toLowerCase() ?? '').includes(
                  input.toLowerCase()
                )
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
            Pricing Schema *
          </div>
          <Form.Item<FieldType>
            name="pricingSchema"
            hasFeedback
            rules={[{ required: true, message: 'Product Price is required' }]}
          >
            <Select
              showSearch
              style={{ width: '100%' }}
              onChange={(value: any) => {
                form.setFieldValue('pricingSchema', value);
              }}
              defaultValue={form.getFieldValue('pricingSchema')}
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                (option?.label.toLowerCase() ?? '').includes(
                  input.toLowerCase()
                )
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
            Price *
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
                  `${x}`.replace(/,/, '#').replace(/\./g, '').replace(/#/, '.')
                )
              }
            />
          </Form.Item>
        </Col>
        <Col
          xs={24}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{ paddingRight: 5, marginBottom: '1em' }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              marginBottom: 10,
            }}
          >
            Minimum Quantity
          </div>
          <Form.Item
            name="minQuantity"
            hasFeedback
            rules={[{ required: true, message: 'Product Price is required' }]}
          >
            <Input
              type="number"
              style={{ width: '100%' }}
              autoComplete="false"
              placeholder="Input your product price"
            />
          </Form.Item>
        </Col>
        <Col
          xs={24}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{ marginBottom: '1em' }}
        >
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
            name="maxQuantity"
            hasFeedback
            rules={[{ required: true, message: 'Product Price is required' }]}
          >
            <Input
              type="number"
              style={{ width: '100%' }}
              autoComplete="false"
              placeholder="Input your product price"
            />
          </Form.Item>
        </Col>
      </Row>
    </Content>
  );
}
