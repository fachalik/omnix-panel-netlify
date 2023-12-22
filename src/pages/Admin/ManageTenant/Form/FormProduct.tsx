import { Button, Form } from 'antd';
import { useCreateProduct } from '../Hooks/useGetProduct';
import useFormProduct from '../Hooks/useFormProduct';
// import { getLogin } from '@/utils/sessions';
import { useAuthStore } from '@/store';

interface IFormUsers {
  handleClose: () => void;
}

export default function FormProduct({ handleClose }: IFormUsers) {
  const { user } = useAuthStore((state) => state);
  const { mutate } = useCreateProduct();

  // type FieldType = {
  //   member?: string[];
  // };

  const { form, isLoading, onFinish, onFinishFailed } = useFormProduct({
    handleCloseForm: handleClose,
    mutate,
    id: user?._id,
  });

  // const formik: any = useFormMember({ handleClose, mutate });

  // const handleChange = (value: string[]) => {
  //   console.log(`selected ${value}`);
  // };

  return (
    <main style={{ width: '100%', height: '100%', overflow: 'scroll' }}>
      <Form
        style={{ marginTop: 20 }}
        autoComplete="off"
        name="basic"
        layout="vertical"
        initialValues={{}}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {/* <Form.Item<FieldType> name="member" hasFeedback>
          <Select
            mode="multiple"
            disabled={isLoadingUserOptions}
            style={{ width: '100%' }}
            placeholder="Please select User"
            onChange={handleChange}
            options={dataUserOptions}
          />
        </Form.Item> */}
        <Button
          type="primary"
          block
          disabled={isLoading}
          htmlType="submit"
          style={{ fontSize: 14, fontWeight: 700 }}
        >
          {!isLoading ? 'Tambah Product' : 'Loading ....'}
        </Button>
      </Form>
    </main>
  );
}
