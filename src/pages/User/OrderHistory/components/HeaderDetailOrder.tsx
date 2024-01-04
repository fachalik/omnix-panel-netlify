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
  const statusMap: any = {
    inCart: {
      color: 'warning',
      text: 'IN CART',
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
        backgroundColor: '#f7f7f7',
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
    <Col xs={xs} md={md} style={{ display: 'flex', flexDirection: 'column' }}>
      <p style={{ fontSize: 16, fontWeight: 400 }}>{title}</p>
      <p style={{ fontSize: 16, fontWeight: 700 }}>{value}</p>
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
      <Row
        justify="space-between"
        gutter={[16, 16]}
        style={{ height: '100%', width: '100%' }}
      >
        <BoxItem
          xs={24}
          md={4}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '.5em',
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
            gap: '.5em',
            width: '100%',
          }}
        >
          <Row
            gutter={[16, 16]}
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ItemMiddleHeader
              xs={24}
              md={12}
              title="Order ID"
              value={data.orderId}
            />
            <ItemMiddleHeader
              xs={24}
              md={12}
              title="Billing"
              value={data.method}
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
