import React from 'react';
import { formatRupiah } from '@/utils/utilitys';
import { Row, Col, Checkbox, Form } from 'antd';
import { useOrderStore } from '@/store';

interface IProps {
  itemPackages: any;
  setSelectedItems: (item: any) => any;
  selectedItems: any;
  getValue: any;
  watchData: any;
  setValue: any;
}

export const SelectPackage: React.FC<IProps> = (props: IProps) => {
  const { setPackage } = useOrderStore((state) => state);
  const { itemPackages, selectedItems, setSelectedItems, setValue } = props;

  React.useEffect(() => {
    let isMount = true;

    if (isMount && selectedItems) {
      if (selectedItems?.item?.productName?.toLowerCase() !== 'custom') {
        setPackage({
          id: selectedItems?.item?._id,
          name: selectedItems?.item?.productName,
          quantity: 1,
          price: selectedItems?.item?.salesPrice,
          type: selectedItems?.item?.typeDetails,
        });
        setValue('package', {
          id: selectedItems?.item?._id,
          name: selectedItems?.item?.productName,
          quantity: 1,
          price: selectedItems?.item?.salesPrice,
          type: selectedItems?.item?.typeDetails,
        });
      } else {
        setPackage(null);
      }
    }

    return () => {
      isMount = false;
    };
  }, [selectedItems]);

  return (
    <Row
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      gutter={[12, 12]}
    >
      {itemPackages &&
        itemPackages.map((item: any, idx: number) => (
          <Col
            key={idx}
            span={itemPackages.length <= 4 ? 24 / itemPackages.length - 1 : 6}
            xs={24}
            sm={24}
            md={itemPackages.length <= 4 ? 24 / itemPackages.length - 1 : 6}
            onClick={async () => {
              if (item?.item?.productName.toLowerCase() !== 'custom') {
                setValue('package', {
                  id: item?.item?._id,
                  name: item?.item?.productName,
                  quantity: 1,
                  price: item?.item?.salesPrice,
                  type: item?.item?.typeDetails,
                });
                setValue('alacarte', []);
                setValue('addon', []);
                setValue('package_addon', []);
                setValue('alacarte_addon', []);
              } else {
                setValue('package', null);
              }

              await setSelectedItems(item);
            }}
            style={{
              cursor: 'pointer',
              borderRadius: '6px',
              backgroundColor:
                selectedItems.item.productName === item.item.productName
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
                      selectedItems.item.productName !== item.item.productName
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
                    selectedItems.item.productName === item.item.productName
                  }
                />
              </div>
              {item.item.productName.toLowerCase() !== 'custom' && (
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color:
                      selectedItems.item.productName !== item.item.productName
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
                      selectedItems.item.productName !== item.item.productName
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
