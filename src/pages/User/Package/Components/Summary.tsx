import React from 'react';

import { formatRupiah } from '@/utils/utilitys';
import { Divider, Button, Form } from 'antd';

interface IProps {
  getValue: any;
  watchData: any;
  setValue: any;
}

export const Summary: React.FC<IProps> = (props: IProps) => {
  const [total, setTotal] = React.useState<number>(0);
  const [checkout, setCheckout] = React.useState<any[]>([]);
  const { watchData } = props;

  React.useEffect(() => {
    let isMount = true;

    if (isMount && watchData) {
      const combinedArray = watchData
        .filter((item: any) => item !== null)
        .reduce((result: any, array: any) => result.concat(array), []);

      const totalPrice = combinedArray.reduce((total: any, item: any) => {
        return total + item.quantity * item.price;
      }, 0);

      setTotal(totalPrice);

      setCheckout(combinedArray);
    }

    return () => {
      isMount = false;
    };
  }, [watchData]);

  console.log('checkout', checkout);

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
      }}
    >
      <p style={{ fontSize: 18, fontWeight: 600 }}>Summary</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p style={{ fontSize: 15, fontWeight: 600 }}>Sub Total</p>

        <p style={{ fontSize: 15, fontWeight: 600 }}>
          {formatRupiah(total.toString(), 'Rp.')}
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p style={{ fontSize: 15, fontWeight: 600 }}>Tax</p>

        <p style={{ fontSize: 15, fontWeight: 600 }}>
          {formatRupiah((total * 0.11).toString(), 'Rp.')}
        </p>
      </div>
      <Divider />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p style={{ fontSize: 15, fontWeight: 600 }}>Total</p>

        <p style={{ fontSize: 15, fontWeight: 600 }}>
          {formatRupiah((total * 0.11 + total).toString(), 'Rp.')}
        </p>
      </div>
      <p style={{ fontSize: 12, fontWeight: 400 }}>
        By placing your order, you agree to our company Privacy Policy and
        Conditions of Use.
      </p>
      <Form.Item shouldUpdate className="submit">
        {() => (
          <Button
            type="primary"
            block
            htmlType="submit"
            style={{ fontSize: 14, fontWeight: 700 }}
          >
            Continue
          </Button>
        )}
      </Form.Item>
    </div>
  );
};
