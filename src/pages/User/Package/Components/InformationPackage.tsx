import React from 'react';
import { Skeleton } from 'antd';
import { palette } from '@/theme/themeConfig';

import { channel } from '@/pages/Admin/BusinessSchema/models/listChannel';

interface IProps {
  data: any;
  isLoading: boolean;
  isSuccess: boolean;
  getValue: any;
  watchData: any;
  setValue: any;
}

export const InformationPackage: React.FC<IProps> = (props: IProps) => {
  const { data, isLoading, isSuccess } = props;

  if (!isLoading && isSuccess && data)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.5em' }}>
        <p style={{ fontSize: 16, fontWeight: 700 }}>
          How many Paid users do I need?
        </p>
        <p style={{ fontSize: 13, fontWeight: 400 }}>
          Choose how many users can acess the Omnix Panel Paket 1 features.
        </p>
        <div style={{ display: 'flex', gap: '.5em', alignItems: 'center' }}>
          <i className="ri-user-3-line" style={{ fontSize: '14px' }} />
          <p
            style={{
              fontSize: '13px',
              color: palette.primary.main,
              fontWeight: 500,
              textTransform: 'capitalize',
            }}
          >
            {`${data[0]?.licenseAgent[0]?.maxQuantity ?? 0} License Agent`}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '.5em', alignItems: 'center' }}>
          <i className="ri-user-3-line" style={{ fontSize: '14px' }} />
          <p
            style={{
              fontSize: '13px',
              color: palette.primary.main,
              fontWeight: 500,
              textTransform: 'capitalize',
            }}
          >
            {`${data[0]?.licenseSVP[0]?.maxQuantity ?? 0} License SPV`}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '.5em', alignItems: 'center' }}>
          <i className="ri-tv-2-line" style={{ fontSize: '14px' }} />
          <p
            style={{
              fontSize: '13px',
              color: palette.primary.main,
              fontWeight: 500,
              textTransform: 'capitalize',
            }}
          >
            {`${
              data[0]?.licenseBackroom[0]?.maxQuantity ?? 0
            } License Backroom`}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '.5em', alignItems: 'center' }}>
          <i
            className="ri-tv-2-line"
            style={{ fontSize: '14px', color: palette.primary.main }}
          />
          <p
            style={{
              fontSize: '13px',
              color: palette.primary.main,
              fontWeight: 500,
              textTransform: 'capitalize',
            }}
          >{`License Channel`}</p>
        </div>
        <ul
          style={{
            marginLeft: '2.5em',
            fontSize: '13px',
            fontWeight: 500,
            color: palette.primary.main,
          }}
        >
          {channel
            .filter((item) => data[0]?.channel.includes(item.value))
            .map((item: any, idx: number) => (
              <li key={idx}>{`${item.label} - ${
                item.channel === 'digital' ? 'Digital' : 'Voice'
              }`}</li>
            ))}
        </ul>
      </div>
    );
  return <Skeleton />;
};
