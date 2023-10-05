import { Row, Col, Card, Avatar, Button } from 'antd';

// import { getLogin } from '@/utils/sessions';
// import { useRouter } from 'next/navigation';
import { useNavigate } from 'react-router-dom';

export default function ExploreProduct() {
  const navigate = useNavigate();
  return (
    <div>
      <div
        style={{ marginBottom: '1em', display: 'flex', alignItems: 'start' }}
      >
        <Button>Platform</Button>
        <Button style={{ marginLeft: '1em' }}>Non Platform</Button>
      </div>
      <Row gutter={[16, 16]}>
        {Array(5)
          .fill(2)
          .map((_, idx) => (
            <Col span={8} key={idx}>
              <Card
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start',
                  textAlign: 'start',
                }}
              >
                <Avatar
                  style={{ marginBottom: '1em' }}
                  src={'/icons/logo1.svg'}
                />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <p style={{ fontSize: 14, fontWeight: 600 }}>Omnix Service</p>
                  <p style={{ fontSize: 14, fontWeight: 400 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <Button
                    style={{ marginTop: '1em' }}
                    type="primary"
                    onClick={() => navigate('/active-product')}
                  >
                    Active now
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
}
