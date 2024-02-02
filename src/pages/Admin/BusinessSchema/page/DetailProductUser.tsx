import React from 'react';
import { Button } from 'antd';

import ProductForUser from '../components/ProductForUser';
import PackageForUser from '../components/PackageForUser';

export default function DetailProduct() {
  const [type, setType] = React.useState('PACKAGE');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div
        style={{
          marginBottom: '1em',
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div>
          <Button
            disabled={type === 'PACKAGE'}
            onClick={() => {
              setType('PACKAGE');
            }}
          >
            Package
          </Button>
          <Button
            disabled={type === 'PRODUCT'}
            onClick={() => {
              setType('PRODUCT');
            }}
            style={{ marginLeft: '1em' }}
          >
            Product
          </Button>
        </div>
      </div>
      {type === 'PRODUCT' && <ProductForUser />}
      {type === 'PACKAGE' && <PackageForUser />}
    </div>
  );
}
