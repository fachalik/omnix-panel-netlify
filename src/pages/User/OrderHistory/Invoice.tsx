import React from 'react';
import { Row, Col, Table, Typography, Layout, Divider, Avatar } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useParams } from 'react-router-dom';

import { useGetDetailOrderUser } from '@/hooks/ReactQuery/user/useGetOrderUser';
import { getLogin } from '@/utils/sessions';
import { HandlePlan, formatRupiahV2 } from '@/utils/utilitys';

import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { InfomediaLogo, InfomediaSmallLogo } from '@/assets/icons';
import moment from 'moment';

export default function Invoice() {
  const { Footer } = Layout;

  const params = useParams();
  const { id } = params;
  const [_detailData, setDetailData] = React.useState<any[]>([]);
  const [totalPrice, setTotalPrice] = React.useState<number>(0);

  const { data, isLoading, isSuccess, isError, error }: any =
    useGetDetailOrderUser({
      orderId: id ?? '',
      token: getLogin()?.token,
    });

  const lastData =
    data?.transactionDetail[data?.transactionDetail.length - 1] ?? {};

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

  React.useEffect(() => {
    let isMount = true;

    if (isMount && isSuccess && data) {
      const tempData: any = data?.productsDetail.filter(
        (item: any) => item.name !== 'TAX (11%)'
      );
      setDetailData(tempData);

      const totalPrice = tempData.reduce((total: any, item: any) => {
        return total + Number(item.quantity ?? 1) * Number(item?.price);
      }, 0);
      setTotalPrice(totalPrice);
    }

    return () => {
      isMount = false;
    };
  }, [data, isSuccess]);

  return (
    <main>
      <div
        style={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#fff',
          overflow: 'auto',
          padding: '1em',
        }}
      >
        {isLoading && <Loading />}
        {isSuccess && data && (
          <div
            style={{
              width: '100%',
              maxWidth: '800px',
              margin: 'auto',
              padding: '30px',
              border: '1px solid #eee',
              boxShadow: '0 0 10px rgba(0, 0, 0, .15)',
              fontSize: 13,
              color: '#555',
              display: 'flex',
              flexDirection: 'column',
              gap: '4em',
            }}
          >
            <Row>
              <Col
                xs={12}
                md={12}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'start',
                  alignItems: 'start',
                }}
              >
                <Typography style={{ fontSize: 48, fontWeight: 700 }}>
                  Invoice
                </Typography>
                <Typography style={{ fontSize: 17, fontWeight: 700 }}>
                  Infomedia
                </Typography>
                <Typography style={{ textAlign: 'start' }}>
                  {`Date Period: ${moment(lastData?.transaction_time).format(
                    'MMMM Do YYYY, h:mm:ss a'
                  )}`}
                </Typography>
                <Typography style={{ textAlign: 'start' }}>
                  {`Invoice No : ${id}`}
                </Typography>
              </Col>
              <Col
                xs={12}
                md={12}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'start',
                  alignItems: 'end',
                }}
              >
                <img
                  src={InfomediaLogo}
                  style={{ width: '119px' }}
                  alt="infomediaLogo"
                />
                <Typography style={{ width: '15em', textAlign: 'end' }}>
                  Infomedia Nusantara Jl. RS. Fatmawati Raya No.77-81, Cipete
                  Utara, Jakarta Selatan 12150
                </Typography>
              </Col>
            </Row>
            <Row>
              <Col>
                <Typography style={{ fontWeight: 700, fontSize: '13px' }}>
                  Usage Details
                </Typography>
                <Typography style={{ fontWeight: 400, fontSize: '10.5px' }}>
                  To analyze your invoice data and see details per sub-account,
                  download the CSV supplement to invoices on the Billing
                  Overview. Learn More.
                </Typography>
              </Col>
            </Row>

            <Row style={{ height: '100%', width: '100%' }}>
              <Table
                style={{ padding: '2em 0px', width: '100%' }}
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
            <Footer>
              <Row>
                <Col
                  xs={24}
                  md={24}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography style={{ fontSize: 13, fontWeight: 700 }}>
                    Additional Information :
                  </Typography>
                  <Typography style={{ fontSize: 13, fontWeight: 700 }}>
                    Total Due :
                  </Typography>
                </Col>
                <Divider />
                <Col
                  xs={24}
                  md={24}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography style={{ fontSize: 13, fontWeight: 700 }}>
                    Sub Total :
                  </Typography>
                  <Typography style={{ fontSize: 13, fontWeight: 700 }}>
                    {formatRupiahV2(Math.ceil(totalPrice).toString())}
                  </Typography>
                </Col>
                <Col
                  xs={24}
                  md={24}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography style={{ fontSize: 13, fontWeight: 400 }}>
                    PPN 11%:
                  </Typography>
                  <Typography style={{ fontSize: 13, fontWeight: 400 }}>
                    {formatRupiahV2(Math.ceil(totalPrice * 0.11).toString())}
                  </Typography>
                </Col>
                <Col
                  xs={24}
                  md={24}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography style={{ fontSize: 13, fontWeight: 700 }}>
                    Total Payment :
                  </Typography>
                  <Typography style={{ fontSize: 13, fontWeight: 700 }}>
                    {formatRupiahV2(
                      Math.ceil(totalPrice * 0.11 + totalPrice).toString()
                    )}
                  </Typography>
                </Col>
              </Row>
              <Divider />
              <div
                style={{
                  display: 'flex',
                  gap: '1em',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  src={
                    <img src={InfomediaSmallLogo} alt="infomediaSmallLogo" />
                  }
                />
                <Typography style={{ fontSize: 13, fontWeight: 700 }}>
                  Infomedia Nusantara
                </Typography>
              </div>
            </Footer>
          </div>
        )}
        {!isLoading && isError && <Error error={error} />}
      </div>
    </main>
  );
}
