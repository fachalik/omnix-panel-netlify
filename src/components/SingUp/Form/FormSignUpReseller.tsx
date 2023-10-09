import { Button, Form, Input } from 'antd';
import useFormSignUpReseller from '../Hooks/useFormSignUpReseller';

type FieldType = {
  companyName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  password_confirmation?: string;
  firstName?: string;
  lastName?: string;
};

export default function FormSignUpReseller() {
  const { form, isLoading, onFinish, onFinishFailed } = useFormSignUpReseller();

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
          Company Name
        </div>
        <Form.Item<FieldType>
          name="companyName"
          hasFeedback
          rules={[{ required: true, message: 'Company Name is required' }]}
        >
          <Input placeholder="Input your Company Name" name="companyName" />
        </Form.Item>

        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          First Name
        </div>
        <Form.Item<FieldType>
          name="firstName"
          hasFeedback
          rules={[{ required: true, message: 'Firstname is required' }]}
        >
          <Input placeholder="Input your firstname" name="firstName" />
        </Form.Item>

        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Last Name
        </div>
        <Form.Item<FieldType>
          name="lastName"
          hasFeedback
          rules={[{ required: true, message: 'Lastname is required' }]}
        >
          <Input placeholder="Input your lastname" name="lastName" />
        </Form.Item>

        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Work Email
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

        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
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
        </Form.Item>

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
