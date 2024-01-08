import React from 'react';
import { Button, Radio, message, Popconfirm } from 'antd';
import { useOrderStore } from '@/store';

import { palette } from '@/theme/themeConfig';

import { paymentMethod as pMethod, PaymentMethodType } from './pMethod';

import useSnapMidtrans from '@/hooks/useSnapMidtrans';
import { PostOrder } from '@/service/order';
import { Checkout } from '@/models';

import { BottomTotalPayment } from './BottomTotalPayment';
import { useNavigate } from 'react-router-dom';
import { RecurringPayment } from './RecurringPayment';

interface IProps {
  current: number;
  steps: any;
  next: () => void;
  prev: () => void;
  handleClose: () => void;
  setCurrent: any;
}

export const PaymentMethod: React.FC<IProps> = (props: IProps) => {
  const navigate = useNavigate();
  const { prev, current, handleClose, next, setCurrent, steps } = props;
  const { checkout, plan, productCategory, productType, reset } = useOrderStore(
    (state) => state
  );

  const [recurringPayment, setRecurringPayment] =
    React.useState<boolean>(false);
  const [snapShow, setSnapShow] = React.useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = React.useState(2);
  const [total, setTotal] = React.useState<number>(0);

  const { snapEmbed } = useSnapMidtrans();

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

  const onChange = (val: any) => {
    setPaymentMethod(val);
  };

  const handleCheckout = async (paymentMethod: number) => {
    switch (paymentMethod) {
      case 1:
        setRecurringPayment(true);
        break;
      case 2:
        await handlePaymentMethodOne();
        break;
    }
  };

  const handlePaymentMethodOne = async () => {
    const data: Checkout = {
      total,
      name:
        checkout[0]?.type === 'PACKAGE'
          ? checkout[0]?.name ?? ''
          : `${checkout[0]?.name} - ${checkout[0]?.type}`,
      payment_type:
        pMethod.find((item) => item.code == paymentMethod)?.title ?? 'others',
      productCategory,
      method: plan,
      productType,
      checkout,
    };
    const response = await PostOrder(data);

    if (response.data.midtrans.token) {
      console.log('resonse.data', response.data);
      setSnapShow(true);
      snapEmbed(response.data.midtrans.token, 'snap-container', {
        onSuccess: function (result: any) {
          console.log('success', result);
          navigate(`/order-history?orderId=${response.data.orderId}`);
          setSnapShow(false);
        },
        onPending: function (result: any) {
          console.log('pending', result);
          navigate(`/order-history?orderId=${response.data.orderId}`);
          setSnapShow(false);
        },
        onClose: function () {
          navigate(`/order-history?orderId=${response.data.orderId}`);
          setSnapShow(false);
        },
      });
      reset();
    } else if (response && response.status === 'error') {
      message.error('something was wrong');
    }
  };

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <div
        id={'snap-container'}
        style={{ width: '100%', height: '100%' }}
      ></div>
      {recurringPayment && (
        <RecurringPayment
          setBack={() => setRecurringPayment(false)}
          current={current}
          next={next}
          prev={prev}
          steps={steps}
          handleClose={handleClose}
          setCurrent={setCurrent}
        />
      )}
      {!snapShow && !recurringPayment && (
        <>
          <div style={{ padding: '2em 1em', width: '100%' }}>
            {pMethod.map((item: PaymentMethodType, idx) => (
              <div
                key={`${idx}_${item.code}`}
                style={{
                  width: '100%',
                  padding: '16px 12px',
                  background: 'white',
                  margin: '10px 0px',
                  border: '1px solid var(--Neutral-60, #BFBFBF)',
                  borderRadius: 5,
                  cursor: 'pointer',
                }}
                onClick={() => !item.disabled && onChange(item.code)}
              >
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'start',
                      alignItems: 'center',
                      gap: '1em',
                    }}
                  >
                    <Radio
                      onChange={(e) => onChange(e.target.value)}
                      disabled={item.disabled}
                      value={item.code}
                      checked={paymentMethod === item.code}
                    />
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        justifyContent: 'start',
                      }}
                    >
                      <p style={{ fontSize: 16, fontWeight: 700 }}>
                        {item.title}
                      </p>
                      <p style={{ fontSize: 13, fontWeight: 400 }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <i
                    className={item.icon}
                    style={{ fontSize: 42, color: palette.primary.main }}
                  />
                </div>
              </div>
            ))}
          </div>
          <BottomTotalPayment>
            <div style={{ display: 'flex', gap: '1em' }}>
              <Button onClick={() => prev()}>Back to summary</Button>
              <Popconfirm
                title="Checkout item?"
                description="Are you sure to checkout this item?"
                onConfirm={() => handleCheckout(paymentMethod)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary">Continue payment</Button>
              </Popconfirm>
            </div>
          </BottomTotalPayment>
        </>
      )}
    </div>
  );
};
