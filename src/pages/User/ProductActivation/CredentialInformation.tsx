import { Form, Input, Row, Col, DatePicker } from 'antd';

export const CredentialInformation = () => {
  const [form] = Form.useForm();
  return (
    <Form form={form} style={{ width: '100%' }}>
      <Row
        style={{
          width: '100%',

          gap: '.5em',
        }}
        gutter={[16, 16]}
      >
        <Col
          xs={24}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'start',
            gap: '.5em',
          }}
        >
          <p style={{ fontSize: 14, fontWeight: 700 }}>Email</p>
          <Form.Item style={{ width: '100%' }}>
            <Input placeholder="email" type="email" />
          </Form.Item>
        </Col>
        <Col
          xs={24}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'start',
            gap: '.5em',
          }}
        >
          <p style={{ fontSize: 14, fontWeight: 700 }}>Password</p>
          <Form.Item style={{ width: '100%' }}>
            <Input placeholder="***" type="password" />
          </Form.Item>
        </Col>
        <Col
          xs={24}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'start',
            gap: '.5em',
          }}
        >
          <p style={{ fontSize: 14, fontWeight: 700 }}>Password</p>
          <Form.Item style={{ width: '100%' }}>
            <DatePicker placeholder="date" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
