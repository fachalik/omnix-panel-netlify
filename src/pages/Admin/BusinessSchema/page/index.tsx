import React from 'react';
import { Button, Table, Tabs, Tooltip, Popconfirm } from 'antd';

import ContentLeft from '@/layouts/Dashboard/ContentLeft';
import Content from '@/layouts/Dashboard/Content';

import type { ColumnsType } from 'antd/es/table';

import Package from './Package';
// import NonProduct from './NonProduct';

export default function index() {
  const [menu, setMenu] = React.useState('PLATFORM');

  const columns: ColumnsType<any> = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
    },
    {
      title: 'Product Type',
      dataIndex: 'productType',
    },
    {
      title: 'Product Category',
      dataIndex: 'productCategory',
    },
    {
      title: 'Product Price',
      dataIndex: 'productPrice',
    },
    {
      key: 'action',
      title: 'Action',
      dataIndex: 'action',
      render: (_, record: any) => {
        return (
          <div>
            <Tooltip title={'Edit product'}>
              <Button
                onClick={() => {
                  // setIsModalEdit(true);
                  // setEditData(null);
                  // setEditData(record);
                }}
                style={{ marginRight: '0.5em' }}
                // icon={<EditTwoTone />}
              />
            </Tooltip>
            <Tooltip title={'Delete Product'}>
              <Popconfirm
                title="Delete Product?"
                description="Are you sure to delete this Product?"
                onConfirm={async () => {
                  // await mutate(idDelete);
                  // await setIdDelete('');
                  // await timeout(1500);
                  // await refetch();
                }}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  // onClick={() => setIdDelete(record._id)}
                  color={'red'}
                  // icon={<DeleteOutlined style={{ color: 'red' }} />}
                >
                  Edit
                </Button>
              </Popconfirm>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const menuList = [
    {
      value: 'PLATFORM',
      label: 'Product',
    },
    {
      value: 'CHANNEL',
      label: 'Non Product',
    },
  ];

  // PLATFORM_OMNIX_SERVICE = 'PLATFORM_OMNIX_SERVICE',
  // PLATFORM_OMNIX_SALES = 'PLATFORM_OMNIX_SALES',
  // PLATFORM_OMNIX_MARKETING = 'PLATFORM_OMNIX_MARKETING',

  // CHANNEL_WHATSAPP = 'CHANNEL_WHATSAPP',
  // CHANNEL_TELEGRAM = 'CHANNEL_TELEGRAM',

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <ContentLeft style={{ height: '30%' }}>
        <p style={{ fontSize: 16 }}>Product</p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {menuList.map(
            (item: { value: string; label: string }, idx: number) => (
              <Button
                key={idx}
                onClick={() => setMenu(item.value)}
                style={{
                  marginTop: '10px',
                  textAlign: 'start',
                }}
              >
                {item.label}
              </Button>
            )
          )}
        </div>
      </ContentLeft>
      <Content>
        {menu === 'PLATFORM' && (
          <Tabs
            items={[
              {
                label: 'OmniX Service',
                key: 'PLATFORM_OMNIX_SERVICE',
                children: (
                  <Package
                    productType={menu}
                    productCategory={'PLATFORM_OMNIX_SERVICE'}
                  />
                ),
              },
              {
                label: 'OmniX Marketing',
                key: 'PLATFORM_OMNIX_MARKETING',
                children: (
                  <Package
                    productType={menu}
                    productCategory={'PLATFORM_OMNIX_MARKETING'}
                  />
                ),
              },
              {
                label: 'OmniX Sales',
                key: 'PLATFORM_OMNIX_SALES',
                children: (
                  <Package
                    productType={menu}
                    productCategory={'PLATFORM_OMNIX_SALES'}
                  />
                ),
              },
            ]}
            tabBarStyle={{
              marginLeft: 10,
              marginRight: 10,
            }}
          />
        )}
      </Content>
    </div>
  );
}
