import React from 'react';
import { Skeleton, Checkbox, Radio, Space } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { palette } from '@/theme/themeConfig';
import { formatRupiah } from '@/utils/utilitys';

interface IProps {
  data: any;
  isLoading: boolean;
  isSuccess: boolean;
}

export const InformationPackageAddOn: React.FC<IProps> = (props: IProps) => {
  const { data, isLoading, isSuccess } = props;

  const onChangeRadio = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
  };

  if (!isLoading && isSuccess && !data) {
    return;
  }

  if (!isLoading && isSuccess && data) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.5em' }}>
        <p style={{ fontSize: 16, fontWeight: 700 }}>Channel Add On *</p>
        <p style={{ fontSize: 13, fontWeight: 400 }}>
          Customize and enhance your plan with additional features.
        </p>
        {data.map((item: any, idx: number) => (
          <div
            key={`${idx}_addon`}
            style={{
              marginTop: '1.5em',
              border: '1px solid #BAC2D3',
              backgroundColor: 'rgba(25, 51, 107, 0.02);',
              borderRadius: 6,
              padding: '16px 21px',
              display: 'flex',
              flexDirection: 'column',
              gap: '.5em',
            }}
          >
            <p
              style={{
                color: palette.primary.main,
                fontSize: 16,
                fontWeight: 600,
              }}
            >{`Channel ${item.channel}`}</p>
            <p style={{ fontSize: 13, fontWeight: 400 }}>
              Increase your included License Account for your integrations
              between your Omnix Panel Account and other services.
            </p>
            {item.addOnType === 'single-selection' &&
              item.detail.map((detail: any, idx2: number) => (
                <div
                  key={`detail_single_${idx2}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '.5em' }}
                >
                  <Checkbox />
                  <p
                    style={{
                      color: palette.primary.main,
                      fontSize: 15,
                      fontWeight: 600,
                    }}
                  >
                    {detail.name}
                  </p>
                  <p
                    style={{
                      color: palette.primary.main,
                      fontSize: 15,
                      fontWeight: 600,
                    }}
                  >
                    {formatRupiah(detail.price.toString(), 'Rp.')}
                  </p>
                </div>
              ))}

            <Radio.Group onChange={onChangeRadio} value={1}>
              <Space direction="vertical">
                {item.addOnType === 'multiple-selection' &&
                  item.detail.map((detail: any, idx3: number) => (
                    <Radio key={`detail_multiple_${idx3}`} value={detail.name}>
                      {detail.name}
                    </Radio>
                  ))}
              </Space>
            </Radio.Group>
          </div>
        ))}
      </div>
    );
  }
  return <Skeleton />;
};
