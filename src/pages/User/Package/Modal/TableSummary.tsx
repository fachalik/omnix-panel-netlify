import React from 'react';
import { Table, Typography, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useOrderStore } from '@/store';
import { StoreOrder } from '@/store/order';
import { HandlePlan } from '@/utils/utilitys';

import { BottomTotalPayment } from './BottomTotalPayment';

interface IProps {
  current: number;
  steps: any;
  next: () => void;
  prev: () => void;
  handleClose: () => void;
  setCurrent: any;
}

export const TableSummary: React.FC<IProps> = (props: IProps) => {
  const { checkout, plan } = useOrderStore((state) => state);

  const [_total, setTotal] = React.useState<number>(0);
  const { next, handleClose } = props;

  React.useEffect(() => {
    let isMount = true;

    if (isMount && checkout) {
      const totalPrice = checkout.reduce((total: any, item: any) => {
        return total + item.quantity * item.price;
      }, 0);

      setTotal(totalPrice + Math.ceil(totalPrice * 0.11));
    }

    return () => {
      isMount = false;
    };
  }, [checkout]);

  const columns: ColumnsType<StoreOrder> = [
    {
      title: 'item',
      dataIndex: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (_, record: any) => {
        return (
          <p>
            <HandlePlan plan={plan} sum={record?.price} />
          </p>
        );
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      render: (_, record: any) => {
        return (
          <p>
            <HandlePlan plan={plan} sum={record?.price * record?.quantity} />
          </p>
        );
      },
    },
  ];

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <Table
        style={{ padding: '2em 1em' }}
        columns={columns}
        dataSource={checkout}
        pagination={false}
        bordered
        summary={(pageData) => {
          let ppn = 0;
          let total = 0;

          pageData.forEach(({ price, quantity }) => {
            ppn += Math.ceil(price * quantity * 0.11);
            total += price * quantity;
          });

          return (
            <>
              <Table.Summary.Row style={{ width: '100%', textAlign: 'end' }}>
                <Table.Summary.Cell index={0}>
                  <p style={{ textAlign: 'start' }}>{`Sub Total`}</p>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} colSpan={3}>
                  <Typography.Text style={{ fontWeight: 600 }}>
                    {/* {formatRupiahV2(total.toString())} */}
                    <HandlePlan plan={plan} sum={total} />
                  </Typography.Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row style={{ width: '100%', textAlign: 'end' }}>
                <Table.Summary.Cell index={0}>
                  <p style={{ textAlign: 'start' }}>{`ppn ( 11% )`}</p>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} colSpan={3}>
                  <Typography.Text style={{ fontWeight: 600 }}>
                    {/* {formatRupiahV2(ppn.toString())} */}
                    <HandlePlan plan={plan} sum={ppn} />
                  </Typography.Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />

      <BottomTotalPayment>
        <div>
          <Button
            type="text"
            style={{ margin: '0 8px' }}
            onClick={() => handleClose()}
          >
            Cancel
          </Button>

          <Button type="primary" onClick={() => next()}>
            Check Out
          </Button>
        </div>
      </BottomTotalPayment>
    </div>
  );
};
