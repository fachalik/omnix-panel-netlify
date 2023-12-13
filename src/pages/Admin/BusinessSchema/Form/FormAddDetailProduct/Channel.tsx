import React from 'react';
import Content from '@/layouts/Dashboard/Content';
import { Row, Col, Checkbox, Form, message } from 'antd';

import { FormInstance } from 'antd/lib';

interface IProps {
  form: FormInstance;
}
export default function Channel({ form }: IProps) {
  const digital = [
    {
      value: 'facebook',
      label: 'Facebook',
    },
    {
      value: 'instagram',
      label: 'Instagram',
    },
    {
      value: 'email',
      label: 'email',
    },
    {
      value: 'livechat',
      label: 'Livechat',
    },
    {
      value: 'telegram',
      label: 'Telegram',
    },
    {
      value: 'twitter',
      label: 'Twitter',
    },
    {
      value: 'line',
      label: 'Line',
    },
    {
      value: 'whatsapp',
      label: 'Whatsapp',
    },
  ];

  const nondigital = [
    {
      value: 'voice',
      label: 'Voice',
    },
    {
      value: 'videocall',
      label: 'Video call',
    },
  ];

  const [modalVisible, setModalVisible] = React.useState(false);

  const handleCheckboxChange = (key: any, value: any) => {
    const formValues = form.getFieldsValue();
    // console.log('formValues', formValues);
    // console.log('formValues[key]', formValues[key]);
    const updatedValues = formValues[key] || [];

    if (updatedValues.includes(value)) {
      // Remove the value if already checked
      updatedValues.splice(updatedValues.indexOf(value), 1);
    } else {
      // Add the value if not checked
      updatedValues.push(value);
    }

    // console.log('updatedValues', updatedValues);

    form.setFieldsValue({ [key]: updatedValues });
  };

  const showConfirmModal = () => {
    setModalVisible(true);
  };

  const handleModalOk = () => {
    // Handle confirmation logic
    message.success('Checkboxes unchecked!');
    form.setFieldsValue({ checkboxGroup: [] });
    setModalVisible(false);
  };

  const handleModalCancel = () => {
    // Handle cancel logic
    setModalVisible(false);
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
            {digital.map((option) => (
              <Form.Item key={option.value} name="digital">
                <Checkbox
                  style={{ marginRight: '1em', textTransform: 'capitalize' }}
                  onChange={() => handleCheckboxChange('digital', option.value)}
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
            {nondigital.map((option) => (
              <Form.Item key={option.value} name="nondigital">
                <Checkbox
                  style={{ marginRight: '1em', textTransform: 'capitalize' }}
                  onChange={() =>
                    handleCheckboxChange('nondigital', option.value)
                  }
                >
                  {option.label}
                </Checkbox>
              </Form.Item>
            ))}
          </div>
          {/* <Form.Item
            label="Select Social Media Channels"
            name="nondigital"
            rules={[
              {
                required: true,
                message: 'Please select at least one social media channel!',
              },
            ]}
          >
            <Checkbox.Group
              options={nondigital}
              style={{ marginRight: '1em', textTransform: 'capitalize' }}
            />
          </Form.Item> */}
        </Col>
      </Row>
    </Content>
  );
}
