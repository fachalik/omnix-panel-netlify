import React from 'react';
import {
  Button,
  Table,
  Tag,
  Tooltip,
  Dropdown,
  Menu,
  Popconfirm,
  Badge,
  Typography,
  Input,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useGetUsers, usePatchUser } from './Hooks/useGetUsers';
import { getLogin } from '@/utils/sessions';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { palette } from '@/theme/themeConfig';
import moment from 'moment';
import { EditTwoTone, DeleteOutlined } from '@ant-design/icons';
import type { SearchProps } from 'antd/es/input';
import debounce from 'lodash.debounce';
import lodash from 'lodash';
import Content from '@/layouts/Dashboard/Content';
// import Modal from '@/components/Modal';
// import FormUser from './Form/FormUser';
// import FormUserEdit from './Form/FormUserEdit';
import { ControlOutlined } from '@ant-design/icons';

export default function UserManagement() {
  // // ** Modal Create
  // const [IsModalCreate, setIsModalCreate] = React.useState<boolean>(false);
  // const handleCancelCreate = () => setIsModalCreate(false);

  // // ** Modal Edit
  // const [editData, setEditData] = React.useState(null);
  // const [IsModalEdit, setIsModalEdit] = React.useState<boolean>(false);
  // const handleCancelEdit = () => {
  //   setEditData(null);
  //   setIsModalEdit(false);
  // };

  const [role, setRole] = React.useState<string>('');
  const [search, setSearch] = React.useState<string>('');
  const [status, setStatus] = React.useState<string>('');

  const { data, isLoading, isSuccess, isError, error }: any = useGetUsers({
    token: getLogin()?.token ?? '',
    limit: 100,
    page: 1,
    role,
    term: search,
    status,
  });

  const { mutate } = usePatchUser();

  const switchRoleMap = (val: number) => {
    switch (val) {
      case 0:
        return 'IN ACTIVE';

      case 1:
        return 'ACTIVE';

      case 2:
        return 'BLOCKED';

      default:
        return '-';
    }
  };
  const switchRoleMapColor = (val: number): any => {
    switch (val) {
      case 0:
        return 'warning';

      case 1:
        return 'success';

      case 2:
        return 'error';

      default:
        return 'info';
    }
  };

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
        return (
          <p style={{ width: '150px' }}>
            {lodash.truncate(record?.name, {
              length: 15,
              omission: '...',
            })}
          </p>
        );
      },
    },
    {
      key: 'role',
      title: 'Role',
      dataIndex: 'role',
      render: (_, record: any) => {
        return <Tag>{`${record?.role}`}</Tag>;
      },
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',

      render: (_, record: any) => {
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              width: '80px',
            }}
          >
            <Badge status={switchRoleMapColor(record?.status)} />
            <Typography.Text
              type={switchRoleMapColor(record?.status)}
              style={{ fontSize: 12, marginLeft: 5 }}
            >
              {switchRoleMap(record?.status)}
            </Typography.Text>
          </div>
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
          <Tooltip title={'Edit user'}>
            <Dropdown
              overlay={
                <Menu>
                  <Popconfirm
                    title="Change Status"
                    description={`Are you sure to change ${record.name} to active?`}
                    onConfirm={() => {
                      mutate({
                        val: { status: 1 },
                        id: record._id,
                      });
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Menu.Item style={{ color: palette.primary.main }} key="1">
                      Active
                    </Menu.Item>
                  </Popconfirm>
                  <Popconfirm
                    title="Change Status"
                    description={`Are you sure to change ${record.name} to block?`}
                    onConfirm={() => {
                      mutate({
                        val: { status: 2 },
                        id: record._id,
                      });
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Menu.Item style={{ color: 'red' }} key="2">
                      Block
                    </Menu.Item>
                  </Popconfirm>
                </Menu>
              }
            >
              <Button
                onClick={() => console.log(record?.id)}
                icon={<EditTwoTone />}
              >
                Change Status
              </Button>
            </Dropdown>
          </Tooltip>
        );
      },
    },
  ];

  const onSearch: SearchProps['onSearch'] = (value, _e) => setSearch(value);

  const debounceSearch = debounce(onSearch, 500);

  return (
    <Content>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3 style={{}}>User Management</h3>
        <div>
          <Input.Search
            placeholder="input search email or name"
            onSearch={debounceSearch}
            style={{ width: 250 }}
          />
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="1" onClick={() => setRole('ADMIN')}>
                  Admin
                </Menu.Item>
                <Menu.Item key="2" onClick={() => setRole('RESELLER')}>
                  Reseller
                </Menu.Item>
                <Menu.Item key="3" onClick={() => setRole('REGULER')}>
                  Reguler
                </Menu.Item>
              </Menu>
            }
          >
            <Button style={{ marginLeft: 5 }} icon={<ControlOutlined />}>
              Filter Role
            </Button>
          </Dropdown>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="1" onClick={() => setStatus('1')}>
                  ACTIVE
                </Menu.Item>
                <Menu.Item key="2" onClick={() => setStatus('0')}>
                  IN ACTIVE
                </Menu.Item>
                <Menu.Item key="3" onClick={() => setStatus('2')}>
                  BLOCKED
                </Menu.Item>
              </Menu>
            }
          >
            <Button style={{ marginLeft: 5 }} icon={<ControlOutlined />}>
              Filter Status
            </Button>
          </Dropdown>
        </div>
      </div>
      {(role || search || status) && (
        <>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              setRole('');
              setSearch('');
              setStatus('');
            }}
          >
            Clear Filter
          </Button>
        </>
      )}
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
      {/* <Modal
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
      </Modal> */}
    </Content>
  );
}
