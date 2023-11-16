import React from 'react';
import { Button, Table, Popconfirm, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useGetMember, useDestroyMember } from './Hooks/useGetMember';
import { getLogin } from '@/utils/sessions';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { DeleteOutlined } from '@ant-design/icons';
import Modal from '@/components/Modal';
import FormMember from './Form/FormMember';

import { useAuthStore } from '@/store';
import { timeout } from '@/utils/utilitys';

export default function UserManagement() {
  const { user } = useAuthStore((state) => state);

  const [idDelete, setIdDelete] = React.useState<string>('');

  // ** Modal Create
  const [IsModalCreate, setIsModalCreate] = React.useState<boolean>(false);
  const handleCancelCreate = () => setIsModalCreate(false);

  const { data, isLoading, isSuccess, isError, error, refetch }: any =
    useGetMember({
      token: getLogin()?.token ?? '',
      page: 1,
      limit: 100,
      id: user?._id,
    });

  const { mutate } = useDestroyMember();

  const columns: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      key: 'action',
      title: 'Action',
      dataIndex: 'action',
      render: (_, record: any) => {
        return (
          <div>
            <Tooltip title={'Delete user'}>
              <Popconfirm
                title="Delete user?"
                description="Are you sure to delete this user?"
                onConfirm={async () => {
                  const member: any = await {
                    member: [{ id_member: idDelete }],
                  };
                  await mutate({ val: member, id: user?._id });
                  await setIdDelete('');
                  await timeout(1500);
                  await refetch();
                }}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  onClick={() => setIdDelete(record._id)}
                  color={'red'}
                  icon={<DeleteOutlined style={{ color: 'red' }} />}
                />
              </Popconfirm>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3 style={{}}>User Management</h3>
        <Button type="primary" onClick={() => setIsModalCreate(true)}>
          Tambah User
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
      <Modal
        title="Tambah User"
        isModalOpen={IsModalCreate}
        handleCancel={handleCancelCreate}
      >
        <FormMember handleClose={handleCancelCreate} />
      </Modal>
      {/* 
      <Modal
        title="Edit User"
        isModalOpen={IsModalEdit}
        handleCancel={handleCancelEdit}
      >
        <FormMemberEdit handleClose={handleCancelEdit} data={editData} />
      </Modal> */}
    </div>
  );
}
