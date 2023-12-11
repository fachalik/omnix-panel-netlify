import { Button, Form, Input } from 'antd';
import useFormForgetPassword from '../Hooks/useFormForgetPassword';

type FieldType = {
  email?: string;
};

export default function FormForgetPassword() {
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const formik: any = useFormForgetPassword();

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

        <Button
          type="primary"
          block
          htmlType="submit"
          style={{ fontSize: 14, fontWeight: 700 }}
        >
          Atur Ulang
        </Button>
      </Form>
    </main>
  );
}
