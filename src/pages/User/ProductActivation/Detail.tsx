import { Card, Breadcrumb, Row, Col, Tabs } from 'antd';
import CardSettingChannel from '@/components/AllCard/CardSettingChannel';
import { CredentialInformation } from './CredentialInformation';
import { PaymentInformation } from './PaymentInformation';
import HeaderSection from '@/components/HeaderSection';

import marketingImg from '@/assets/icons/channelmarketing.svg';

export default function Page() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
      <HeaderSection
        isBack
        item={[
          {
            href: '/product-activation',
            title: 'Product Activation',
          },
          {
            title: 'Omnix Marketer',
          },
        ]}
      />
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
            <Col xs={24} sm={24} md={24} lg={5}>
              <div style={{ color: '#595959', fontSize: 17, fontWeight: 500 }}>
                OMNIX Service
              </div>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={5}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'start',
                gap: '.5em',
              }}
            >
              <p>Plan</p>
              <div style={{ color: '#595959', fontSize: 17, fontWeight: 500 }}>
                Paket 1
              </div>
              <a type="link">Change Plan</a>
            </Col>
            <Col xs={24} sm={24} md={24} lg={4}>
              <div style={{ fontSize: 12 }}>Role</div>
              <div style={{ fontSize: 12 }}>Support Agent</div>
            </Col>

            <Col span={24} xs={24} sm={24} md={24} lg={4}>
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
              children: <CredentialInformation />,
            },
            {
              label: 'Setting Channel',
              key: 'setting',
              children: <CardSettingChannel />,
            },
            {
              label: 'Payment Information',
              key: 'payment',
              children: <PaymentInformation />,
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
