import React from 'react';
import HeaderSection from '@/components/HeaderSection';
import Content from '@/layouts/Dashboard/Content';
import { Row, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useParams } from 'react-router-dom';

import { useGetDetailOrderUser } from '@/hooks/ReactQuery/user/useGetOrderUser';
import { getLogin } from '@/utils/sessions';
import { HandlePlan } from '@/utils/utilitys';

import HeaderDetailOrder from './components/HeaderDetailOrder';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

const Detail: React.FC = () => {
  const params = useParams();
  const { id } = params;

  const { data, isLoading, isSuccess, isError, error }: any =
    useGetDetailOrderUser({
      orderId: id ?? '',
      token: getLogin()?.token,
    });

  const columns: ColumnsType<any> = [
    {
      title: 'item',
      dataIndex: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (_, record: any) => {
        return (
          <p>
            <HandlePlan sum={record?.price} />
          </p>
        );
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      align: 'end',
      render: (_, record: any) => {
        return (
          <p>
            <HandlePlan sum={record?.price * record?.quantity} />
          </p>
        );
      },
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
      <HeaderSection
        navigateTo="/order-history"
        isBack
        item={[
          { title: 'Order History', href: '/order-history' },
          { title: 'Detail' },
        ]}
      />
      {isLoading && <Loading />}
      {isSuccess && data && (
        <>
          <HeaderDetailOrder data={data} id={id ?? ''} />
          <Content>
            <Row style={{ height: '100%', width: '100%' }}>
              <Table
                style={{ padding: '2em 1em', width: '100%' }}
                columns={columns}
                dataSource={data.productsDetail}
                pagination={false}
                bordered
                summary={(pageData) => {
                  let total = 0;

                  pageData.forEach(({ price, quantity }) => {
                    total += price * quantity;
                  });

                  return (
                    <>
                      <Table.Summary.Row
                        style={{ width: '100%', textAlign: 'end' }}
                      >
                        <Table.Summary.Cell index={0}>
                          <p style={{ textAlign: 'start' }}>Total Payment</p>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1} colSpan={3}>
                          <Typography.Text style={{ fontWeight: 600 }}>
                            <HandlePlan sum={total} />
                          </Typography.Text>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    </>
                  );
                }}
              />
            </Row>
          </Content>
        </>
      )}
      {!isLoading && isError && <Error error={error} />}
    </div>
  );
};
export default Detail;
