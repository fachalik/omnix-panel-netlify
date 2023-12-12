import React from 'react';
import {
  Button,
  Table,
  Tag,
  //  Tooltip, Dropdown, Menu, Popconfirm
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useGetTeam } from './Hooks/useGetTeam';
import { getLogin } from '@/utils/sessions';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { palette } from '@/theme/themeConfig';
import moment from 'moment';
// import { EditTwoTone } from '@ant-design/icons';
import Modal from '@/components/Modal';
import FormAddTeam from './Form/FormAddTeam';
import Content from '@/layouts/Dashboard/Content';
// import FormUserEdit from './Form/FormUserEdit';

import { useAuthStore } from '@/store';

export default function TeamManagement() {
  const { user } = useAuthStore((state) => state);
  // ** Modal Create
  const [IsModalCreate, setIsModalCreate] = React.useState<boolean>(false);
  const handleCancelCreate = () => setIsModalCreate(false);

  const { data, isLoading, isSuccess, isError, error }: any = useGetTeam({
    token: getLogin()?.token ?? '',
    limit: 10,
    page: 1,
    UnitAccounts: user?._id ?? '',
  });

  // const { mutate } = usePatchUser();

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
  const switchRoleMapColor = (val: number) => {
    switch (val) {
      case 0:
        return 'yellow';

      case 1:
        return palette.primary.main;

      case 2:
        return 'red';

      default:
        return '';
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
        return <p>{record?.name}</p>;
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
          <Tag color={switchRoleMapColor(record?.status)}>{`${switchRoleMap(
            record?.status
          )}`}</Tag>
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
    // {
    //   key: 'action',
    //   title: 'Action',
    //   dataIndex: 'action',
    //   render: (_, record: any) => {
    //     return (
    //       <Tooltip title={'Edit user'}>
    //         <Dropdown
    //           overlay={
    //             <Menu>
    //               <Popconfirm
    //                 title="Change Status"
    //                 description={`Are you sure to change ${record.name} to active?`}
    //                 onConfirm={() => {
    //                   mutate({
    //                     val: { status: 1 },
    //                     id: record._id,
    //                   });
    //                 }}
    //                 okText="Yes"
    //                 cancelText="No"
    //               >
    //                 <Menu.Item style={{ color: palette.primary.main }} key="1">
    //                   Active
    //                 </Menu.Item>
    //               </Popconfirm>
    //               <Popconfirm
    //                 title="Change Status"
    //                 description={`Are you sure to change ${record.name} to block?`}
    //                 onConfirm={() => {
    //                   mutate({
    //                     val: { status: 2 },
    //                     id: record._id,
    //                   });
    //                 }}
    //                 okText="Yes"
    //                 cancelText="No"
    //               >
    //                 <Menu.Item style={{ color: 'red' }} key="2">
    //                   Block
    //                 </Menu.Item>
    //               </Popconfirm>
    //             </Menu>
    //           }
    //         >
    //           <Button
    //             onClick={() => console.log(record?.id)}
    //             icon={<EditTwoTone />}
    //           >
    //             Change Status
    //           </Button>
    //         </Dropdown>
    //       </Tooltip>
    //     );
    //   },
    // },
  ];

  return (
    <Content>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3 style={{}}>Team Management</h3>
        <Button type="primary" onClick={() => setIsModalCreate(true)}>
          Add Team
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
        title="Add Team"
        isModalOpen={IsModalCreate}
        handleCancel={handleCancelCreate}
      >
        <FormAddTeam handleClose={handleCancelCreate} />
      </Modal>

      {/* <Modal
        title="Edit Team"
        isModalOpen={IsModalEdit}
        handleCancel={handleCancelEdit}
      >
        <FormUserEdit handleClose={handleCancelEdit} data={editData} />
      </Modal> */}
    </Content>
  );
}
