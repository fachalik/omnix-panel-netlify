import React from 'react';
import { Button, Table, Tag, Popconfirm, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useGetUsers } from '../Hooks/useGetUsers';
import { getLogin } from '@/utils/sessions';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { palette } from '@/theme/themeConfig';
import moment from 'moment';
import { EditTwoTone, DeleteOutlined } from '@ant-design/icons';
import Modal from '@/components/Modal';
import FormUser from '../Form/FormUser';
import FormUserEdit from '../Form/FormUserEdit';

export default function UserManagementReseller() {
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

  const { data, isLoading, isSuccess, isError, error }: any = useGetUsers({
    token: getLogin()?.token ?? '',
    limit: 100,
    page: 1,
  });

  const columns: ColumnsType<any> = [
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      key: 'val',
      title: 'Name',
      dataIndex: 'name',
      render: (_, record: any) => {
        return <p>{`${record?.firstName} ${record?.lastName}`}</p>;
      },
    },
    {
      key: 'phoneNumber',
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      render: (_, record: any) => {
        return <p>{`${record?.phoneNumber ?? '-'}`}</p>;
      },
    },
    {
      key: 'role',
      title: 'Role',
      dataIndex: 'role',
      render: (_, record: any) => {
        return <p>{`${record?.role?.name}`}</p>;
      },
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      render: (_, record: any) => {
        return <p>{`${record?.status?.name}`}</p>;
      },
    },
    {
      key: 'createdAt',
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (_, record: any) => {
        return (
          <Tag color={palette.primary.main}>
            {moment(record?.createdAt).format('LLL')}
          </Tag>
        );
      },
    },
    {
      key: 'updatedAt',
      title: 'UpdatedAt At',
      dataIndex: 'updatedAt',
      render: (_, record: any) => {
        return (
          <Tag color={palette.primary.main}>
            {moment(record?.updatedAt).format('LLL')}
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
            <Tooltip title={'Edit user'}>
              <Button
                onClick={() => {
                  setIsModalEdit(true);
                  setEditData(null);
                  setEditData(record);
                }}
                style={{ marginRight: '0.5em' }}
                color={palette.primary.main}
                icon={<EditTwoTone />}
              />
            </Tooltip>
            <Tooltip title={'Delete user'}>
              <Popconfirm
                title="Delete user?"
                description="Are you sure to delete this user?"
                onConfirm={() => {}}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  onClick={() => console.log(record?.id)}
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
        <h3 style={{}}>Reseller Management </h3>
        <Button type="primary" onClick={() => setIsModalCreate(true)}>
          Tambah Reseller
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
        <FormUser handleClose={handleCancelCreate} />
      </Modal>

      <Modal
        title="Edit User"
        isModalOpen={IsModalEdit}
        handleCancel={handleCancelEdit}
      >
        <FormUserEdit handleClose={handleCancelEdit} data={editData} />
      </Modal>
    </div>
  );
}
