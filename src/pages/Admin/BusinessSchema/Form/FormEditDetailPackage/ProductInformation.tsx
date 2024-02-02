import React from 'react';
import Content from '@/layouts/Dashboard/Content';
import { Row, Col, Input, Form, InputNumber } from 'antd';
import { FieldTypeUpdateProduct } from '../../models/businessSchema';

import { FormInstance } from 'antd/lib';

interface IProps {
  form: FormInstance;
  watchData: FieldTypeUpdateProduct | null;
  error: any;
  role?: string;
}

export default function ProductInformation({ form, role }: IProps) {
  const [totalPrice, setTotalPrice] = React.useState(0);

  const productsPackage = form.getFieldValue('productsPackage');
  const addon = form.getFieldValue('addon');

  React.useEffect(() => {
    let isMount = true;

    if (isMount) {
      let totalPriceTemp = 0;
      let totalPriceAddon = 0;

      if (productsPackage) {
        productsPackage.forEach((item: any) => {
          totalPriceTemp += item.price * item.quantity;
        });
      }

      if (addon) {
        const totalPrice: any = addon.reduce((total: any, item: any) => {
          // For each object in 'data', we iterate over its '_id' array
          const itemTotalPrice = item._id.reduce(
            (subtotal: any, idObjString: any) => {
              // Parse the JSON string to get the object
              const idObj = JSON.parse(idObjString);
              // Extract the price and add it to the subtotal
              return subtotal + idObj.price;
            },
            0
          ); // Initial subtotal is 0

          // Add the subtotal of prices for this item to the total
          return total + itemTotalPrice;
        }, 0); // Initial total is 0
        totalPriceAddon += totalPrice;
      }

      setTotalPrice(totalPriceTemp + totalPriceAddon);
      form.setFieldValue('productPrice', totalPriceTemp + totalPriceAddon);
    }

    return () => {
      isMount = false;
    };
  }, [productsPackage, addon]);

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
            rules={[
              { required: true, message: 'pricing name is required' },
              {
                type: 'regexp',
                pattern: new RegExp('([a-zA-Z]{3,30}\\s*)+'),
                message: 'Format is wrong',
              },
            ]}
          >
            <Input
              disabled={!!role}
              placeholder="Input your pricing name"
              name="productName"
              value={form.getFieldValue('productName')}
              onChange={(e) => {
                form.setFieldValue('productName', e.target.value);
              }}
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
              disabled={!!role}
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
          <Form.Item<FieldTypeUpdateProduct>
            name="productPrice"
            hasFeedback
            rules={[{ required: true, message: 'Product Price is required' }]}
          >
            <InputNumber
              disabled
              // disabled={!!role}
              prefix="Rp."
              style={{ width: '100%' }}
              autoComplete="false"
              value={totalPrice}
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
      </Row>
    </Content>
  );
}
