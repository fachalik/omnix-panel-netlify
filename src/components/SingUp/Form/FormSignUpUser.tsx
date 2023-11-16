import { Button, Form, Input } from 'antd';
import useFormSignUpUser from '../Hooks/useFormSignUpUser';

type FieldType = {
  email?: string;
  name?: 'string';
  password?: string;
  password_confirmation?: string;
};

export default function FormSignUpUser() {
  const { form, isLoading, onFinish, onFinishFailed } = useFormSignUpUser();
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
        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Name
        </div>
        <Form.Item<FieldType>
          name="name"
          hasFeedback
          rules={[{ required: true, message: 'name is required' }]}
        >
          <Input placeholder="Input your name" name="name" />
        </Form.Item>

        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Email
        </div>
        <Form.Item<FieldType>
          name="email"
          hasFeedback
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            { required: true, message: 'Email is required' },
          ]}
        >
          <Input placeholder="Ex: yourwork@gmail.com" name="email" />
        </Form.Item>

        {/* <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Phone Number
        </div>
        <Form.Item<FieldType>
          name="phoneNumber"
          hasFeedback
          rules={[
            {
              type: 'regexp',
              pattern: new RegExp('/+?([ -]?d+)+|(d+)([ -]d+)/gm'),
              message: 'Phone number is not valid',
            },
            {
              required: true,
              message: 'Enter you phone number',
            },
          ]}
        >
          <Input placeholder="Ex : 628123456789" name="phoneNumber" />
        </Form.Item> */}

        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Create New Password
        </div>
        <Form.Item<FieldType>
          name="password"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password name="password" />
        </Form.Item>

        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Confirm Password
        </div>
        <Form.Item<FieldType>
          name="password_confirmation"
          hasFeedback
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password name="password_confirmation" />
        </Form.Item>
        {/* 
        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Referral Code
        </div>
        <Form.Item<FieldType> name="referralCode" hasFeedback>
          <Input placeholder="Insert your referal code" name="referralCode" />
        </Form.Item> */}

        <Button
          type="primary"
          block
          disabled={isLoading}
          htmlType="submit"
          style={{ fontSize: 14, fontWeight: 700 }}
        >
          {!isLoading ? 'Buat Akun' : 'Loading ...'}
        </Button>
      </Form>
    </main>
  );
}
