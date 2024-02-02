import React from 'react';
import { useOrderStore } from '@/store';
import { HandlePlan } from '@/utils/utilitys';
import { Typography } from 'antd';

import { ArrowRightOutlined } from '@ant-design/icons';

interface IProps {
  children: React.ReactNode;
}

export const BottomTotalPaymentChangePlan: React.FC<IProps> = ({
  children,
}) => {
  const [total, setTotal] = React.useState<number>(0);
  const [totalLastOrder, setTotalLastOrder] = React.useState<number>(0);
  const { checkout, plan, changePlan } = useOrderStore((state) => state);

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

  React.useEffect(() => {
    if (changePlan?.productsDetail) {
      const data: any = changePlan?.productsDetail.filter(
        (item: any) => item.type !== 'TAX'
      );

      const totalPriceLastOrder = data.reduce((total: any, item: any) => {
        return total + item.quantity * item.price;
      }, 0);

      setTotalLastOrder(
        totalPriceLastOrder + Math.ceil(totalPriceLastOrder * 0.11)
      );
    }
  }, [changePlan]);

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
          <Typography style={{ fontSize: 13, fontWeight: 600 }}>
            Total Payment
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
            <Typography style={{ fontSize: 18, fontWeight: 700, color: 'red' }}>
              <HandlePlan plan={plan} sum={totalLastOrder} />
            </Typography>
            <ArrowRightOutlined />
            <Typography
              style={{ fontSize: 18, fontWeight: 700, color: 'blue' }}
            >
              <HandlePlan plan={plan} sum={total} />
            </Typography>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};
