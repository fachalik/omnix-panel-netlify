import { Table, Button, Tooltip, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useSearchParams } from 'react-router-dom';

import Loading from '@/components/Loading';
import Error from '@/components/Error';

import { EllipsisOutlined } from '@ant-design/icons';

import lodash from 'lodash';
import { formatRupiah } from '@/utils/utilitys';
import {
  useGetProduct,
  usepatchProduct,
} from '@/hooks/ReactQuery/admin/useGetProduct';
import { getLogin } from '@/utils/sessions';

export default function Product() {
  const [searchParams, setSearchParams]: any = useSearchParams();

  const product = searchParams.get('product');
  const type = searchParams.get('type');
  const user: any = searchParams.get('user');
  const role: any = searchParams.get('role');

  const { mutate: mutatePatch } = usepatchProduct();

  const { data, isLoading, error, isError, isSuccess }: any = useGetProduct({
    token: getLogin()?.token ?? '',
    page: 1,
    limit: 100,
    productType: type,
    productCategory: product,
    typeDetails: 'NONPACKAGE',
  });

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
    // {
    //   key: 'productPrice',
    //   title: 'Default Price',
    //   dataIndex: 'productPrice',
    //   render: (_, record: any) => {
    //     return (
    //       <p style={{ fontSize: 14, fontWeight: 600 }}>
    //         {formatRupiah(record.productPrice.toString(), 'Rp.')}
    //       </p>
    //     );
    //   },
    // },
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
                  typeDetails: 'NONPACKAGE',
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
      </div>
    </div>
  );
}
