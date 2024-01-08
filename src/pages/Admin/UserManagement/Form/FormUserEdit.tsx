import { Button, Form, Input } from 'antd';

import { usePatchUser } from '@/hooks/ReactQuery/admin/useGetUsers';
// import useFormUser from '../Hooks/useFormUser';
import { User } from '@/models';

interface IFormUsersEdit {
  handleClose: () => void;
  data: User | null;
}

type FieldType = {
  email?: string;
  phoneNumber?: string;
  password?: string;
  password_confirmation?: string;
  firstName?: string;
  lastName?: string;
};

export default function FormUserEdit({}: IFormUsersEdit) {
  const { isLoading } = usePatchUser();

  const [form] = Form.useForm();
  // const formik: any = useFormUser({ handleClose, mutate, data });

  return (
    <main style={{ width: '100%', height: '100%', overflow: 'scroll' }}>
      <Form form={form}>
        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          First Name
        </div>
        <Form.Item<FieldType> name="firstName" hasFeedback>
          <Input
            autoComplete="false"
            placeholder="Input your firstname"
            name="firstName"
          />
        </Form.Item>

        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Last Name
        </div>
        <Form.Item<FieldType> name="lastName" hasFeedback>
          <Input
            autoComplete="false"
            placeholder="Input your lastname"
            name="lastName"
          />
        </Form.Item>

        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Work Email
        </div>
        <Form.Item<FieldType> name="email" hasFeedback>
          <Input
            autoComplete="false"
            placeholder="Ex: yourwork@gmail.com"
            name="email"
          />
        </Form.Item>

        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Phone Number
        </div>
        <Form.Item<FieldType> name="phoneNumber" hasFeedback>
          <Input
            autoComplete="false"
            placeholder="Ex : 628123456789"
            name="phoneNumber"
          />
        </Form.Item>

        <Button
          type="primary"
          block
          disabled={isLoading}
          htmlType="submit"
          style={{ fontSize: 14, fontWeight: 700 }}
        >
          {!isLoading ? 'Edit User' : 'Loading ....'}
        </Button>
      </Form>
    </main>
  );
}
