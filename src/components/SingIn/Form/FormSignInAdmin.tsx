import { Button, Form, Input } from 'antd';
import useFormSignInAdmin from '../Hooks/useFormSignInAdmin';
import { useNavigate } from 'react-router-dom';

type FieldType = {
  email?: string;
  password?: string;
};

export default function FormSignInAdmin() {
  const navigate = useNavigate();

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const formik: any = useFormSignInAdmin();

  return (
    <main style={{ width: '100%' }}>
      <Form
        style={{ marginTop: 20 }}
        autoComplete="off"
        name="basic"
        layout="vertical"
        initialValues={{}}
        onFinish={formik.handleSubmit}
        onFinishFailed={onFinishFailed}
      >
        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Email
        </div>
        <Form.Item<FieldType>
          name="email"
          validateStatus={
            Boolean(formik.touched.email && formik.errors.email) ? 'error' : ''
          }
          hasFeedback
          help={formik.touched.email ? formik.errors.email : ''}
        >
          <Input
            status={
              Boolean(formik.touched.email && formik.errors.email)
                ? 'error'
                : ''
            }
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Password
        </div>
        <Form.Item<FieldType>
          name="password"
          validateStatus={
            Boolean(formik.touched.password && formik.errors.password)
              ? 'error'
              : ''
          }
          hasFeedback
          help={formik.touched.password ? formik.errors.password : ''}
        >
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
          <Input.Password
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Button
          type="primary"
          block
          htmlType="submit"
          style={{ fontSize: 14, fontWeight: 700 }}
        >
          Sign In
        </Button>
      </Form>
    </main>
  );
}
