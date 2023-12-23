import { Button, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { EllipsisOutlined } from '@ant-design/icons';

import Content from '@/layouts/Dashboard/Content';
import HeaderSection from '@/components/HeaderSection';

import moment from 'moment';
import { useNavigate } from 'react-router-dom';

export default function OrderHistory() {
  const navigate = useNavigate();

  const statusMap: any = {
    '1': {
      color: 'warning',
      text: 'IN PROCESS',
    },
    '2': {
      color: 'success',
      text: 'COMPLETED',
    },
    '3': {
      color: 'error',
      text: 'FAILED',
    },
  };

  const data = [
    {
      id: '1',
      id_payment: '#12688909',
      name: 'Omnix Service',
      package: 'Paket 1',
      detail: '3 License Agent digital, 1 License SPV, Channel Digital Only',
      created_at: Date.now(),
      status: '1',
    },
    {
      id: '2',
      id_payment: '#12688909',
      name: 'Omnix Service',
      package: 'Paket 1',
      detail: '3 License Agent digital, 1 License SPV, Channel Digital Only',
      created_at: Date.now(),
      status: '1',
    },
    {
      id: '3',
      id_payment: '#12688909',
      name: 'Omnix Service',
      package: 'Paket 1',
      detail: '3 License Agent digital, 1 License SPV, Channel Digital Only',
      created_at: Date.now(),
      status: '1',
    },
    {
      id: '4',
      id_payment: '#12688909',
      name: 'Omnix Service',
      package: 'Paket 1',
      detail: '3 License Agent digital, 1 License SPV, Channel Digital Only',
      created_at: Date.now(),
      status: '1',
    },
  ];

  const columns: ColumnsType<any> = [
    {
      key: 'id_payment',
      title: 'ID Payment',
      dataIndex: 'id_payment',
      width: '5em',
      render: (_, record: any) => {
        return <p>{record?.id_payment}</p>;
      },
    },
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      width: '15em',
      render: (_, record: any) => {
        return <p>{record?.name}</p>;
      },
    },
    {
      key: 'package',
      title: 'Package',
      dataIndex: 'package',
      width: '5em',
      render: (_, record: any) => {
        return <p style={{ width: 150 }}>{record?.package}</p>;
      },
    },
    {
      key: 'detail',
      title: 'Detail',
      dataIndex: 'detail',
      render: (_, record: any) => {
        return <p>{record?.detail}</p>;
      },
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      width: '10em',
      render: (_, record: any) => {
        return (
          <Tag
            color={statusMap[record.status]['color']}
            style={{ textTransform: 'capitalize' }}
          >
            {statusMap[record.status]['text']}
          </Tag>
        );
      },
    },
    {
      key: 'invoice_date',
      title: 'Invoice Date',
      dataIndex: 'invoice_date',
      width: '20em',
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
            <p>{moment(record?.created_at).format('MMMM D, YYYY | h:mm A')}</p>
            <Button disabled>Download Invoice</Button>
          </div>
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
              navigate(`/order-history/${record.id}`);
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
        <p></p>
      </HeaderSection>
      <Content>
        <div style={{ overflow: 'auto' }}>
          {/* {isLoading && <Loading />}
          {isSuccess && data && ( */}
          <Table
            // loading={isLoading}
            style={{ marginTop: 10, paddingBottom: 20 }}
            columns={columns}
            dataSource={data}
          />
          {/* )}
          {!isLoading && isError && <Error error={error} />} */}
        </div>
      </Content>
    </div>
  );
}
