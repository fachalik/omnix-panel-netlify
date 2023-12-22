import React from 'react';
import { Button, Form, Select, Switch } from 'antd';
import useFormPermissionMenu from '../Hooks/useFormPermissionMenu';
import {
  usepatchPermissionMenu,
  useGetListMenu,
} from '@/hooks/ReactQuery/admin/usePermissionMenu';
import { getLogin } from '@/utils/sessions';

type FieldType = {
  menu?: string;
  status?: boolean;
  editing?: string;
};

interface IFormMenu {
  handleClose: () => void;
  id: string;
  data: any;
}

export default function FormEditMenu({ handleClose, id, data }: IFormMenu) {
  const { mutate } = usepatchPermissionMenu();
  const { form, isLoading, onFinish, onFinishFailed } = useFormPermissionMenu({
    handleCloseForm: handleClose,
    mutate,
    id,
  });

  const { data: dataMenu, isLoading: isLoadingMenu } = useGetListMenu({
    token: getLogin()?.token ?? '',
    limit: '100',
    page: '1',
    is_not_paginate: '1',
  });

  const handleChange = (value: string[]) => {
    form.setFieldValue('menu', value);
  };

  React.useEffect(() => {
    let isMount = true;

    if (isMount && data) {
      const mapMenu = data.map((item: any) => item['menu_id'][0]['_id']);
      form.setFieldsValue({
        menu: mapMenu,
        status: true,
        editing: true,
      });
    }

    return () => {
      isMount = false;
    };
  }, [data]);

  return (
    <main style={{ width: '100%', height: '100%' }}>
      <Form
        style={{ marginTop: 20 }}
        autoComplete="off"
        name="basic"
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Menu
        </div>
        <Form.Item<FieldType>
          name="menu"
          hasFeedback
          rules={[{ required: true, message: 'Menu is required' }]}
        >
          <Select
            loading={isLoadingMenu}
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            onChange={handleChange}
            options={dataMenu}
          />
        </Form.Item>

        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Is Active
        </div>
        <Form.Item<FieldType> name="status" valuePropName="checked">
          <Switch defaultChecked />
        </Form.Item>

        <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
          Is Editing
        </div>
        <Form.Item<FieldType> name="editing" valuePropName="checked">
          <Switch defaultChecked />
        </Form.Item>

        <Button
          type="primary"
          block
          disabled={isLoading}
          htmlType="submit"
          style={{ fontSize: 14, fontWeight: 700 }}
        >
          {!isLoading ? 'Edit Menu' : 'Loading ...'}
        </Button>
      </Form>
    </main>
  );
}
