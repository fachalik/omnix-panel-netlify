import {
  Card,
  Breadcrumb,
  Row,
  Col,
  Tabs,
  Table,
  Popconfirm,
  Button,
} from 'antd';
import CardSettingChannel from '@/components/AllCard/CardSettingChannel';
import marketingImg from '@/assets/icons/channelmarketing.svg';
import { DeleteOutlined } from '@ant-design/icons';

export default function Page() {
  const columns: any = () => [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
    {
      title: 'Last Login',
      dataIndex: 'last_login',
    },
    {
      title: '#',
      width: '10%',
      align: 'center',
      dataIndex: 'action',
      render: () => (
        // text: any, record: any
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            <Popconfirm
              placement="left"
              title="Are you sure want delete?"
              onConfirm={() => {
                console.log('YES DELETED!');
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="text"
                danger
                key="/delete"
                icon={<DeleteOutlined />}
              ></Button>
            </Popconfirm>
          </div>
        </div>
      ),
    },
  ];
  const data = [
    {
      id: 1,
      name: 'Amelia Fauziyyah',
      email: 'ameliafauziyyah@gmail.com',
      role: 'Marketer User',
      last_login: new Date(),
    },
    {
      id: 1,
      name: 'Villia Fitriarti',
      email: 'villiafitri00@gmail.com',
      role: 'Sales User',
      last_login: new Date(),
    },
  ];

  return (
    <div>
      <Card>
        <Breadcrumb
          separator=""
          items={[
            {
              href: '/product-activation',
              title: 'Product Activation',
            },
            {
              type: 'separator',
              separator: '>',
            },
            {
              title: 'OMNIX Marketer',
            },
          ]}
        />
        <div
          style={{
            background: '#F0F2F5',
            padding: '20px 30px',
            marginTop: 20,
            marginBottom: 20,
            textAlign: 'start',
          }}
        >
          <Row align="middle" gutter={[12, 12]}>
            <Col xs={24} sm={24} md={24} lg={2}>
              <img
                src={marketingImg}
                width={100}
                height={100}
                style={{
                  width: '100%',
                  margin: 'auto',
                  objectFit: 'contain',
                  height: 60,
                }}
                alt={'marketing'}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={10}>
              <div style={{ color: '#595959', fontSize: 17, fontWeight: 500 }}>
                OMNIX Service
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={4}>
              <div style={{ fontSize: 12 }}>Role</div>
              <div style={{ fontSize: 12 }}>Support Agent</div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={4}>
              <div style={{ fontSize: 12 }}>Phone Number</div>
              <div style={{ fontSize: 12 }}>085156158466</div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={4}>
              <div style={{ fontSize: 12 }}>Last Login</div>
              <div style={{ fontSize: 12 }}>Thu 28 Sept 2023</div>
            </Col>
            <Col span={24}>
              <div style={{ fontSize: 12 }}>
                Your current OMNIX Marketing account URL is
              </div>
              <div
                style={{ fontSize: 12, color: '#6E5FC9', cursor: 'pointer' }}
              >
                https:’’nadafadhilahfitriyani-62787389821782787382.omnixmarketing.com
              </div>
            </Col>
          </Row>
        </div>
        <Tabs
          items={[
            {
              label: 'Credential Information',
              key: 'credential',
              children: (
                <Table
                  columns={columns()}
                  rowKey={(record) => record.id}
                  dataSource={data}
                  pagination={false}
                />
              ),
            },
            {
              label: 'Setting Channel',
              key: 'setting',
              children: <CardSettingChannel />,
            },
          ]}
          tabBarStyle={{
            marginLeft: 10,
            marginRight: 10,
          }}
        ></Tabs>
      </Card>
    </div>
  );
}
