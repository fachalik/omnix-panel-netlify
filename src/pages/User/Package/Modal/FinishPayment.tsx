import React from 'react';
import { Button, Row, Col, Table, Typography } from 'antd';
import { useOrderStore } from '@/store';
import { timeout, formatRupiahV2 } from '@/utils/utilitys';
import type { ColumnsType } from 'antd/es/table';
import { StoreOrder } from '@/store/order';

interface IProps {
  current: number;
  steps: any;
  next: () => void;
  prev: () => void;
  handleClose: () => void;
  setCurrent: any;
}

export const FinishPayment: React.FC<IProps> = (props: IProps) => {
  const [_total, setTotal] = React.useState<number>(0);
  const { handleClose, setCurrent } = props;
  const { checkout, plan } = useOrderStore((state) => state);

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

  const HandlePlan = ({ plan, sum }: { plan: string; sum: number }) => {
    switch (plan) {
      case 'monthly':
        return formatRupiahV2(sum.toString());
      case 'annually':
        return formatRupiahV2((sum * 12).toString());
      default:
        return formatRupiahV2(sum.toString());
    }
  };

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
      <Row style={{ padding: '2em 1em' }} gutter={[16, 16]}>
        <Col xs={24} md={24}>
          <div id={'snap-container'} />
        </Col>
        {/* <Col xs={24} md={12}>
          <Table
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
                  <Table.Summary.Row
                    style={{ width: '100%', textAlign: 'end' }}
                  >
                    <Table.Summary.Cell index={0}>
                      <p
                        style={{ textAlign: 'start', fontWeight: 600 }}
                      >{`Sub Total`}</p>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} colSpan={3}>
                      <Typography.Text style={{ fontWeight: 600 }}>
                        <HandlePlan plan={plan} sum={total} />
                      </Typography.Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row
                    style={{ width: '100%', textAlign: 'end' }}
                  >
                    <Table.Summary.Cell index={0}>
                      <p
                        style={{ textAlign: 'start', fontWeight: 600 }}
                      >{`ppn ( 11% )`}</p>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} colSpan={3}>
                      <Typography.Text style={{ fontWeight: 600 }}>
                        <HandlePlan plan={plan} sum={ppn} />
                      </Typography.Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row
                    style={{ width: '100%', textAlign: 'end' }}
                  >
                    <Table.Summary.Cell index={0}>
                      <p
                        style={{ textAlign: 'start', fontWeight: 600 }}
                      >{`Total`}</p>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} colSpan={3}>
                      <Typography.Text style={{ fontWeight: 600 }}>
                        <HandlePlan plan={plan} sum={ppn + total} />
                      </Typography.Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          />
        </Col> */}
      </Row>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1em' }}>
        <Button
          type="primary"
          onClick={async () => {
            handleClose();
            await timeout(500);
            await setCurrent(0);
          }}
        >
          Close
        </Button>
      </div>
    </div>
  );
};
