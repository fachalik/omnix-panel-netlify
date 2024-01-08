import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { InboxOutlined } from '@ant-design/icons';
import useFormSignInReseller from '../Hooks/useFormSignInReseller';

type FieldType = {
  email?: string;
  password?: string;
};

export default function FormSignInReseller() {
  const navigate = useNavigate();
  const { form, isLoading, onFinish, onFinishFailed } = useFormSignInReseller();

  return (
    <main style={{ width: '100%' }}>
      <Form
        style={{ marginTop: 20 }}
        autoComplete="off"
        form={form}
        name="basic"
        layout="vertical"
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Email
        </div>
        <Form.Item<FieldType>
          name="email"
          hasFeedback
          rules={[{ required: true, message: 'Email is required' }]}
        >
          <Input
            autoComplete="off"
            prefix={<InboxOutlined />}
            placeholder="Input your email here"
          />
        </Form.Item>

        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Password
        </div>

        <Form.Item
          name="password"
          style={{ marginBottom: 2 }}
          rules={[{ required: true, message: 'Password is required!' }]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <a
          type="link"
          style={{
            textAlign: 'start',
            float: 'left',
            fontSize: 12,
            textDecoration: 'underline',
            marginBottom: 10,
          }}
          onClick={() => navigate('/forget-password')}
        >
          Forgot password ?
        </a>

        <Button
          type="primary"
          block
          htmlType="submit"
          style={{ fontSize: 14, fontWeight: 700 }}
        >
          {!isLoading ? 'Sign In' : 'Loading...'}
        </Button>
      </Form>
    </main>
  );
}
