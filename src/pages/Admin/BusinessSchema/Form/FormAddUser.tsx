import { Button, Form, Select } from 'antd';
import {
  usePatchUser,
  useGetUsersList,
} from '@/hooks/ReactQuery/admin/useGetUsers';
import useFormUser from '../Hooks/useFormUser';
import { getLogin } from '@/utils/sessions';

interface IFormMenu {
  handleClose: () => void;
  role: string;
}

type FieldType = {
  user?: string;
};

export default function FormAddUser({ handleClose, role }: IFormMenu) {
  const { mutate } = usePatchUser();

  const { form, isLoading, onFinish, onFinishFailed } = useFormUser({
    handleCloseForm: handleClose,
    mutate,
  });

  const { data: dataUser, isLoading: isLoadingUser } = useGetUsersList({
    token: getLogin()?.token ?? '',
    limit: 10,
    page: 1,
    role,
    reqPrice: '0',
    is_not_paginate: '1',
  });

  const handleChange = (value: string[]) => {
    form.setFieldValue('user', value);
  };

  return (
    <main style={{ width: '100%', height: '100%' }}>
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
          User
        </div>
        <Form.Item<FieldType>
          name="user"
          hasFeedback
          rules={[{ required: true, message: 'user is required' }]}
        >
          <Select
            loading={isLoadingUser}
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select user"
            onChange={handleChange}
            options={dataUser}
          />
        </Form.Item>
        <Button
          type="primary"
          block
          disabled={isLoading}
          htmlType="submit"
          style={{ fontSize: 14, fontWeight: 700 }}
        >
          {!isLoading ? 'Save' : 'Loading ...'}
        </Button>
      </Form>
    </main>
  );
}
