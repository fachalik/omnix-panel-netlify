import React from 'react';
import { Row, Col, Card, Button } from 'antd';

import Channel from './FormSubProduct/Channel';
import Others from './FormSubProduct/Others';

interface IFormUsers {
  handleClose: () => void;
  data: any;
}

export default function FormAddSubProduct({ handleClose, data }: IFormUsers) {
  const [chooseForm, setChooseForm] = React.useState<string>('');
  return (
    <main style={{ width: '100%', height: '100%', overflow: 'scroll' }}>
      {chooseForm === '' && (
        <Row gutter={[16, 16]} style={{ padding: '5em' }}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Card
              onClick={() => setChooseForm('channels')}
              style={{
                cursor: 'pointer',
                height: '10em',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <p style={{ fontSize: 18, fontWeight: 700 }}>Channel</p>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Card
              onClick={() => setChooseForm('others')}
              style={{
                cursor: 'pointer',
                height: '10em',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <p style={{ fontSize: 18, fontWeight: 700 }}>Others</p>
            </Card>
          </Col>
        </Row>
      )}
      {chooseForm === 'others' && (
        <>
          <Button type="primary" onClick={() => setChooseForm('')}>
            Back
          </Button>
          <Others
            data={data}
            handleClose={handleClose}
            setChooseForm={setChooseForm}
          />
        </>
      )}

      {chooseForm === 'channels' && (
        <>
          <Button type="primary" onClick={() => setChooseForm('')}>
            Back
          </Button>
          <Channel
            data={data}
            handleClose={handleClose}
            setChooseForm={setChooseForm}
          />
        </>
      )}
    </main>
  );
}
