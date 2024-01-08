// import { Button, Form, Input } from 'antd';
// import useFormDetailOrder from '../Hooks/useFormDetailOrder';
// import { useNavigate } from 'react-router-dom';

// type FieldType = {
//   nama_perusahaan?: string;
// };

export default function FormDetailOrder() {
  // const navigate = useNavigate();
  // const onFinish = (values: any) => {
  //   console.log('Success:', values);
  // };

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log('Failed:', errorInfo);
  // };

  // const formik: any = useFormDetailOrder();

  return (
    <></>
    // <Form
    //   style={{ marginTop: 20 }}
    //   autoComplete="off"
    //   name="basic"
    //   layout="vertical"
    //   initialValues={{}}
    //   onFinish={formik.handleSubmit}
    //   onFinishFailed={onFinishFailed}
    // >
    //   <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
    //     Nama perusahaan
    //   </div>
    //   <Form.Item<FieldType>
    //     name="nama_perusahaan"
    //     validateStatus={
    //       Boolean(
    //         formik.touched.nama_perusahaan && formik.errors.nama_perusahaan
    //       )
    //         ? 'error'
    //         : ''
    //     }
    //     hasFeedback
    //     help={
    //       formik.touched.nama_perusahaan ? formik.errors.nama_perusahaan : ''
    //     }
    //   >
    //     <Input
    //       status={
    //         Boolean(
    //           formik.touched.nama_perusahaan && formik.errors.nama_perusahaan
    //         )
    //           ? 'error'
    //           : ''
    //       }
    //       name="nama_perusahaan"
    //       value={formik.values.nama_perusahaan}
    //       onChange={formik.handleChange}
    //       onBlur={formik.handleBlur}
    //     />
    //   </Form.Item>

    //   <Button
    //     type="primary"
    //     block
    //     htmlType="submit"
    //     style={{ fontSize: 14, fontWeight: 700 }}
    //   >
    //     Order
    //   </Button>
    // </Form>
  );
}
