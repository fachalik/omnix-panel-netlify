import { Button, Form, Input } from 'antd';
import useFormSignUpReseller from '../Hooks/useFormSignUpReseller';

type FieldType = {
  email?: string;
  phoneNumber?: string;
  password?: string;
  password_confirmation?: string;
  firstName?: string;
  lastName?: string;
};

export default function FormSignUpReseller() {
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const formik: any = useFormSignUpReseller();

  return (
    <main style={{ width: '100%', height: '100%', overflow: 'scroll' }}>
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
          First Name
        </div>
        <Form.Item<FieldType>
          name="firstName"
          validateStatus={
            Boolean(formik.touched.firstName && formik.errors.firstName)
              ? 'error'
              : ''
          }
          hasFeedback
          help={formik.touched.firstName ? formik.errors.firstName : ''}
        >
          <Input
            status={
              Boolean(formik.touched.firstName && formik.errors.firstName)
                ? 'error'
                : ''
            }
            placeholder="Input your firstname"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Last Name
        </div>
        <Form.Item<FieldType>
          name="lastName"
          validateStatus={
            Boolean(formik.touched.lastName && formik.errors.lastName)
              ? 'error'
              : ''
          }
          hasFeedback
          help={formik.touched.lastName ? formik.errors.lastName : ''}
        >
          <Input
            status={
              Boolean(formik.touched.lastName && formik.errors.lastName)
                ? 'error'
                : ''
            }
            placeholder="Input your lastname"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Work Email
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
            placeholder="Ex: yourwork@gmail.com"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Phone Number
        </div>
        <Form.Item<FieldType>
          name="phoneNumber"
          validateStatus={
            Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)
              ? 'error'
              : ''
          }
          hasFeedback
          help={formik.touched.phoneNumber ? formik.errors.phoneNumber : ''}
        >
          <Input
            status={
              Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)
                ? 'error'
                : ''
            }
            placeholder="Ex : 628123456789"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Create New Password
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
          <Input.Password
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Confirm Password
        </div>
        <Form.Item<FieldType>
          name="password_confirmation"
          validateStatus={
            Boolean(
              formik.touched.password_confirmation &&
                formik.errors.password_confirmation
            )
              ? 'error'
              : ''
          }
          hasFeedback
          help={
            formik.touched.password_confirmation
              ? formik.errors.password_confirmation
              : ''
          }
        >
          <Input.Password
            name="password_confirmation"
            value={formik.values.password_confirmation}
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
          Buat Akun
        </Button>
      </Form>
    </main>
  );
}
