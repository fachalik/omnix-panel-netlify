import React from 'react';
import { useOrderStore } from '@/store';
import { HandlePlan } from '@/utils/utilitys';

interface IProps {
  children: React.ReactNode;
}

export const BottomTotalPayment: React.FC<IProps> = ({ children }) => {
  const [total, setTotal] = React.useState<number>(0);
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
            <HandlePlan plan={plan} sum={total} />
          </p>
        </div>

        {children}
      </div>
    </div>
  );
};
