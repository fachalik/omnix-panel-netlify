import React from 'react';
import { Button, Space } from 'antd';

import NoProductPage from './NonProduct';
import Product from './Product';

export default function TabDefaultSchema() {
  const [schema, setSchema] = React.useState('platform');
  return (
    <div>
      <Space
        direction="vertical"
        size="middle"
        style={{ display: 'flex', marginLeft: 10, marginRight: 10 }}
      >
        <div
          style={{
            marginBottom: '1em',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
          }}
        >
          <div
            style={{
              marginBottom: '1em',
              display: 'flex',
              alignItems: 'start',
            }}
          >
            <Button
              type={schema === 'platform' ? 'primary' : 'default'}
              onClick={() => setSchema('platform')}
              disabled={schema === 'platform'}
            >
              Platform
            </Button>
            <Button
              type={schema === 'non-platform' ? 'primary' : 'default'}
              onClick={() => setSchema('non-platform')}
              style={{ marginLeft: '1em' }}
            >
              Non Platform
            </Button>
          </div>
        </div>

        {schema === 'platform' && <Product />}
        {schema === 'non-platform' && <NoProductPage />}
      </Space>
    </div>
  );
}
