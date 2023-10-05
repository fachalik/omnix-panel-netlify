import { Card, Row, Col, Avatar, Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

export default function CardSettingChannel() {
  return (
    <Card
      bodyStyle={{
        padding: 20,
        boxShadow: '0 0 2px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.14)',
      }}
      style={{
        width: 'calc(100% - 20px)',
        margin: 10,
        alignItems: 'center',
        border: 'unset',
      }}
    >
      <Row
        gutter={[12, 12]}
        style={{
          width: '100%',

          alignItems: 'center',
        }}
      >
        <Col xs={24} sm={24} md={24} lg={1} xl={1}>
          <Avatar size={'large'} src={`/icons/whatsapp.svg`} />
        </Col>
        <Col xs={24} sm={24} md={24} lg={14} xl={14}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: 5,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: '#2D2D2D',
              }}
            >
              Whatsapp
            </div>
            <div
              style={{
                fontSize: 12,
                color: '#8A98AD',
              }}
            >
              You can add accounts, and also hold settings on{' '}
              <span style={{ color: '#434343' }}>Telegram channel</span>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={9} xl={9}>
          <Button type="primary" icon={<SettingOutlined />}>
            Configuration
          </Button>
        </Col>
      </Row>
    </Card>
  );
}
