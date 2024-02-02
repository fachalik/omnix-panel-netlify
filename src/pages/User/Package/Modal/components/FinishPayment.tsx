import React from 'react';
import { Button, Row, Col } from 'antd';
import { useOrderStore } from '@/store';
import { timeout } from '@/utils/utilitys';

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
      <Row style={{ padding: '2em 1em' }} gutter={[16, 16]}>
        <Col xs={24} md={24}>
          <div id={'snap-container'} />
        </Col>
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
