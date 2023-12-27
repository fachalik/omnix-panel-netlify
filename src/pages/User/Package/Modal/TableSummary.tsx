import React from 'react';
import { Table, Typography, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useOrderStore } from '@/store';
import { StoreOrder } from '@/store/order';
import { formatRupiah } from '@/utils/utilitys';

const columns: ColumnsType<StoreOrder> = [
  {
    title: 'item',
    dataIndex: 'name',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    render: (_, record: any) => {
      return <p>{formatRupiah((record?.price).toString(), 'Rp.')}</p>;
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
          {formatRupiah((record?.price * record?.quantity).toString(), 'Rp.')}
        </p>
      );
    },
  },
];

interface IProps {
  current: number;
  steps: any;
  next: () => void;
  prev: () => void;
  handleClose: () => void;
  setCurrent: any;
}

export const TableSummary: React.FC<IProps> = (props: IProps) => {
  const [total, setTotal] = React.useState<number>(0);
  const { next, handleClose } = props;
  const { checkout } = useOrderStore((state) => state);

  React.useEffect(() => {
    let isMount = true;

    if (isMount && checkout) {
      const totalPrice = checkout.reduce((total: any, item: any) => {
        return total + item.quantity * item.price;
      }, 0);

      setTotal(totalPrice + totalPrice * 0.11);
    }

    return () => {
      isMount = false;
    };
  }, [checkout]);

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
            ppn += price * quantity * 0.11;
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
                    {formatRupiah(total.toString(), 'Rp.')}
                  </Typography.Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row style={{ width: '100%', textAlign: 'end' }}>
                <Table.Summary.Cell index={0}>
                  <p style={{ textAlign: 'start' }}>{`ppn ( 11% )`}</p>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} colSpan={3}>
                  <Typography.Text style={{ fontWeight: 600 }}>
                    {formatRupiah(ppn.toString(), 'Rp.')}
                  </Typography.Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
      <div
        style={{
          zIndex: '99',
          borderRadius: '8px',
          padding: '1em',
          backgroundColor: 'white',
          position: 'sticky',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bottom: '0',
          height: '10%',
          strokeWidth: '1px',
          stroke: 'var(--Neutral-50, #D9D9D9)',
          filter: 'drop-shadow(10px 0px 20px rgba(0, 0, 0, 0.15))',
        }}
      >
        <div>
          <p style={{ fontSize: 13, fontWeight: 600 }}>Total Payment</p>
          <p style={{ fontSize: 18, fontWeight: 700 }}>
            {formatRupiah(total.toString(), 'Rp.')}
          </p>
        </div>

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
      </div>
    </div>
  );
};
