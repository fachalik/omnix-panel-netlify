import React from 'react';
import { Row, Col, Tag, Button } from 'antd';

import { DownloadOutlined } from '@ant-design/icons';

import { formatRupiahV2 } from '@/utils/utilitys';
import { statusMap } from '@/utils/utilitys';
import moment from 'moment';

interface IProps {
  data: any;
  id: string;
}

const HeaderDetailOrder: React.FC<IProps> = ({ data, id }) => {
  const lastData =
    data?.transactionDetail[data?.transactionDetail.length - 1] ?? {};

  const ItemMiddleHeader = ({
    xs,
    md,
    title,
    value,
  }: {
    xs: number;
    md: number;
    title: string;
    value: string;
  }) => (
    <Col
      xs={xs}
      md={md}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: '.5em',
      }}
    >
      <p style={{ fontSize: 16, fontWeight: 400, textAlign: 'start' }}>
        {title}
      </p>
      <p
        style={{
          fontSize: 13,
          fontWeight: 700,
          textTransform: 'uppercase',
          textAlign: 'start',
        }}
      >
        {value}
      </p>
    </Col>
  );

  return (
    <div
      style={{
        backgroundColor: '#fff',
        width: '100%',
        border: '.15em solid gray',
        borderRadius: '.5em',
      }}
    >
      <Row justify="space-between" style={{ width: '100%', height: '100%' }}>
        <Col
          xs={24}
          md={4}
          style={{
            height: 'auto',
            backgroundColor: statusMap[data.transactionStatus]['rex'],
            borderRadius: '.5em 5em .5em .5em',
            padding: '1em',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '.2em',
              height: '100%',
            }}
          >
            <div style={{ height: '100%', width: '100%' }}>
              <Tag
                color={statusMap[data.transactionStatus]['color']}
                style={{ textTransform: 'capitalize' }}
              >
                {statusMap[data.transactionStatus]['text']}
              </Tag>
            </div>
            <img
              src={statusMap[data.transactionStatus]['icon']}
              alt="icon"
              style={{ height: '7em', margin: 'auto' }}
            />
            <p>Total Payment</p>
            <p style={{ fontSize: 15, fontWeight: 'bold' }}>
              {formatRupiahV2(data.total.toString())}
            </p>
            {data?.transactionStatus === 'inCart' &&
              data?.payment_type === 'bank_transfer' && (
                <Button
                  type="text"
                  onClick={() => window.open(data.midtransURL, '_blank')}
                >
                  Cara Bayar
                </Button>
              )}
          </div>
        </Col>

        <Col
          xs={24}
          md={data?.transactionStatus == 'success' ? 12 : 20}
          style={{
            height: 'auto',
            padding: '1em',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '.2em',
            }}
          >
            {data?.transactionStatus === 'inCart' && (
              <div style={{ display: 'flex', gap: '.5em' }}>
                <i
                  className="ri-error-warning-fill"
                  style={{ fontSize: '1.5em', color: 'red' }}
                />
                <p>
                  Pastikan Anda melakukan pembayaran sesuai dengan kode yang
                  tertera.
                </p>
              </div>
            )}
            <Row
              gutter={[16, 16]}
              style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                padding: '2em 0px 2em 0px',
              }}
            >
              <ItemMiddleHeader
                xs={24}
                md={8}
                title="Order ID"
                value={data.orderId}
              />

              <ItemMiddleHeader
                xs={24}
                md={8}
                title="Virtual Account"
                value={lastData?.va_numbers?.[0]?.['va_number'] ?? '-'}
              />

              <ItemMiddleHeader
                xs={24}
                md={8}
                title="Billing"
                value={data.method}
              />
            </Row>
            <Row
              gutter={[16, 16]}
              style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ItemMiddleHeader
                xs={24}
                md={8}
                title="Payment Method"
                value={lastData?.va_numbers?.[0]?.['bank'] ?? '-'}
              />

              <ItemMiddleHeader
                xs={24}
                md={8}
                title={
                  data.transactionStatus === 'success'
                    ? 'Payment'
                    : 'Payment Timeout'
                }
                value={moment(lastData?.transaction_time).format(
                  'MMMM Do YYYY, h:mm:ss a'
                )}
              />

              <ItemMiddleHeader
                xs={24}
                md={8}
                title="Type"
                value={data?.payment_type ?? '-'}
              />
            </Row>
          </div>
        </Col>

        {data?.transactionStatus == 'success' && (
          <Col
            xs={24}
            md={8}
            style={{
              height: 'auto',
              padding: '1em',
            }}
          >
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '2em',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '1.5em',
                }}
              >
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={() => window.open(`/invoice/${id}`, '_blank')}
                >
                  Download Invoice
                </Button>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.5em',
                    textAlign: 'start',
                  }}
                >
                  <p style={{ fontSize: 13, fontWeight: 400 }}>Invoice Date</p>
                  <p style={{ fontSize: 13, fontWeight: 700 }}>
                    {moment(data.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '1.5em',
                }}
              >
                <Button
                  type="default"
                  icon={<DownloadOutlined />}
                  onClick={() => window.open(`/reciept/${id}`, '_blank')}
                >
                  Download Reciept
                </Button>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.5em',
                    textAlign: 'start',
                  }}
                >
                  <p style={{ fontSize: 13, fontWeight: 400 }}>Invoice Date</p>
                  <p style={{ fontSize: 13, fontWeight: 700 }}>
                    {moment(data.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
                  </p>
                </div>
              </div>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};
export default HeaderDetailOrder;
