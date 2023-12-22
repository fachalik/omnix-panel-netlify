import React from 'react';
import { Table, Button, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useSearchParams } from 'react-router-dom';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';

import Drawer from '@/components/Drawer';
import FormMProductUser from '../../Form/FormMProductUser';

import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { useGetMProduct } from '@/hooks/ReactQuery/admin/useGetMProduct';
import { getLogin } from '@/utils/sessions';
import { palette } from '@/theme/themeConfig';

export default function ProductSettingUser() {
  const [searchParams, setSearchParams] = useSearchParams();
  const role: any = searchParams.get('role');
  const user: any = searchParams.get('user');

  const [addProduct, setAddProduct] = React.useState<boolean>(false);

  const [editProduct, seteditProduct] = React.useState<boolean>(false);
  const [editData, setEditData] = React.useState<any>(null);

  const [type, setType] = React.useState('PLATFORM');

  const { data, isLoading, error, isError, isSuccess }: any = useGetMProduct({
    token: getLogin()?.token ?? '',
    page: 1,
    limit: 100,
    ProductType: type,
    id_reseller: role === 'RESELLER' ? user : null,
    user_id: role === 'REGULER' ? user : null,
  });

  const columns: ColumnsType<any> = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
    },
    {
      key: 'productType',
      title: 'Categories',
      dataIndex: 'productType',
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      render: (_, record: any) => {
        return (
          <Tag color={record.status ? 'success' : 'warning'}>
            {record.status ? 'Active' : 'In Active'}
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
            <Button
              onClick={async () => {
                await setEditData(null);
                await setEditData(record);
                await seteditProduct(true);
              }}
              style={{ marginRight: '0.5em' }}
              color={palette.primary.main}
              icon={<EditOutlined style={{ color: palette.primary.main }} />}
            />
            <Button
              onClick={() => {
                setSearchParams({
                  ...searchParams,
                  type,
                  product: record.key,
                  product_id: record._id,
                  role,
                  user,
                });
              }}
              style={{ marginRight: '0.5em' }}
              icon={<EyeOutlined />}
            />
          </div>
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
            disabled={type === 'PLATFORM'}
            onClick={() => {
              setType('PLATFORM');
            }}
          >
            Platform
          </Button>
          <Button
            disabled={type === 'CHANNEL'}
            onClick={() => {
              setType('CHANNEL');
            }}
            style={{ marginLeft: '1em' }}
          >
            Non Platform
          </Button>
        </div>
        <Button
          onClick={() => {
            setAddProduct(true);
          }}
          type="primary"
          style={{ marginLeft: '1em' }}
        >
          Add Product
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
          onClose={() => setAddProduct(false)}
          open={addProduct}
          title="Add Product"
        >
          {role === 'REGULER' && (
            <FormMProductUser
              handleClose={() => setAddProduct(false)}
              productType={type}
            />
          )}
        </Drawer>

        <Drawer
          onClose={() => seteditProduct(false)}
          open={editProduct}
          title="Edit Product"
        >
          {role === 'REGULER' && (
            <FormMProductUser
              handleClose={() => setAddProduct(false)}
              productType={type}
              data={editData}
            />
          )}
        </Drawer>
      </div>
    </div>
  );
}
