import React from 'react';
import { Table, Button, Tooltip, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useSearchParams } from 'react-router-dom';

import Loading from '@/components/Loading';
import Error from '@/components/Error';
import Drawer from '@/components/Drawer';

import { EllipsisOutlined } from '@ant-design/icons';

import lodash from 'lodash';
import { formatRupiah } from '@/utils/utilitys';
import {
  useGetProductUser,
  usepatchProductUser,
} from '@/hooks/ReactQuery/user/useGetProductUser';
import { getLogin } from '@/utils/sessions';
import FormAddDetailPackage from '../Form/FormAddDetailPackage';

export default function PackageForUser() {
  const [searchParams, setSearchParams]: any = useSearchParams();

  const { mutate: mutatePatch } = usepatchProductUser();

  const product = searchParams.get('product');
  const type = searchParams.get('type');
  const user: any = searchParams.get('user');
  const role: any = searchParams.get('role');
  // const product_id: any = searchParams.get('product_id');

  const [addProduct, setAddProduct] = React.useState<boolean>(false);

  const { data, isLoading, error, isError, isSuccess }: any = useGetProductUser(
    {
      token: getLogin()?.token ?? '',
      page: 1,
      limit: 100,
      productType: type,
      productCategory: product,
      akses: 'admin',
      id_user: user ?? '',
      typeDetails: 'PACKAGE',
    }
  );

  const columns: ColumnsType<any> = [
    {
      key: 'productName',
      title: 'Name',
      dataIndex: 'productName',
    },
    {
      key: 'description',
      title: 'description',
      dataIndex: 'description',
      render: (_, record: any) => {
        return (
          <Tooltip title={record?.description ?? '-'} style={{ width: 150 }}>
            {record?.description
              ? lodash.truncate(record?.description, {
                  length: 30,
                  omission: '...',
                })
              : '-'}
          </Tooltip>
        );
      },
    },
    {
      key: 'typeDetails',
      title: 'Type',
      dataIndex: 'typeDetails',
      render: (_, record: any) => {
        return (
          <p style={{ fontSize: 14, fontWeight: 600 }}>
            {record.typeDetails ?? '-'}
          </p>
        );
      },
    },
    {
      key: 'productPrice',
      title: 'Default Price',
      dataIndex: 'productPrice',
      render: (_, record: any) => {
        return (
          <p style={{ fontSize: 14, fontWeight: 600 }}>
            {record.productPrice
              ? formatRupiah(record.productPrice.toString(), 'Rp.')
              : '-'}
          </p>
        );
      },
    },
    {
      key: 'salesPrice',
      title: 'Sales Price',
      dataIndex: 'salesPrice',
      render: (_, record: any) => {
        return (
          <p style={{ fontSize: 14, fontWeight: 600 }}>
            {record.salesPrice
              ? formatRupiah(record.salesPrice.toString(), 'Rp.')
              : '-'}
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
              onClick={() => {
                setSearchParams({
                  ...Object.fromEntries(searchParams),
                  type,
                  product: product,
                  name: record?.productName,
                  id: record._id,
                  typeDetails: 'PACKAGE',
                  user,
                  role,
                });
              }}
              style={{ marginRight: '0.5em' }}
              icon={<EllipsisOutlined />}
            />
            <Button
              onClick={() =>
                mutatePatch({
                  val: { status: record?.status == 1 ? 0 : 1 },
                  id: record._id,
                  id_reseller: role === 'RESELLER' ? user : '',
                  id_user: role === 'REGULER' ? user : '',
                })
              }
              style={{ marginRight: '0.5em' }}
            >
              Change Status
            </Button>
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
          justifyContent: 'end',
          width: '100%',
        }}
      >
        <Button
          onClick={() => {
            setAddProduct(true);
          }}
          type="primary"
          style={{ marginLeft: '1em' }}
        >
          Add Package
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
          margin: 0,
          padding: 0,
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
              key: idx.toString(),
            }))}
          />
        )}
        {!isLoading && isError && <Error error={error} />}

        <Drawer
          onClose={() => setAddProduct(false)}
          open={addProduct}
          title={`Add package ${product.replaceAll('_', ' ').toLowerCase()}`}
        >
          <FormAddDetailPackage
            handleClose={() => setAddProduct(false)}
            productCategory={product}
            productType={type}
          />
        </Drawer>
      </div>
    </div>
  );
}
