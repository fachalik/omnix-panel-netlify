import { Form, Input, Row, Col, Button, Select } from 'antd';

export const PaymentInformation = () => {
  const [form] = Form.useForm();
  return (
    <Form form={form} style={{ width: '100%' }}>
      <Row gutter={[16, 16]}>
        <Col
          xs={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'start',
            gap: '.5em',
          }}
        >
          <p style={{ fontSize: 14, fontWeight: 700 }}>Order ID</p>
          <Form.Item style={{ width: '100%' }}>
            <Input placeholder="email" type="email" />
          </Form.Item>
        </Col>
        <Col
          xs={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'start',
            gap: '.5em',
          }}
        >
          <p style={{ fontSize: 14, fontWeight: 700 }}>Billing</p>
          <Form.Item style={{ width: '100%' }}>
            <Select
              placeholder="billing"
              style={{ width: '100%' }}
              options={[
                { value: 'annual', label: 'Annual' },
                { value: 'monthly', label: 'Monthly' },
              ]}
            />
          </Form.Item>
        </Col>
        <Col
          xs={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'start',
            gap: '.5em',
          }}
        >
          <p style={{ fontSize: 14, fontWeight: 700 }}>Payment Method</p>
          <Form.Item style={{ width: '100%' }}>
            <Select
              placeholder="payment Method"
              style={{ width: '100%' }}
              options={[
                { value: 'VA', label: 'Virtual Account' },
                { value: 'cc', label: 'Credit Card' },
              ]}
            />
          </Form.Item>
        </Col>
        <Col
          xs={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'start',
            gap: '.5em',
          }}
        >
          <p style={{ fontSize: 14, fontWeight: 700 }}>Type</p>
          <Form.Item style={{ width: '100%' }}>
            <Input placeholder="type" type="text" />
          </Form.Item>
        </Col>
        <Col
          xs={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'start',
            gap: '.5em',
          }}
        >
          <p style={{ fontSize: 14, fontWeight: 700 }}>Virtual Account</p>
          <Form.Item style={{ width: '100%' }}>
            <Input placeholder="virtual account" type="text" />
          </Form.Item>
        </Col>
        <Col
          xs={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'start',
            gap: '.5em',
          }}
        >
          <Button type="primary" style={{ backgroundColor: 'red' }}>
            Delete Payment
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
