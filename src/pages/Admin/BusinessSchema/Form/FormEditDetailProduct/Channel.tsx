// import React from 'react';
import Content from '@/layouts/Dashboard/Content';
import {
  Row,
  Col,
  Checkbox,
  Form,
  // message
} from 'antd';

import { FormInstance } from 'antd/lib';
import { channel } from '../../models/listChannel';
import { FieldTypeUpdateProduct } from '../../models/businessSchema';

interface IProps {
  form: FormInstance;
  watchData: FieldTypeUpdateProduct | null;
  error: any;
  role?: string;
}
export default function Channel({ form, role }: IProps) {
  const handleCheckboxChange = (key: any, value: any) => {
    const formValues = form.getFieldsValue();

    const updatedValues = formValues[key] || [];

    if (updatedValues.includes(value)) {
      // Remove the value if already checked
      updatedValues.splice(updatedValues.indexOf(value), 1);
    } else {
      // Add the value if not checked
      updatedValues.push(value);
    }

    form.setFieldsValue({ [key]: updatedValues });
  };

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
          <p style={{ fontSize: 16, fontWeight: 600 }}>Channel</p>
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
            Digital Channel *
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {channel
              .filter((item) => item.channel === 'digital')
              .map((option) => (
                <Form.Item key={option.value} name="channel">
                  <Checkbox
                    disabled={!!role}
                    name="channel"
                    checked={form
                      .getFieldValue('channel')
                      ?.includes(option.value)}
                    style={{ marginRight: '1em', textTransform: 'capitalize' }}
                    onChange={() =>
                      handleCheckboxChange('channel', option.value)
                    }
                  >
                    {option.label}
                  </Checkbox>
                </Form.Item>
              ))}
          </div>
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
            Non Digital *
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {channel
              .filter((item) => item.channel === 'nondigital')
              .map((option) => (
                <Form.Item key={option.value} name="channel">
                  <Checkbox
                    disabled={!!role}
                    name="channel"
                    checked={form
                      .getFieldValue('channel')
                      ?.includes(option.value)}
                    style={{ marginRight: '1em', textTransform: 'capitalize' }}
                    onChange={() =>
                      handleCheckboxChange('channel', option.value)
                    }
                  >
                    {option.label}
                  </Checkbox>
                </Form.Item>
              ))}
          </div>
        </Col>
      </Row>
    </Content>
  );
}
