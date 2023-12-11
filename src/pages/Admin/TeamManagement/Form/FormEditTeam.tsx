import React from 'react';

import { Button, Form, Input } from 'antd';
import useFormTeamEdit from '../Hooks/useFormTeamEdit';
import { usePatchUser } from '../Hooks/useGetTeam';

type FieldType = {
  name?: 'string';
  password?: string;
  password_confirmation?: string;
};

interface IFormTeam {
  handleClose: () => void;
  data: any;
}

export default function FormEditTeam({ handleClose, data }: IFormTeam) {
  const { mutate } = usePatchUser();
  const { form, isLoading, onFinish, onFinishFailed } = useFormTeamEdit({
    handleCloseForm: handleClose,
    mutate,
    data,
  });
  const init: any = {
    id: data._id,
    name: data?.name,
    password: '',
    password_confirmation: '',
  };

  React.useEffect(() => {
    let isMount = true;

    if (isMount) {
      form.setFieldsValue(init);
    }

    return () => {
      isMount = false;
    };
  }, [data]);

  form.setFieldsValue(init);

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
          Create New Password
        </div>
        <Form.Item<FieldType> name="password" hasFeedback>
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
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (getFieldValue('password') === value) {
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
          {!isLoading ? 'Edit Akun' : 'Loading ...'}
        </Button>
      </Form>
    </main>
  );
}
