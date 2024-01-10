import React from 'react';

import { formatRupiahV2, HandlePlan } from '@/utils/utilitys';
import { Divider, Button, Form, Radio } from 'antd';

import type { RadioChangeEvent } from 'antd';
import { useOrderStore } from '@/store';

interface IProps {
  getValue: any;
  watchData: any;
  setValue: any;
}

export const Summary: React.FC<IProps> = (props: IProps) => {
  const { plan, setPlan } = useOrderStore((state) => state);

  const [total, setTotal] = React.useState<number>(0);
  const [_checkout, setCheckout] = React.useState<any[]>([]);
  const { watchData } = props;

  const options = [
    { label: 'Monthly', value: 'MONTHLY' },
    { label: 'Annually', value: 'ANNUAL' },
  ];

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setPlan(value);
  };

  React.useEffect(() => {
    let isMount = true;

    if (isMount && watchData) {
      const combinedArray = watchData
        .filter((item: any) => item !== null && item !== undefined)
        .reduce((result: any, array: any) => result.concat(array), []);

      const totalPrice = combinedArray.reduce((total: any, item: any) => {
        return total + Number(item.quantity ?? 1) * Number(item?.price);
      }, 0);

      setTotal(totalPrice);

      setCheckout(combinedArray);
    }

    return () => {
      isMount = false;
    };
  }, [watchData]);

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Radio.Group
          options={options}
          onChange={onChange}
          value={plan}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
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
          <HandlePlan plan={plan} sum={total} />
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
          <HandlePlan plan={plan} sum={Math.ceil(total * 0.11)} />
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
          {formatRupiahV2((Math.ceil(total * 0.11) + total).toString())}
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
