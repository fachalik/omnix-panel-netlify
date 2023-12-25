import { Row, Col, Checkbox } from 'antd';
import React from 'react';

interface IProps {
  itemPackages: any;
  setSelectedItems: (item: any) => any;
  selectedItems: any;
}

export const SelectPackage: React.FC<IProps> = (props: IProps) => {
  const { itemPackages, selectedItems, setSelectedItems } = props;
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
            span={itemPackages.length <= 4 ? 24 / itemPackages.length - 1 : 6}
            xs={24}
            sm={24}
            md={itemPackages.length <= 4 ? 24 / itemPackages.length - 1 : 6}
            onClick={() => setSelectedItems(item)}
            style={{
              cursor: 'pointer',
              borderRadius: '6px',
              backgroundColor:
                selectedItems.productName === item.productName
                  ? '#19336B'
                  : '#19336b1a',
              height: '84px',
              padding: '16px',
            }}
            key={idx}
          >
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
                    selectedItems.productName !== item.productName
                      ? '#19336B'
                      : 'white',
                  fontSize: '15px',
                  fontWeight: 800,
                }}
              >
                {item.productName}
              </p>
              <Checkbox
                checked={selectedItems.productName === item.productName}
              />
            </div>
          </Col>
        ))}
    </Row>
  );
};
