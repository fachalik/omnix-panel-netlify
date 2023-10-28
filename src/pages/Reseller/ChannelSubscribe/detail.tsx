import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Card, Table, Button, Drawer, Modal, Breadcrumb } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import FormAccount from '@/components/FormAccount';
import FormAccountEdit from '@/components/FormAccountEdit';
import whatsappIcon from '@/assets/icons/whatsapp.svg';

export default function Detail() {
  const [openAccount, setOpenAccount] = React.useState<any>(false);
  const onClose = () => {
    setOpenAccount(false);
  };
  const [openEdit, setOpenEdit] = React.useState<any>(false);
  const onCloseEdit = () => {
    setOpenEdit(false);
  };
  const [isModalOpen, setIsModalOpen] = React.useState<any>(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: ColumnsType<any> = [
    {
      title: 'Account Name',
      dataIndex: 'account_name',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_broadcast',
    },
    {
      title: 'WA Business ID',
      dataIndex: 'wa_business_id',
    },
    {
      key: 'subscribe',
      title: 'Subscribe',
      dataIndex: 'subscribe',
      render: (data: any) => <p>{data.subsribe ? 'manual' : 'Embeded'}</p>,
    },
    {
      key: 'val',
      title: 'Action',
      dataIndex: 'action',
      render: (_) => (
        <div>
          {/* <Button type="primary">Detail</Button> */}
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => setOpenEdit(true)}
          ></Button>
          <Button
            type="text"
            icon={<DeleteOutlined />}
            danger
            onClick={() => setIsModalOpen(true)}
          ></Button>
        </div>
      ),
    },
  ];

  const data: any[] = [
    {
      key: '1',
      account_name: 'Whatsapp OMNIX',
      phone_broadcast: '+6212312312312',
      wa_business_id: 'Whatsapp OMNIX',
      verified_name: 'Telkom Call Center',
      subscribe: true,
      action: ['1'],
    },
  ];

  return (
    <div>
      <Breadcrumb
        separator=">"
        style={{ marginBottom: '1em' }}
        items={[
          {
            href: '/channel-subscription',
            title: 'Manage Tenant',
          },
          {
            title: 'Whatsapp',
          },
        ]}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          marginBottom: 10,
          textAlign: 'start',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
            marginBottom: 10,
          }}
        >
          <img src={whatsappIcon} alt="omnix-whatsapp" width={30} height={30} />
          <div style={{ fontSize: 20, fontWeight: 'bold' }}>Whatsapp</div>
          <div>by Omnix</div>
        </div>
        <Button type="primary" onClick={() => setOpenAccount(true)}>
          Add Account
        </Button>
      </div>
      <Card>
        <Table
          style={{ marginTop: 10, paddingBottom: 20 }}
          columns={columns}
          dataSource={data}
        />
      </Card>
      <Drawer
        title="Add Account Whatsapp"
        placement="right"
        onClose={onClose}
        open={openAccount}
      >
        <FormAccount />
      </Drawer>

      <Drawer
        title="Edit Account Whatsapp"
        placement="right"
        onClose={onCloseEdit}
        open={openEdit}
      >
        <FormAccountEdit />
      </Drawer>
      <Modal
        centered
        title="Remove Account"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure would like to remove this account?</p>
      </Modal>
    </div>
  );
}
