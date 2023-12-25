import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

// import { EllipsisOutlined } from '@ant-design/icons';

import Content from '@/layouts/Dashboard/Content';
import HeaderSection from '@/components/HeaderSection';

import { useGetMProduct } from '@/hooks/ReactQuery/admin/useGetMProduct';
import { useAuthStore } from '@/store/auth';

import { useNavigate } from 'react-router-dom';
import { getLogin } from '@/utils/sessions';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

export default function OrderHistory() {
  const navigate = useNavigate();

  const { user } = useAuthStore((state) => state);

  const { data, isLoading, isError, isSuccess, error }: any = useGetMProduct({
    limit: 100,
    user_id: user?._id ?? '',
    token: getLogin()?.token ?? '',
    page: 1,
    ProductType: '',
  });

  const columns: ColumnsType<any> = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      width: '15em',
      render: (_, record: any) => {
        return <p>{record?.name}</p>;
      },
    },
    {
      key: 'productType',
      title: 'Categories',
      dataIndex: 'productType',
      width: '15em',
      render: (_, record: any) => {
        return <p>{record?.productType}</p>;
      },
    },
    {
      key: 'action',
      title: '',
      dataIndex: 'action',
      width: '5em',
      render: (_, record: any) => {
        return (
          <Button
            type="primary"
            block
            onClick={() => {
              navigate(`/package/${record._id}`);
            }}
          >
            Choose
          </Button>
        );
      },
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
      <HeaderSection item={[{ title: 'Choose Package' }]} />
      <Content>
        <div style={{ overflow: 'auto' }}>
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
      </Content>
    </div>
  );
}
