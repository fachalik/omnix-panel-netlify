import React from 'react';

import { Button, Form, Input, Select } from 'antd';
import useFormTeamEdit from '../Hooks/useFormTeamEdit';
import { usePatchUser } from '../Hooks/useGetTeam';
import { useGetGroupList } from '@/hooks/ReactQuery/admin/useGetGroup';
import { getLogin } from '@/utils/sessions';

type FieldType = {
  name?: string;
  groups?: string;
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

  const { data: dataGroup, isLoading: isLoadingGroup } = useGetGroupList({
    token: getLogin()?.token ?? '',
    limit: 100,
    page: 1,
    is_not_paginate: '1',
  });

  React.useEffect(() => {
    let isMount = true;

    if (isMount && dataGroup) {
      const mapData = dataGroup.filter(
        (item: any) => item.value === data.groups[0]
      );
      const init: any = {
        id: data._id,
        name: data?.name,
        groups: mapData[0],
        password: '',
        password_confirmation: '',
      };
      form.setFieldsValue(init);
    }

    return () => {
      isMount = false;
    };
  }, [data, dataGroup]);

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
            onChange={(_: string, option: any) => {
              console.log(option);
              form.setFieldValue('groups', option);
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
