import React from 'react';
import { Row, Col, Typography, Layout, Divider, Avatar } from 'antd';
import { useParams } from 'react-router-dom';

import { useGetDetailOrderUser } from '@/hooks/ReactQuery/user/useGetOrderUser';
import { getLogin } from '@/utils/sessions';
import { formatRupiahV2 } from '@/utils/utilitys';

import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { InfomediaLogo } from '@/assets/icons';
import moment from 'moment';

export default function Reciept() {
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

  console.log({ data });

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
                <Typography style={{ fontSize: 32, fontWeight: 700 }}>
                  Payment Receipt
                </Typography>
                <Typography style={{ fontSize: 17, fontWeight: 700 }}>
                  From
                </Typography>
                <Typography
                  style={{ fontSize: 24, color: 'red', fontWeight: 700 }}
                >
                  Infomedia
                </Typography>
                <Typography
                  style={{ width: '15em', color: 'red', textAlign: 'start' }}
                >
                  Infomedia Nusantara Jl. RS. Fatmawati Raya No.77-81, Cipete
                  Utara, Jakarta Selatan 12150
                </Typography>
                <Typography style={{ fontSize: 17, fontWeight: 700 }}>
                  For
                </Typography>
                <Typography
                  style={{ fontSize: 24, color: 'blue', fontWeight: 700 }}
                >
                  {`${data?.userId?.name ?? '-'} - ${
                    data?.userId?.email ?? '-'
                  }`}
                </Typography>
                <Typography
                  style={{ width: '15em', color: 'blue', textAlign: 'start' }}
                >
                  -
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
                <Row style={{ width: '100%' }}>
                  <Col
                    xs={24}
                    md={24}
                    style={{
                      display: 'flex',
                    }}
                  >
                    <Typography style={{ fontSize: 13, fontWeight: 700 }}>
                      Details
                    </Typography>
                  </Col>
                  <Col
                    xs={24}
                    md={24}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography style={{ fontSize: 13, fontWeight: 700 }}>
                      Payment ID:
                    </Typography>
                    <Typography style={{ fontSize: 13, fontWeight: 700 }}>
                      {id}
                    </Typography>
                  </Col>
                  <Col
                    xs={24}
                    md={24}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography style={{ fontSize: 13, fontWeight: 700 }}>
                      Payment Date:
                    </Typography>
                    <Typography style={{ fontSize: 13, fontWeight: 700 }}>
                      {`${moment(lastData?.transaction_time).format(
                        'MMMM Do YYYY, h:mm:ss a'
                      )}`}
                    </Typography>
                  </Col>
                </Row>
              </Col>
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
                    {`Payment (${data?.payment_type})`}
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
                  src={<img src={InfomediaLogo} alt="infomediaSmallLogo" />}
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
