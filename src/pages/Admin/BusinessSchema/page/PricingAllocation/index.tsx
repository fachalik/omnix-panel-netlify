import React from 'react';
import { Button, Table, Tooltip, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useSearchParams } from 'react-router-dom';
import {
  EyeOutlined,
  WarningOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

import Drawer from '@/components/Drawer';
// import FormMProduct from '../../Form/FormMProduct';
import FormAddUser from '../../Form/FormAddUser';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

import { useGetUsers } from '@/hooks/ReactQuery/admin/useGetUsers';
import { getLogin } from '@/utils/sessions';
// import { palette } from '@/theme/themeConfig';
import lodash from 'lodash';
// import moment from 'moment';

export default function PricingAllocation() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [addUser, setAddUser] = React.useState<boolean>(false);

  const [role, setRole] = React.useState('RESELLER');

  const { data, isLoading, error, isError, isSuccess }: any = useGetUsers({
    token: getLogin()?.token ?? '',
    page: 1,
    limit: 100,
    role,
    reqPrice: '1',
  });

  const columns: ColumnsType<any> = [
    {
      title: 'Email',
      dataIndex: 'email',
      width: '300px',
    },
    {
      key: 'val',
      title: 'Name',
      dataIndex: 'name',
      width: '300px',
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
      key: 'status',
      title: 'status',
      dataIndex: 'status',
      align: 'center',
      render: (_, record: any) => {
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {record.underPrice == '1' ? (
              <Tag color="#ffd666">
                <Tooltip title={'Sales Price is under default price'}>
                  <WarningOutlined style={{ color: 'black' }} />
                </Tooltip>
              </Tag>
            ) : (
              <Tag color="#87d068">
                <Tooltip title={'Sales Price is not under default price'}>
                  <CheckCircleOutlined style={{ color: 'black' }} />
                </Tooltip>
              </Tag>
            )}
          </div>
        );
      },
    },
    {
      key: 'action',
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      render: (_, record: any) => {
        return (
          <Button
            onClick={() => {
              setSearchParams({
                ...searchParams,
                user: record?._id,
                username: record.name,
                role,
              });
            }}
            style={{ marginRight: '0.5em' }}
            icon={<EyeOutlined />}
          />
        );
      },
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div
        style={{
          marginBottom: '1em',
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div>
          <Button
            disabled={role === 'RESELLER'}
            onClick={() => {
              setRole('RESELLER');
            }}
          >
            Reseller
          </Button>
          <Button
            disabled={role === 'REGULER'}
            onClick={() => {
              setRole('REGULER');
            }}
            style={{ marginLeft: '1em' }}
          >
            User
          </Button>
        </div>
        <Button
          onClick={() => {
            setAddUser(true);
          }}
          type="primary"
          style={{ marginLeft: '1em' }}
        >
          Add New Reseller / Tenant
        </Button>
      </div>
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          borderRadius: 8,
          overflowY: 'hidden',
          overflowX: 'auto',
        }}
      >
        {isLoading && <Loading />}
        {isSuccess && data && (
          <Table
            loading={isLoading}
            style={{ marginTop: 10, paddingBottom: 20 }}
            columns={columns}
            dataSource={data.data.map((item: any, idx: number) => ({
              ...item,
              keys: idx.toString(),
            }))}
          />
        )}
        {!isLoading && isError && <Error error={error} />}

        <Drawer
          onClose={() => setAddUser(false)}
          open={addUser}
          title="Add User"
        >
          <FormAddUser handleClose={() => setAddUser(false)} role={role} />
        </Drawer>
      </div>
    </div>
  );
}
