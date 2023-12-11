import React from 'react';
import { Button, Table, Tag, Tooltip, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useGetGroup, usedestroyGroup } from './Hooks/useGetGroup';
import { getLogin } from '@/utils/sessions';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { palette } from '@/theme/themeConfig';
import moment from 'moment';
import { EditTwoTone, DeleteOutlined } from '@ant-design/icons';
import Modal from '@/components/Modal';
import FormAddGroup from './Form/FormAddGroup';
import FormEditGroup from './Form/FormEditGroup';

// import { useAuthStore } from '@/store';
import lodash from 'lodash';

export default function GroupManagement() {
  // const { user } = useAuthStore((state) => state);
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

  const { data, isLoading, isSuccess, isError, error }: any = useGetGroup({
    token: getLogin()?.token ?? '',
    limit: 10,
    page: 1,
  });

  const { mutate: mutateDestroy } = usedestroyGroup();

  // const { mutate } = usePatchUser();

  const columns: ColumnsType<any> = [
    {
      key: 'name_group',
      title: 'Group',
      dataIndex: 'name_group',
      render: (_, record: any) => {
        return <p>{`${record?.name_group}`}</p>;
      },
    },

    {
      key: 'description',
      title: 'Description',
      dataIndex: 'description',
      render: (_, record: any) => {
        return (
          <p style={{ width: 150 }}>
            {lodash.truncate(record?.description, {
              length: 15,
              omission: '...',
            })}
          </p>
        );
      },
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      render: (_, record: any) => {
        return (
          <Tag color={record?.status ? palette.primary.main : 'warning'}>
            {record?.status ? 'Active' : 'In Active'}
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
            {moment(record?.createdAt).format('LLL')}
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
            <Tooltip title={'Edit Group'}>
              <Button
                onClick={() => {
                  setIsModalEdit(true);
                  setEditData(null);
                  setEditData(record);
                }}
                style={{ marginRight: '0.5em' }}
                icon={<EditTwoTone />}
              />
            </Tooltip>
            <Tooltip title={'Delete Group'}>
              <Popconfirm
                title="Delete Group?"
                description="Are you sure to delete this group?"
                onConfirm={async () => {
                  await mutateDestroy(record?._id);
                }}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  // onClick={() => setIdDelete(record._id)}
                  color={'red'}
                  icon={<DeleteOutlined style={{ color: 'red' }} />}
                />
              </Popconfirm>
            </Tooltip>
            <Tooltip title={'Add Menu'}>
              <Button
                type="default"
                onClick={() => {
                  setIsModalEdit(true);
                  setEditData(null);
                  setEditData(record);
                }}
                style={{ marginLeft: '0.5em' }}
                // icon={<EditTwoTone />}
              >
                Add Menu
              </Button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3 style={{}}>Group Management</h3>
        <Button type="primary" onClick={() => setIsModalCreate(true)}>
          Add Group
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
        title="Add Group"
        isModalOpen={IsModalCreate}
        handleCancel={handleCancelCreate}
      >
        <FormAddGroup handleClose={handleCancelCreate} />
      </Modal>

      <Modal
        title="Edit Group"
        isModalOpen={IsModalEdit}
        handleCancel={handleCancelEdit}
      >
        <FormEditGroup handleClose={handleCancelEdit} data={editData} />
      </Modal>
    </div>
  );
}
