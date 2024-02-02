import React from 'react';
import { formatRupiah } from '@/utils/utilitys';
import { Row, Col, Checkbox, Form } from 'antd';

interface IProps {
  itemPackages: any;
  setSelectedItems: (item: any) => any;
  selectedItems: any;
  getValue: any;
  watchData: any;
  setValue: any;
  reset: any;
  setWFields: any;
  setInitData: any;
}

export const SelectPackage: React.FC<IProps> = (props: IProps) => {
  const {
    itemPackages,
    selectedItems,
    setSelectedItems,
    setValue,
    reset,
    setWFields,
    setInitData,
  } = props;

  React.useEffect(() => {
    let isMount = true;

    if (isMount && selectedItems) {
      if (selectedItems?.item?.productName?.toLowerCase() !== 'custom') {
        setValue('package', {
          id: selectedItems?.item?._id,
          name: selectedItems?.item?.productName,
          quantity: 1,
          price: selectedItems?.item?.salesPrice,
          type: selectedItems?.item?.typeDetails,
          license: {
            Agent: selectedItems?.item?.licenseAgent,
            Backroom: selectedItems?.item?.licenseBackroom,
            SVP: selectedItems?.item?.licenseSVP,
          },
        });
      }
    }

    return () => {
      isMount = false;
    };
  }, [selectedItems]);

  const handleOnClickData = async (item: any) => {
    console.log('item', item);
    if (item?.item?.productName.toLowerCase() !== 'custom') {
      let resultObject: any = {};

      await item['addOn'].forEach((value: any) => {
        resultObject[`package_addon_${value.channel}`] = [];
      });

      const fields = {
        package: {
          id: item?.item?._id,
          name: item?.item?.productName,
          quantity: 1,
          price: item?.item?.salesPrice,
          type: item?.item?.typeDetails,
        },
        alacarte: [],
        addon: [],
        ...resultObject,
        alacarte_addon: [],
      };

      const resultArray = Object.keys(fields).filter((value) => {
        return (
          value !== null && (Array.isArray(value) ? value.length > 0 : true)
        );
      });

      setWFields(resultArray);

      reset(fields);
      setInitData(fields);

      await setValue('package', {
        id: item?.item?._id,
        name: item?.item?.productName,
        quantity: 1,
        price: item?.item?.salesPrice,
        type: item?.item?.typeDetails,
      });
    } else {
      setValue('package', null);
    }
    await setSelectedItems(item);
  };

  return (
    <Row
      style={{
        width: '100%',
        gap: 42,
      }}
      gutter={[16, 16]}
    >
      {itemPackages &&
        itemPackages.map((item: any, idx: number) => (
          <Col
            key={idx}
            span={itemPackages.length <= 4 ? 24 / itemPackages.length - 1 : 7}
            lg={itemPackages.length <= 4 ? 24 / itemPackages.length - 1 : 7}
            xs={24}
            sm={24}
            md={24}
            onClick={async () => {
              if (item?.item?._id !== selectedItems?.item?._id) {
                await handleOnClickData(item);
              }
            }}
            style={{
              cursor:
                item?.item?._id !== selectedItems?.item?._id
                  ? 'pointer'
                  : 'no-drop',
              borderRadius: '6px',
              backgroundColor:
                selectedItems?.item?.productName === item.item.productName
                  ? '#19336B'
                  : '#19336b1a',
              height: '84px',
              padding: '16px',
            }}
          >
            <Form.Item name="package">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <p
                  style={{
                    color:
                      selectedItems?.item?.productName !== item.item.productName
                        ? '#19336B'
                        : 'white',
                    fontSize: '15px',
                    fontWeight: 800,
                  }}
                >
                  {item.item.productName}
                </p>
                <Checkbox
                  checked={
                    selectedItems?.item?.productName === item.item.productName
                  }
                />
              </div>
              {item.item.productName.toLowerCase() !== 'custom' && (
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color:
                      selectedItems?.item?.productName !== item.item.productName
                        ? '#19336B'
                        : 'white',
                  }}
                >
                  {`${formatRupiah(
                    item.item?.salesPrice?.toString() ??
                      item.item?.productPrice?.toString(),
                    'Rp.'
                  )} / month`}
                </p>
              )}
              {item.item.productName.toLowerCase() === 'custom' && (
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color:
                      selectedItems?.item?.productName !== item.item.productName
                        ? '#19336B'
                        : 'white',
                  }}
                >
                  Choose your needs
                </p>
              )}
            </Form.Item>
          </Col>
        ))}
    </Row>
  );
};
