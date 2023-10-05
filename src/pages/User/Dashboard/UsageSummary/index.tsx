import React from 'react';
import { Button } from 'antd';

import OmnixMarketing from './OmnixMarketing';
import OmnixSales from './OmnixSales';
import OmnixService from './OmnixService';
import Chatbot from './Chatbot';

export default function index() {
  const [buttonActive, setButtonActive] =
    React.useState<string>('omnix-marketing');
  return (
    <div>
      <div
        style={{
          marginBottom: '1em',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            marginBottom: '1em',
            display: 'flex',
            alignItems: 'start',
            flexWrap: 'wrap',
          }}
        >
          <Button
            style={{ marginTop: '0.5em' }}
            onClick={() => setButtonActive('omnix-marketing')}
            type={buttonActive === 'omnix-marketing' ? 'primary' : 'default'}
          >
            OMNIX MARKETING
          </Button>
          <Button
            onClick={() => setButtonActive('omnix-service')}
            type={buttonActive === 'omnix-service' ? 'primary' : 'default'}
            style={{ marginLeft: '1em', marginTop: '0.5em' }}
          >
            OMNIX SERVICE
          </Button>
          <Button
            onClick={() => setButtonActive('omnix-sales')}
            type={buttonActive === 'omnix-sales' ? 'primary' : 'default'}
            style={{ marginLeft: '1em', marginTop: '0.5em' }}
          >
            OMNIX SALES
          </Button>
          <Button
            onClick={() => setButtonActive('chatbot')}
            type={buttonActive === 'chatbot' ? 'primary' : 'default'}
            style={{ marginLeft: '1em', marginTop: '0.5em' }}
          >
            Chatbot
          </Button>
        </div>

        <div style={{ marginTop: '2em' }}>
          {buttonActive === 'omnix-marketing' && <OmnixMarketing />}

          {buttonActive === 'omnix-service' && <OmnixService />}

          {buttonActive === 'omnix-sales' && <OmnixSales />}

          {buttonActive === 'chatbot' && <Chatbot />}
        </div>
      </div>
    </div>
  );
}
