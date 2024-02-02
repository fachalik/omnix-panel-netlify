import React from 'react';
import { Skeleton, InputNumber, Checkbox } from 'antd';
import { palette } from '@/theme/themeConfig';
import { formatRupiah } from '@/utils/utilitys';

interface IProps {
  data: any;
  isLoading: boolean;
  isSuccess: boolean;
  getValue: any;
  watchData: any;
  setValue: any;
}

export const AddOnPackage: React.FC<IProps> = (props: IProps) => {
  const { data, isLoading, isSuccess, getValue, watchData, setValue } = props;

  const [dataAddOn, setDataAddOn] = React.useState<any>({});

  React.useEffect(() => {
    let isMount = true;

    if (isMount && data.length !== 0) {
      const groupedData = data.reduce((acc: any, item: any) => {
        const typeSchema = item?.item?.typeSchema?.toLowerCase();

        if (!acc[typeSchema]) {
          acc[typeSchema] = [];
        }

        acc[typeSchema].push(item);

        return acc;
      }, {});

      setDataAddOn(groupedData);
    }

    return () => {
      isMount = false;
    };
  }, [data]);

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

  const getValueInputNumber = (key: any, item: any): any => {
    const formValues = watchData();

    const updatedValues = [...(formValues[key] || [])];

    const itemIndex = updatedValues.findIndex((i) => i.name === item.name);

    if (itemIndex !== -1) {
      return updatedValues[itemIndex];
    } else {
      return {};
    }
  };

  const changeValueInputNumber = (key: any, item: any, e: any) => {
    const formValues = getValue();

    const updatedValues = [...(formValues[key] || [])];

    const itemIndex = updatedValues.findIndex((i) => i.name === item.name);

    if (itemIndex !== -1) {
      updatedValues[itemIndex]['quantity'] = e;
    }
    setValue(key, updatedValues);
  };

  const findMinMax = (item: any, name: string) => {
    let keyName = '';

    if (name.toLowerCase().indexOf('agent') > -1) {
      keyName = 'agent';
    }

    if (name.toLowerCase().indexOf('supervisor') > -1) {
      keyName = 'svp';
    }

    if (name.toLowerCase().indexOf('backroom') > -1) {
      keyName = 'backroom';
    }

    const key: string = Object.keys(item?.item).filter(
      (word) => word.toLowerCase().indexOf(keyName) > -1
    )[0];

    return item?.item[key];
  };

  if (!isLoading && isSuccess && Object.keys(dataAddOn).length !== 0)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.5em' }}>
        <p style={{ fontSize: 16, fontWeight: 700 }}>
          How many Paid users do I need?
        </p>
        <p style={{ fontSize: 13, fontWeight: 400 }}>
          Choose how many users can acess the Omnix Panel Paket 1 features.
        </p>
        {dataAddOn?.transaction && (
          <div
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
            <p
              style={{
                color: palette.primary.main,
                fontSize: 16,
                fontWeight: 600,
              }}
            >{`Transaction`}</p>
            <p style={{ fontSize: 13, fontWeight: 400 }}>
              Increase your included License Account for your integrations
              between your Omnix Panel Account and other services.
            </p>
            {dataAddOn?.transaction?.map((item: any, idx: number) => (
              <div
                key={`${idx}_transaction`}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '1em' }}
                >
                  <InputNumber
                    value={
                      getValueInputNumber('addon', {
                        id: item?.item?._id,
                        name: item?.item?.productName,
                        quantity: 1,
                        price:
                          item?.item?.salesPrice ?? item?.item?.productPrice,
                        type: `ADDON`,
                      })?.quantity ?? 1
                    }
                    onChange={(e: any) =>
                      changeValueInputNumber(
                        'addon',
                        {
                          id: item?.item?._id,
                          name: item?.item?.productName,
                          quantity: 1,
                          price:
                            item?.item?.salesPrice ?? item?.item?.productPrice,
                          type: `ADDON`,
                        },
                        e
                      )
                    }
                    min={item?.item?.minQuantity ?? 1}
                    max={item?.item?.maxQuantity ?? 5}
                    defaultValue={1}
                    disabled={
                      !checkedBox('addon', {
                        id: item?.item?._id,
                        name: item?.item?.productName,
                        quantity: 1,
                        price:
                          item?.item?.salesPrice ?? item?.item?.productPrice,
                        type: `ADDON`,
                      })
                    }
                  />

                  <p
                    style={{
                      color: palette.primary.main,
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >{`${item.item.productName}`}</p>
                  <p
                    style={{
                      color: palette.primary.main,
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    {formatRupiah(item.item.productPrice.toString(), 'Rp.')}
                  </p>
                </div>
                <Checkbox
                  checked={checkedBox('addon', {
                    id: item?.item?._id,
                    name: item?.item?.productName,
                    quantity: 1,
                    price: item?.item?.salesPrice ?? item?.item?.productPrice,
                    type: `ADDON`,
                  })}
                  onChange={() => {
                    handleCheckboxChange('addon', {
                      id: item?.item?._id,
                      name: item?.item?.productName,
                      quantity: 1,
                      price: item?.item?.salesPrice ?? item?.item?.productPrice,
                      type: `ADDON`,
                    });
                  }}
                />
              </div>
            ))}
          </div>
        )}
        {dataAddOn?.license_user && (
          <div
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
            <p
              style={{
                color: palette.primary.main,
                fontSize: 16,
                fontWeight: 600,
              }}
            >{`License User`}</p>

            <p style={{ fontSize: 13, fontWeight: 400 }}>
              Increase your included License Account for your integrations
              between your Omnix Panel Account and other services.
            </p>
            {dataAddOn?.license_user?.map((item: any, idx: number) => (
              <div
                key={`${idx}license_user`}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '1em' }}
                >
                  <InputNumber
                    value={
                      getValueInputNumber('addon', {
                        id: item?.item?._id,
                        name: item?.item?.productName,
                        quantity: 1,
                        price:
                          item?.item?.salesPrice ?? item?.item?.productPrice,
                        type: `ADDON`,
                        license: {
                          Agent: item?.item?.licenseAgent,
                          Backroom: item?.item?.licenseBackroom,
                          SVP: item?.item?.licenseSVP,
                        },
                      })?.quantity ?? 1
                    }
                    onChange={(e: any) =>
                      changeValueInputNumber(
                        'addon',
                        {
                          id: item?.item?._id,
                          name: item?.item?.productName,
                          quantity: 1,
                          price:
                            item?.item?.salesPrice ?? item?.item?.productPrice,
                          type: `ADDON`,
                          license: {
                            Agent: item?.item?.licenseAgent,
                            Backroom: item?.item?.licenseBackroom,
                            SVP: item?.item?.licenseSVP,
                          },
                        },
                        e
                      )
                    }
                    min={
                      findMinMax(item, item?.item?.productName ?? '')?.min ?? 1
                    }
                    max={
                      findMinMax(item, item?.item?.productName ?? '')?.min ?? 5
                    }
                    defaultValue={1}
                    disabled={
                      !checkedBox('addon', {
                        id: item?.item?._id,
                        name: item?.item?.productName,
                        quantity: 1,
                        price:
                          item?.item?.salesPrice ?? item?.item?.productPrice,
                        type: `ADDON`,
                        license: {
                          Agent: item?.item?.licenseAgent,
                          Backroom: item?.item?.licenseBackroom,
                          SVP: item?.item?.licenseSVP,
                        },
                      })
                    }
                  />

                  <p
                    style={{
                      color: palette.primary.main,
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >{`${item.item.productName}`}</p>
                  <p
                    style={{
                      color: palette.primary.main,
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    {formatRupiah(item.item.productPrice.toString(), 'Rp.')}
                  </p>
                </div>
                <Checkbox
                  checked={checkedBox('addon', {
                    id: item?.item?._id,
                    name: item?.item?.productName,
                    quantity: 1,
                    price: item?.item?.salesPrice ?? item?.item?.productPrice,
                    type: `ADDON`,
                    license: {
                      Agent: item?.item?.licenseAgent,
                      Backroom: item?.item?.licenseBackroom,
                      SVP: item?.item?.licenseSVP,
                    },
                  })}
                  onChange={() => {
                    handleCheckboxChange('addon', {
                      id: item?.item?._id,
                      name: item?.item?.productName,
                      quantity: 1,
                      price: item?.item?.salesPrice ?? item?.item?.productPrice,
                      type: `ADDON`,
                      license: {
                        Agent: item?.item?.licenseAgent,
                        Backroom: item?.item?.licenseBackroom,
                        SVP: item?.item?.licenseSVP,
                      },
                    });
                  }}
                />
              </div>
            ))}
          </div>
        )}
        {dataAddOn?.license_general && (
          <div
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
            <p
              style={{
                color: palette.primary.main,
                fontSize: 16,
                fontWeight: 600,
              }}
            >{`License General`}</p>
            <p style={{ fontSize: 13, fontWeight: 400 }}>
              Increase your included License Account for your integrations
              between your Omnix Panel Account and other services.
            </p>
            {dataAddOn?.license_general?.map((item: any, idx: number) => (
              <div
                key={`${idx}license_general`}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '1em' }}
                >
                  <InputNumber
                    value={
                      getValueInputNumber('addon', {
                        id: item?.item?._id,
                        name: item?.item?.productName,
                        quantity: 1,
                        price:
                          item?.item?.salesPrice ?? item?.item?.productPrice,
                        type: `ADDON`,
                      })?.quantity ?? 1
                    }
                    onChange={(e: any) =>
                      changeValueInputNumber(
                        'addon',
                        {
                          id: item?.item?._id,
                          name: item?.item?.productName,
                          quantity: 1,
                          price:
                            item?.item?.salesPrice ?? item?.item?.productPrice,
                          type: `ADDON`,
                        },
                        e
                      )
                    }
                    min={item?.item?.minQuantity ?? 1}
                    max={item?.item?.maxQuantity ?? 5}
                    defaultValue={1}
                    disabled={
                      !checkedBox('addon', {
                        id: item?.item?._id,
                        name: item?.item?.productName,
                        quantity: 1,
                        price:
                          item?.item?.salesPrice ?? item?.item?.productPrice,
                        type: `ADDON`,
                      })
                    }
                  />

                  <p
                    style={{
                      color: palette.primary.main,
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >{`${item.item.productName}`}</p>
                  <p
                    style={{
                      color: palette.primary.main,
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    {formatRupiah(item.item.productPrice.toString(), 'Rp.')}
                  </p>
                </div>
                <Checkbox
                  checked={checkedBox('addon', {
                    id: item?.item?._id,
                    name: item?.item?.productName,
                    quantity: 1,
                    price: item?.item?.salesPrice ?? item?.item?.productPrice,
                    type: `ADDON`,
                  })}
                  onChange={() => {
                    handleCheckboxChange('addon', {
                      id: item?.item?._id,
                      name: item?.item?.productName,
                      quantity: 1,
                      price: item?.item?.salesPrice ?? item?.item?.productPrice,
                      type: `ADDON`,
                    });
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  return <Skeleton />;
};
