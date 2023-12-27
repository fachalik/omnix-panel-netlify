import React from 'react';
import { Button } from 'antd';
import { useOrderStore } from '@/store';
import { formatRupiah, timeout } from '@/utils/utilitys';

interface IProps {
  current: number;
  steps: any;
  next: () => void;
  prev: () => void;
  handleClose: () => void;
  setCurrent: any;
}

export const PaymentMethod: React.FC<IProps> = (props: IProps) => {
  const [total, setTotal] = React.useState<number>(0);
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
            type="primary"
            onClick={async () => {
              handleClose();
              await timeout(500);
              await setCurrent(0);
            }}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};
