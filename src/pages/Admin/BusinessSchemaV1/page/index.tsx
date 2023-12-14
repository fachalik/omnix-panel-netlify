// import React from 'react';
import { Button, Table, Tabs, Dropdown, Menu, Tooltip, Popconfirm } from 'antd';

// import ContentLeft from '@/layouts/Dashboard/ContentLeft';
import Content from '@/layouts/Dashboard/Content';

import type { ColumnsType } from 'antd/es/table';

export default function index() {
  // const menuList = ['Product', 'Non Product'];
  // const [menu, setMenu] = React.useState('Product');

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
      render: (_, _record: any) => {
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

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      {/* <ContentLeft style={{ height: '30%' }}>
        <p style={{ fontSize: 16 }}>Product</p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {menuList.map((item: string, idx: number) => (
            <Button
              key={`${idx}_${item}`}
              onClick={() => setMenu(item)}
              style={{
                marginTop: '10px',
                textAlign: 'start',
              }}
            >
              {item}
            </Button>
          ))}
        </div>
      </ContentLeft> */}
      <Content>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">OmniX Service</Menu.Item>
              <Menu.Item key="2">OmniX Marketing</Menu.Item>
              <Menu.Item key="3">OmniX Survey</Menu.Item>
            </Menu>
          }
        >
          <Button style={{ marginLeft: 5 }}>Filter Status</Button>
        </Dropdown>
        <Tabs
          style={{ marginTop: 20 }}
          items={[
            {
              label: 'Package',
              key: 'default-business-schema',
              children: (
                <>
                  <Button type="primary">Tambah Data</Button>
                  <Table
                    style={{ marginTop: 10, paddingBottom: 20 }}
                    columns={columns}
                    dataSource={[{}]}
                  />
                </>
              ),
            },
            {
              label: 'Add On',
              key: 'member',
              children: (
                <>
                  <Button type="primary">Tambah Data</Button>
                  <Table
                    style={{ marginTop: 10, paddingBottom: 20 }}
                    columns={columns}
                    dataSource={[{}]}
                  />
                </>
              ),
            },
            {
              label: 'Ala Carte',
              key: 'reseller',
              children: (
                <>
                  <Button type="primary">Tambah Data</Button>
                  <Table
                    style={{ marginTop: 10, paddingBottom: 20 }}
                    columns={columns}
                    dataSource={[{}]}
                  />
                </>
              ),
            },
          ]}
          tabBarStyle={{
            marginLeft: 10,
            marginRight: 10,
          }}
        />
        {/* <Table
          style={{ marginTop: 10, paddingBottom: 20 }}
          columns={columns}
          dataSource={[{}]}
        /> */}
        {/* {menu === 'Product' && <Product />}
        {menu === 'Non Product' && <NonProduct />} */}
      </Content>
    </div>
  );
}
