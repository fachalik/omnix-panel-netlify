// import React from 'react';
import HeaderSection from '@/components/HeaderSection';
import Content from '@/layouts/Dashboard/Content';

import { Badge, Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

export default function Detail() {
  const items: DescriptionsProps['items'] = [
    {
      key: '-',
      label: 'ID Payment',
      children: '#123123123',
    },
    {
      key: '-',
      label: 'Product',
      children: 'Cloud Database',
    },
    {
      key: '-',
      label: 'Billing Mode',
      children: 'Prepaid',
    },
    {
      key: '-',
      label: 'Automatic Renewal',
      children: 'YES',
    },
    {
      key: '-',
      label: 'Order time',
      children: '2018-04-24 18:00:00',
    },
    {
      key: '-',
      label: 'Usage Time',
      children: '2019-04-24 18:00:00',
      span: 2,
    },
    {
      key: '-',
      label: 'Status',
      children: <Badge status="warning" text="IN PROCESS" />,
      span: 3,
    },
    {
      key: '-',
      label: 'Amount',
      children: 'RP.123.123',
    },
    {
      key: '-',
      label: 'Config Info',
      children: (
        <>
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1
          <br />
        </>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
      <HeaderSection
        isBack
        item={[
          { title: 'Order History', href: '/order-history' },
          { title: 'Detail' },
        ]}
      />
      <Content>
        <Descriptions items={items} />
      </Content>
    </div>
  );
}
