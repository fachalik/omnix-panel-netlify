import React from 'react';
import { Button, Table, Tag, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  useGetMenu,
  useDestroyMenu,
} from '@/hooks/ReactQuery/admin/useGetMenu';
import { getLogin } from '@/utils/sessions';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { palette } from '@/theme/themeConfig';
import moment from 'moment';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Drawer from '@/components/Drawer';

import Content from '@/layouts/Dashboard/Content';
import FormMenu from './Form/FormMenu';
import FormMenuEdit from './Form/FormMenuEdit';

export default function ManageMenu() {
  // ** Modal Create
  const [IsModalCreate, setIsModalCreate] = React.useState<boolean>(false);
  const handleCancelCreate = () => setIsModalCreate(false);

  // ** Modal Edit
  const [editData, setEditData] = React.useState(null);
  const [IsModalEdit, setIsModalEdit] = React.useState<boolean>(false);
  const handleCancelEdit = () => {
    setEditData(null);
    setIsModalEdit(false);
  };

  const { mutate: mutateDestroy } = useDestroyMenu();
  const { data, isLoading, isSuccess, isError, error }: any = useGetMenu({
    token: getLogin()?.token ?? '',
    limit: 100,
    page: 1,
    status,
  });

  const columns: ColumnsType<any> = [
    {
      key: 'menu',
      title: 'Menu',
      dataIndex: 'menu',
      render: (_, record: any) => {
        return <p>{record?.label}</p>;
      },
    },

    {
      key: 'path',
      title: 'Path',
      dataIndex: 'path',
      render: (_, record: any) => {
        return <p style={{ width: 150 }}>{record?.path}</p>;
      },
    },
    {
      key: 'icon',
      title: 'Icon',
      dataIndex: 'icon',
      render: (_, record: any) => {
        return (
          <Tag color={palette.primary.main}>
            <div className={record?.icon} />
          </Tag>
        );
      },
    },
    {
      key: 'createdAt',
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (_, record: any) => {
        return (
          <Tag color={palette.primary.main}>
            {record?.createdAt ? moment(record?.createdAt).format('LLL') : '-'}
          </Tag>
        );
      },
    },
    {
      key: 'updatedAt',
      title: 'Updated At',
      dataIndex: 'updatedAt',
      render: (_, record: any) => {
        return (
          <Tag color={palette.primary.main}>
            {record?.updatedAt ? moment(record?.updatedAt).format('LLL') : '-'}
          </Tag>
        );
      },
    },
    {
      key: 'action',
      title: 'Action',
      dataIndex: 'action',
      render: (_, record: any) => {
        return (
          <div>
            <Popconfirm
              title="Delete Product?"
              description={'Are you sure want to delete this product?'}
              onConfirm={async () => {
                await mutateDestroy(record?._id);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button
                color={'red'}
                style={{ marginRight: '0.5em' }}
                icon={<DeleteOutlined style={{ color: 'red' }} />}
              />
            </Popconfirm>
            <Button
              onClick={async () => {
                await setEditData(null);
                await setEditData(record);
                await setIsModalEdit(true);
              }}
              style={{ marginRight: '0.5em' }}
              color={palette.primary.main}
              icon={<EditOutlined style={{ color: palette.primary.main }} />}
            />
          </div>
        );
      },
    },
  ];

  return (
    <Content>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3 style={{}}>Menu Management</h3>
        <Button
          onClick={() => {
            setIsModalCreate(true);
          }}
          type="primary"
          style={{ marginLeft: '1em' }}
        >
          Add Menu
        </Button>
      </div>

      <div style={{ marginTop: '2em', overflow: 'auto' }}>
        {isLoading && <Loading />}
        {isSuccess && data && (
          <Table
            loading={isLoading}
            style={{ marginTop: 10, paddingBottom: 20 }}
            columns={columns}
            dataSource={data.data}
          />
        )}
        {!isLoading && isError && <Error error={error} />}
      </div>
      <Drawer
        title="Add Menu"
        onClose={handleCancelCreate}
        open={IsModalCreate}
      >
        <FormMenu handleClose={handleCancelCreate} />
      </Drawer>

      <Drawer title="Edit Menu" onClose={handleCancelEdit} open={IsModalEdit}>
        {editData && (
          <FormMenuEdit data={editData} handleClose={handleCancelEdit} />
        )}
      </Drawer>
    </Content>
  );
}
