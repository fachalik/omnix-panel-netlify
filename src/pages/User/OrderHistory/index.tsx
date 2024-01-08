import React from 'react';
import { Button, Tag, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EllipsisOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { getLogin } from '@/utils/sessions';
import { useGetOrderUser } from '@/hooks/ReactQuery/user/useGetOrderUser';
import { useAuthStore } from '@/store';

import { TablePagination } from '@/components/TablePagination';
import Content from '@/layouts/Dashboard/Content';
import HeaderSection from '@/components/HeaderSection';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

export default function OrderHistory() {
  const [limit, _setLimit] = React.useState<number>(10);
  const [page, setPage] = React.useState<number>(1);
  const [selectedDateRange, setSelectedDateRange] = React.useState<any>([]);

  const handleDateRangeChange = (dates: any) => {
    setSelectedDateRange(dates);
    setPage(1);
  };

  const { user } = useAuthStore((state) => state);
  const navigate = useNavigate();

  const statusMap: any = {
    inCart: {
      color: 'warning',
      text: 'IN CART',
    },
    success: {
      color: 'success',
      text: 'SUCCESSFULL',
    },
  };

  const { data, isLoading, isSuccess, isError, error }: any = useGetOrderUser({
    token: getLogin()?.token,
    body: selectedDateRange
      ? {
          start_date: selectedDateRange[0],
          end_date: selectedDateRange[1],
        }
      : {},
    limit,
    page,
    user_id: user?._id ?? '',
  });

  const columns: ColumnsType<any> = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      render: (_, record: any) => {
        return <p>{record?.name}</p>;
      },
    },
    {
      key: 'orderId',
      title: 'ID Payment',
      dataIndex: 'orderId',
      render: (_, record: any) => {
        return <p>{record?.orderId}</p>;
      },
    },
    {
      key: 'createdAt',
      title: 'Invoice Date',
      dataIndex: 'createdAt',
      render: (_, record: any) => {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '.5em',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <p>{moment(record?.createdAt).format('MMMM D, YYYY | h:mm A')}</p>
            <Button disabled>Download Invoice</Button>
          </div>
        );
      },
    },
    {
      key: 'transactionStatus',
      title: 'Status',
      dataIndex: 'transactionStatus',
      align: 'center',
      render: (_, record: any) => {
        return (
          <Tag
            color={statusMap[record.transactionStatus]['color']}
            style={{ textTransform: 'capitalize' }}
          >
            {statusMap[record.transactionStatus]['text']}
          </Tag>
        );
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
            onClick={() => {
              navigate(`/order-history/${record.orderId}`);
            }}
            icon={<EllipsisOutlined />}
          />
        );
      },
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
      <HeaderSection item={[{ title: 'Order History' }]}>
        <DatePicker.RangePicker
          value={selectedDateRange}
          onChange={handleDateRangeChange}
          format="YYYY-MM-DD"
        />
      </HeaderSection>
      <Content>
        <div style={{ overflow: 'auto' }}>
          {isLoading && <Loading />}
          {isSuccess && data && (
            <TablePagination
              columns={columns}
              data={data.data}
              isLoading={isLoading}
              style={{ marginTop: 10, paddingBottom: 20 }}
              total={data.total}
              current={page}
              pageSize={limit}
              setPage={setPage}
              isPaginate
            />
          )}
          {!isLoading && isError && <Error error={error} />}
        </div>
      </Content>
    </div>
  );
}
