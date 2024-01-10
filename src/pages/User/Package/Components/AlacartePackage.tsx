import React from 'react';
import { Skeleton, Checkbox, Radio, Space, Form } from 'antd';
import { palette } from '@/theme/themeConfig';
import { formatRupiah } from '@/utils/utilitys';
import type { RadioChangeEvent } from 'antd';
import _ from 'lodash';

import { channel } from '@/pages/Admin/BusinessSchema/models/listChannel';

interface IProps {
  data: any;
  isLoading: boolean;
  isSuccess: boolean;
  getValue: any;
  watchData: any;
  setValue: any;
  control: any;
}

export const AlacartePackage: React.FC<IProps> = (props: IProps) => {
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

  if (!isLoading && isSuccess && Object.keys(data).length !== 0)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.5em' }}>
        <p style={{ fontSize: 16, fontWeight: 700 }}>
          How many Paid users do I need?
        </p>
        <p style={{ fontSize: 13, fontWeight: 400 }}>
          Choose how many users can acess the Omnix Panel Paket 1 features.
        </p>
        {data?.map((item: any, idx: number) => (
          <div
            key={`${idx}_alacarte`}
            style={{
              marginTop: '1.5em',
              border: '1px solid #BAC2D3',
              backgroundColor: 'rgba(25, 51, 107, 0.02)',
              borderRadius: 6,
              padding: '16px 21px',
              display: 'flex',
              flexDirection: 'column',
              gap: '.5em',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.5em',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '1em' }}
                >
                  <p
                    style={{
                      color: palette.primary.main,
                      fontSize: 16,
                      fontWeight: 600,
                    }}
                  >
                    {item.item.productName}
                  </p>
                </div>
                <p style={{ fontSize: 13, fontWeight: 400 }}>
                  Increase your included License Account for your integrations
                  between your Omnix Panel Account and other services.
                </p>
                <p
                  style={{
                    color: palette.primary.main,
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {formatRupiah(item.item.productPrice.toString(), 'Rp.')}
                </p>

                {item.item?.licenseAgent.length !== 0 && (
                  <div
                    style={{
                      display: 'flex',
                      gap: '.5em',
                      alignItems: 'center',
                    }}
                  >
                    <i
                      className="ri-user-3-line"
                      style={{ fontSize: '14px' }}
                    />
                    <p
                      style={{
                        fontSize: '13px',
                        color: palette.primary.main,
                        fontWeight: 500,
                        textTransform: 'capitalize',
                      }}
                    >
                      {`${
                        item.item?.licenseAgent[0]?.maxQuantity ?? 0
                      } License Agent`}
                    </p>
                  </div>
                )}

                {item?.item?.licenseSVP.length !== 0 && (
                  <div
                    style={{
                      display: 'flex',
                      gap: '.5em',
                      alignItems: 'center',
                    }}
                  >
                    <i
                      className="ri-user-3-line"
                      style={{ fontSize: '14px' }}
                    />
                    <p
                      style={{
                        fontSize: '13px',
                        color: palette.primary.main,
                        fontWeight: 500,
                        textTransform: 'capitalize',
                      }}
                    >
                      {`${
                        item?.item?.licenseSVP[0]?.maxQuantity ?? 0
                      } License SPV`}
                    </p>
                  </div>
                )}

                {item?.item?.licenseBackroom.length !== 0 && (
                  <div
                    style={{
                      display: 'flex',
                      gap: '.5em',
                      alignItems: 'center',
                    }}
                  >
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
                        item?.item?.licenseBackroom[0]?.maxQuantity ?? 0
                      } License Backroom`}
                    </p>
                  </div>
                )}
                {item?.item?.channel.length !== 0 && (
                  <>
                    <div
                      style={{
                        display: 'flex',
                        gap: '.5em',
                        alignItems: 'center',
                      }}
                    >
                      <i
                        className="ri-tv-2-line"
                        style={{
                          fontSize: '14px',
                          color: palette.primary.main,
                        }}
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
                        .filter((val: any) =>
                          item?.item?.channel?.includes(val?.value)
                        )
                        .map((item: any, idx: number) => {
                          return (
                            <li key={idx}>{`${item.label} - ${
                              item.channel === 'digital' ? 'Digital' : 'Voice'
                            }`}</li>
                          );
                        })}
                    </ul>
                  </>
                )}
              </div>

              {/* {JSON.stringify(item.item)} */}
              <Checkbox
                checked={checkedBox('alacarte', {
                  id: item?.item?._id,
                  name: item?.item?.productName,
                  quantity: 1,
                  price: item?.item?.productPrice,
                  type: `ADDON_ALACARTE`,
                })}
                onChange={() => {
                  handleCheckboxChange('alacarte', {
                    id: item?.item?._id,
                    name: item?.item?.productName,
                    quantity: 1,
                    price: item?.item?.productPrice,
                    type: `ADDON_ALACARTE`,
                  });
                }}
              />
            </div>

            {checkedBox('alacarte', {
              id: item?.item?._id,
              name: item?.item?.productName,
              quantity: 1,
              price: item?.item?.productPrice,
              type: `ADDON_ALACARTE`,
            }) &&
              item.addOn.length !== 0 && (
                <>
                  <p
                    style={{
                      marginTop: '1em',
                      color: palette.primary.main,
                      fontSize: 16,
                      fontWeight: 600,
                    }}
                  >
                    Add On
                  </p>
                </>
              )}

            {checkedBox('alacarte', {
              id: item?.item?._id,
              name: item?.item?.productName,
              quantity: 1,
              price: item?.item?.productPrice,
              type: `ADDON_ALACARTE`,
            }) &&
              item.addOn.length !== 0 &&
              item.addOn.map((item: any, idx: number) => (
                <Form.Item
                  name={`alacarte_addon${item._id}`}
                  rules={
                    item.pricingRequired === 1
                      ? [{ required: true, message: 'Addon is required!' }]
                      : []
                  }
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                    key={`${idx}_ALACARTE_ADDON`}
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
                            checked={checkedBox('alacarte_addon', {
                              id: item?.item?._id,
                              name: detail?.name,
                              quantity: 1,
                              price: detail?.price,
                              type: `ALACARTE_ADDON`,
                            })}
                            onChange={() => {
                              handleCheckboxChange('alacarte_addon', {
                                id: item?.item?._id,
                                name: detail?.name,
                                quantity: 1,
                                price: detail?.price,
                                type: `ALACARTE_ADDON`,
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
                              id: item?.item?._id,
                              channel: item?.channel,
                              name: detail?.name,
                              quantity: 1,
                              price: detail?.price,
                              type: `ADDON_PACKAGE`,
                            }}
                            checked={_.isEqual(
                              getValue('package_addon').find(
                                (i: any) => i.channel === item.channel
                              ),
                              {
                                id: item?.item?._id,
                                channel: item?.channel,
                                name: detail?.name,
                                quantity: 1,
                                price: detail?.price,
                                type: `ADDON_PACKAGE`,
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
                  </div>
                </Form.Item>
              ))}
          </div>
        ))}
      </div>
    );
  return <Skeleton />;
};
