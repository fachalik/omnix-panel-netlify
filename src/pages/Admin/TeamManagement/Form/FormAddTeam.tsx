import { Button, Form, Input, Select } from 'antd';
import useFormTeam from '../Hooks/useFormTeam';
import { useGetGroupList } from '@/hooks/ReactQuery/admin/useGetGroup';
import { usecreateTeam } from '../Hooks/useGetTeam';
import { getLogin } from '@/utils/sessions';

type FieldType = {
  email?: string;
  name?: 'string';
  password?: string;
  password_confirmation?: string;
  groups?: string;
};

interface IFormTeam {
  handleClose: () => void;
}

export default function FormAddTeam({ handleClose }: IFormTeam) {
  const { mutate } = usecreateTeam();

  const { data: dataGroup, isLoading: isLoadingGroup } = useGetGroupList({
    token: getLogin()?.token ?? '',
    limit: 100,
    page: 1,
    is_not_paginate: '1',
  });

  const { form, isLoading, onFinish, onFinishFailed } = useFormTeam({
    handleCloseForm: handleClose,
    mutate,
  });

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
          Group
        </div>
        <Form.Item<FieldType>
          name="groups"
          hasFeedback
          rules={[{ required: true, message: 'group is required' }]}
        >
          <Select
            loading={isLoadingGroup}
            showSearch
            style={{ width: '100%' }}
            onChange={(value: string, _: any) => {
              form.setFieldValue('groups', value);
            }}
            placeholder="Pilih Group"
            optionFilterProp="children"
            filterOption={(input: any, option: any) =>
              (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())
            }
            filterSort={(optionA: any, optionB: any) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={dataGroup}
          />
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
          {!isLoading ? 'Buat Team' : 'Loading ...'}
        </Button>
      </Form>
    </main>
  );
}
