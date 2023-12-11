import { useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'antd';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        padding: 20,
        height: 'calc(100vh)',
      }}
    >
      <Row
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Col>
          <h1 style={{ fontSize: '36px', fontWeight: 500 }}>
            Ooopss...
            <br />
            Something went wrong
          </h1>
          <h1 style={{ fontSize: '15pxf', fontWeight: 500, lineHeight: '40px' }}>
            page not found
          </h1>

          <Button
            style={{ marginTop: 2, fontSize: '16px' }}
            onClick={() => navigate('/')}
          >
            Back to Homepage
          </Button>
        </Col>
      </Row>
    </div>
  );
}
