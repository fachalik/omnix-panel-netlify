import React from 'react';
import { Skeleton, Checkbox, Radio, Form, Space } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { palette } from '@/theme/themeConfig';
import { formatRupiah } from '@/utils/utilitys';
import _ from 'lodash';
// import { Controller } from 'react-hook-form';

interface IProps {
  data: any;
  isLoading: boolean;
  isSuccess: boolean;
  getValue: any;
  watchData: any;
  setValue: any;
  control: any;
}

export const InformationPackageAddOn: React.FC<IProps> = (props: IProps) => {
  const { data, isLoading, isSuccess, getValue, watchData, setValue } = props;

  const onChangeRadio = (e: RadioChangeEvent, key: any) => {
    const formValues = getValue();

    const updatedValues = [...formValues[key]] || [];

    const itemIndex = updatedValues.findIndex(
      (i) => i.channel === e.target.value.channel
    );

    if (itemIndex !== -1) {
      updatedValues.splice(itemIndex, 1);
      updatedValues.push(e.target.value);
    } else {
      updatedValues.push(e.target.value);
    }
    setValue(key, updatedValues);
  };

  const handleCheckboxChange = (key: any, value: any) => {
    const formValues = getValue();

    const updatedValues = [...formValues[key]] || [];

    const itemIndex = updatedValues.findIndex((i) => i.name === value.name);

    if (itemIndex !== -1) {
      updatedValues.splice(itemIndex, 1);
    } else {
      updatedValues.push(value);
    }
    setValue(key, updatedValues);
  };

  const checkedBox = (key: any, item: any): boolean => {
    const formValues = watchData();

    const updatedValues = [...(formValues[key] || [])];

    const itemIndex = updatedValues.findIndex((i) => i.name === item.name);

    return itemIndex !== -1;
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
              backgroundColor: '#19336b1a',
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

            <Form.Item
              name={`package_addon_${item._id}`}
              rules={
                item.pricingRequired === 1
                  ? [{ required: true, message: 'Addon is required!' }]
                  : []
              }
            >
              {item.addOnType !== 'single-selection' &&
                item.detail.map((detail: any, idx2: number) => (
                  <div
                    key={`detail_single_${idx2}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '.5em',
                    }}
                  >
                    <Checkbox
                      checked={checkedBox('package_addon', {
                        id: item?._id,
                        name: detail?.name,
                        quantity: 1,
                        price: detail?.price,
                        type: `PACKAGE_ADDON`,
                      })}
                      onChange={() => {
                        handleCheckboxChange('package_addon', {
                          id: item?._id,
                          name: detail?.name,
                          quantity: 1,
                          price: detail?.price,
                          type: `PACKAGE_ADDON`,
                        });
                      }}
                    />
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

              <Space direction="vertical">
                {item.addOnType === 'single-selection' &&
                  item.detail.map((detail: any, idx3: number) => (
                    <Radio
                      key={`detail_multiple_${idx3}`}
                      onChange={(e) => {
                        onChangeRadio(e, 'package_addon');
                      }}
                      value={{
                        id: item?._id,
                        channel: item?.channel,
                        name: detail?.name,
                        quantity: 1,
                        price: detail?.price,
                        type: `PACKAGE_ADDON`,
                      }}
                      checked={_.isEqual(
                        getValue('package_addon').find(
                          (i: any) => i.channel === item.channel
                        ),
                        {
                          id: item?._id,
                          channel: item?.channel,
                          name: detail?.name,
                          quantity: 1,
                          price: detail?.price,
                          type: `PACKAGE_ADDON`,
                        }
                      )}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '.5em',
                        }}
                      >
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
                    </Radio>
                  ))}
              </Space>
            </Form.Item>
          </div>
        ))}
      </div>
    );
  }
  return <Skeleton />;
};
