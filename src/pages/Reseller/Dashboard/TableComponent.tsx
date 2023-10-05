import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

function TableComponent() {
  const columns: ColumnsType<any> = [
    {
      title: 'Tenant',
      dataIndex: 'tenant',
    },
    {
      title: 'Subscription Package',
      dataIndex: 'subscription_package',
    },
    {
      title: 'Subscription Date',
      dataIndex: 'subscription_date',
    },
    {
      title: 'Payment Status',
      dataIndex: 'payment_status',
    },
  ];

  const data: any[] = [
    {
      key: '1',
      tenant: '',
      account_type: '',
      subscription_package: '',
      subscription_date: '',
      payment_status: '',
    },
  ];

  return (
    <Table
      style={{ marginTop: 10, paddingBottom: 20 }}
      columns={columns}
      dataSource={data}
    />
  );
}

export default TableComponent;
