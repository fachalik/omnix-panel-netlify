import React from 'react';

import { formatRupiah } from '@/utils/utilitys';
import { Divider, Button } from 'antd';

export const Summary: React.FC = () => {
  const total = 1000000;
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
      }}
    >
      <p style={{ fontSize: 18, fontWeight: 600 }}>Summary</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p style={{ fontSize: 15, fontWeight: 600 }}>Sub Total</p>
 
        <p style={{ fontSize: 15, fontWeight: 600 }}>
          {formatRupiah(total.toString(), 'Rp.')}
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p style={{ fontSize: 15, fontWeight: 600 }}>Tax</p>

        <p style={{ fontSize: 15, fontWeight: 600 }}>
          {formatRupiah((total * 0.11).toString(), 'Rp.')}
        </p>
      </div>
      <Divider />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p style={{ fontSize: 15, fontWeight: 600 }}>Total</p>

        <p style={{ fontSize: 15, fontWeight: 600 }}>
          {formatRupiah((total * 0.11 + total).toString(), 'Rp.')}
        </p>
      </div>
      <p style={{ fontSize: 12, fontWeight: 400 }}>
        By placing your order, you agree to our company Privacy Policy and
        Conditions of Use.
      </p>
      <Button block type="primary">
        Continue
      </Button>
    </div>
  );
};
