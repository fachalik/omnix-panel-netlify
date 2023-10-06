import { Card, Breadcrumb, Row, Col, Tabs, Form, Input } from 'antd';
import CardSettingChannel from '@/components/AllCard/CardSettingChannel';
import marketingImg from '@/assets/icons/channelmarketing.svg';

export default function Page() {
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
                <Row>
                  <Col xs={24} sm={24} md={24} lg={12}>
                    <Form layout="vertical">
                      <Form.Item label="Link Pembayaran">
                        <Input value="Admin@omnix.ac.id" />
                      </Form.Item>
                      <Form.Item label="E-Wallet Agregator">
                        <Input value="9812ncjsdn09237e0" />
                      </Form.Item>
                      <Form.Item label="API Static VA">
                        <Input value="mileasejahtera" />
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
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
