import React from 'react';
import { Table, Button, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useSearchParams } from 'react-router-dom';

import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { EllipsisOutlined } from '@ant-design/icons';

import lodash from 'lodash';
import { formatRupiah } from '@/utils/utilitys';
import { useGetProduct } from '@/hooks/ReactQuery/admin/useGetProduct';
import { getLogin } from '@/utils/sessions';

export default function DetailProduct() {
  const [searchParams, setSearchParams]: any = useSearchParams();

  const product = searchParams.get('product');
  const type = searchParams.get('type');

  const [addProduct, setAddProduct] = React.useState<boolean>(false);

  const [editProduct, seteditProduct] = React.useState<boolean>(false);
  const [editData, setEditData] = React.useState<any>(null);

  const { data, isLoading, error, isError, isSuccess }: any = useGetProduct({
    token: getLogin()?.token ?? '',
    page: 1,
    limit: 100,
    productType: type,
    productCategory: product,
  });

  const columns: ColumnsType<any> = [
    {
      title: 'No',
      dataIndex: 'number',
      render: (_text, _record, index: number) => index + 1,
      width: 80,
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      key: 'description',
      title: 'Description',
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
      key: 'type',
      title: 'Type',
      dataIndex: 'type',
      render: (_, record: any) => {
        return (
          <p style={{ fontSize: 14, fontWeight: 600 }}>{record.type ?? '-'}</p>
        );
      },
    },
    {
      key: 'defaultPrice',
      title: 'Default Price',
      dataIndex: 'defaultPrice',
      render: (_, record: any) => {
        return (
          <p style={{ fontSize: 14, fontWeight: 600 }}>
            {formatRupiah(record.defaultPrice.toString(), 'Rp.')}
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
            {formatRupiah(record.salesPrice.toString(), 'Rp.')}
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
          <p
            style={{
              color: record.status ? 'green' : 'yellow',
            }}
          >
            {record.status ? 'Active' : 'In Active'}
          </p>
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
                  product,
                  id: record?.id,
                });
              }}
              style={{ marginRight: '0.5em' }}
              icon={<EllipsisOutlined />}
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
          justifyContent: 'end',
          width: '100%',
        }}
      >
        <Button
          onClick={() => {
            setSearchParams({
              ...Object.fromEntries(searchParams),
              type,
              product: product,
              action: 'add',
            });
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
            dataSource={data.data}
          />
        )}
        {!isLoading && isError && <Error error={error} />}
      </div>
    </div>
  );
}
