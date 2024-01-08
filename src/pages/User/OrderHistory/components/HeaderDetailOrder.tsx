import React from 'react';
import Content from '@/layouts/Dashboard/Content';
import { Row, Col, Tag, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import { formatRupiahV2 } from '@/utils/utilitys';
import moment from 'moment';

interface IProps {
  data: any;
}

const HeaderDetailOrder: React.FC<IProps> = ({ data }) => {
  const lastData =
    data?.transactionDetail[data?.transactionDetail.length - 1] ?? {};
  const statusMap: any = {
    inCart: {
      color: 'warning',
      rex: '#fffbe6',
      text: 'IN CART',
    },
    success: {
      color: 'success',
      rex: '#f6ffed',
      text: 'SUCCESSFULL',
    },
  };

  const BoxItem = ({
    children,
    xs,
    md,
    style,
  }: {
    children: React.ReactNode;
    xs: number;
    md: number;
    style?: React.CSSProperties;
  }) => (
    <Col
      xs={xs}
      md={md}
      style={{
        padding: '1em',
        // backgroundColor: '#f7f7f7',
        height: 'auto',
        borderRadius: '.3em',
        ...style,
      }}
    >
      {children}
    </Col>
  );

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
      <p style={{ fontSize: 16, fontWeight: 400 }}>{title}</p>
      <p style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase' }}>
        {value}
      </p>
    </Col>
  );

  return (
    <Content
      style={{
        width: '100%',
        height: '100%',
        //  border: ' 2px solid #DD9C93'
      }}
    >
      <Row justify="space-between">
        <BoxItem
          xs={24}
          md={4}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '.5em',
            backgroundColor: statusMap[data.transactionStatus]['rex'],
          }}
        >
          <Tag
            color={statusMap[data.transactionStatus]['color']}
            style={{ textTransform: 'capitalize' }}
          >
            {statusMap[data.transactionStatus]['text']}
          </Tag>
          <p>{formatRupiahV2(data.total.toString())}</p>
          <Button type="link" href={data.midtransURL} target="_blank">
            Cara Bayar
          </Button>
        </BoxItem>
        <BoxItem
          xs={24}
          md={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            rowGap: '2em',
            padding: '3em',
            backgroundColor: '#f7f7f7',
          }}
        >
          <Row
            gutter={[16, 16]}
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              // flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ItemMiddleHeader
              xs={24}
              md={8}
              title="Order ID"
              value={data.orderId}
            />
            {lastData?.va_numbers && (
              <ItemMiddleHeader
                xs={24}
                md={8}
                title="Virtual Account"
                value={lastData?.va_numbers[0]['va_number']}
              />
            )}
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
              // flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {lastData?.va_numbers && (
              <ItemMiddleHeader
                xs={24}
                md={8}
                title="Payment Method"
                value={lastData?.va_numbers[0]['bank']}
              />
            )}

            {lastData && (
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
            )}

            <ItemMiddleHeader
              xs={24}
              md={8}
              title="Type"
              value={data.payment_type}
            />
          </Row>
        </BoxItem>

        <BoxItem
          xs={24}
          md={6}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '.5em',
            backgroundColor: '#f7f7f7',
          }}
        >
          <Button block type="primary" icon={<DownloadOutlined />}>
            Download Invoice
          </Button>
          <div style={{ display: 'flex', gap: '.5em' }}>
            <p style={{ fontSize: 13, fontWeight: 400 }}>Invoice Date</p>
            <p style={{ fontSize: 13, fontWeight: 700 }}>
              {moment(data.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
            </p>
          </div>
        </BoxItem>
      </Row>
    </Content>
  );
};
export default HeaderDetailOrder;
