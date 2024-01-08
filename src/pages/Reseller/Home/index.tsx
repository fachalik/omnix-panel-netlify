import { useNavigate } from 'react-router-dom';

import { ArrowRightOutlined } from '@ant-design/icons';

import { Button, Card, Row, Col } from 'antd';
import { useAuthStore } from '@/store';

import Illustration1 from '@/assets/image/home-illustration-1.svg';
import Illustration2 from '@/assets/image/home-illustration-2.svg';
import Content from '@/layouts/Dashboard/Content';

export default function HomeComponent() {
  const navigate = useNavigate();
  const { user } = useAuthStore((state) => state);
  return (
    <Content>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <p style={{ fontSize: 20, fontWeight: 'bold' }}>
          {`Welcome to Omnix, ${user?.name ?? ''}`}
        </p>
        <div style={{ marginLeft: 'auto' }}>
          <Button type="primary" ghost>
            Contact Sales
          </Button>
        </div>
      </div>
      <Card
        bodyStyle={{ padding: 60 }}
        style={{ marginBottom: 20, textAlign: 'start' }}
      >
        <Row gutter={[12, 12]} align="middle">
          <Col xs={24} sm={24} md={24} lg={10}>
            <div style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
              Get Started with Channels
            </div>
            <div style={{ fontSize: 14, color: '#5B7083', marginBottom: 20 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Button type="default">Read Documentation</Button>
              <Button
                type="primary"
                onClick={() => navigate('/channel-subscription')}
              >
                Explore Channel <ArrowRightOutlined />
              </Button>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={14}>
            <div style={{ display: 'flex' }}>
              <img
                src={Illustration1}
                alt="home-illustration-1"
                style={{ width: '200px', height: '200px', margin: 'auto' }}
              />
            </div>
          </Col>
        </Row>
      </Card>
      <Card
        bodyStyle={{ padding: 60 }}
        style={{ marginBottom: 20, textAlign: 'start' }}
      >
        <Row gutter={[12, 12]} align="middle">
          <Col xs={24} sm={24} md={24} lg={10}>
            <div style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
              Activate Product
            </div>
            <div style={{ fontSize: 14, color: '#5B7083', marginBottom: 20 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Button type="default">Read Documentation</Button>
              <Button
                type="primary"
                onClick={() => navigate('/product-activation')}
              >
                Explore Product <ArrowRightOutlined />
              </Button>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={14}>
            <div style={{ display: 'flex' }}>
              <img
                src={Illustration2}
                alt="home-illustration-2"
                style={{ width: '200px', height: '200px', margin: 'auto' }}
              />
            </div>
          </Col>
        </Row>
      </Card>
    </Content>
  );
}
