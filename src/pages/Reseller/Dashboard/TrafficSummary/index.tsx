import React from 'react';
import { Button } from 'antd';

import Whatsapp from './Whatsapp';
import Twitter from './Twitter';
import Facebook from './Facebook';
import Instagram from './Instagram';

export default function index() {
  const [buttonActive, setButtonActive] = React.useState<string>('whatsapp');
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
            onClick={() => setButtonActive('whatsapp')}
            type={buttonActive === 'whatsapp' ? 'primary' : 'default'}
          >
            Whatsapp
          </Button>
          <Button
            onClick={() => setButtonActive('instagram')}
            type={buttonActive === 'instagram' ? 'primary' : 'default'}
            style={{ marginLeft: '1em', marginTop: '0.5em' }}
          >
            Instagram
          </Button>
          <Button
            onClick={() => setButtonActive('facebook')}
            type={buttonActive === 'facebook' ? 'primary' : 'default'}
            style={{ marginLeft: '1em', marginTop: '0.5em' }}
          >
            Facebook
          </Button>
          <Button
            onClick={() => setButtonActive('twitter')}
            type={buttonActive === 'twitter' ? 'primary' : 'default'}
            style={{ marginLeft: '1em', marginTop: '0.5em' }}
          >
            twitter
          </Button>
        </div>

        <div style={{ marginTop: '2em' }}>
          {buttonActive === 'whatsapp' && <Whatsapp />}

          {buttonActive === 'instagram' && <Instagram />}

          {buttonActive === 'facebook' && <Facebook />}

          {buttonActive === 'twitter' && <Twitter />}
        </div>
      </div>
    </div>
  );
}
