import React from 'react';
import { Button, Form, Input, Row, Col, DatePicker } from 'antd';
import { useOrderStore } from '@/store';

import { Checkout } from '@/models';

import { BottomTotalPayment } from './BottomTotalPayment';
import { CreditCardOutlined, LockOutlined } from '@ant-design/icons';

interface IProps {
  current: number;
  steps: any;
  next: () => void;
  prev: () => void;
  handleClose: () => void;
  setCurrent: any;
  setBack: () => void;
}

export const RecurringPayment: React.FC<IProps> = (props: IProps) => {
  // const navigate = useNavigate();
  const [total, setTotal] = React.useState<number>(0);
  const { setBack } = props;
  const { checkout, plan, productCategory, productType } = useOrderStore(
    (state) => state
  );

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

  const handleCheckout = async () => {
    const data: Checkout = {
      total,
      name:
        checkout[0]?.type === 'PACKAGE'
          ? checkout[0]?.name ?? ''
          : `${checkout[0]?.name} - ${checkout[0]?.type}`,
      payment_type: 'recurring',
      productCategory,
      method: plan,
      productType,
      checkout,
    };
    console.log({ data });
  };

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <div style={{ padding: '2em 4em', width: '100%' }}>
        <Row style={{ gap: '.5em' }}>
          <Col xs={24}>
            <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
              Name on card
            </div>
            <Form.Item name="name" rules={[{ required: true }]}>
              <Input prefix={<CreditCardOutlined />} placeholder="John Doe" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <div style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}>
              Card Number
            </div>
            <Form.Item name="cardNumber" rules={[{ required: true }]}>
              <Input
                prefix={<CreditCardOutlined />}
                placeholder="**** **** **** ****"
              />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Row
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Col xs={24} md={11}>
                <div
                  style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}
                >
                  Expired Date
                </div>
                <Form.Item name="expiredDate" rules={[{ required: true }]}>
                  <DatePicker format="MM-DD" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col xs={24} md={11}>
                <div
                  style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}
                >
                  CVV
                </div>
                <Form.Item
                  name="cvv"
                  rules={[{ required: true, message: 'Please enter the CVV' }]}
                >
                  <Input prefix={<LockOutlined />} placeholder="123" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <BottomTotalPayment>
        <div style={{ display: 'flex', gap: '1em' }}>
          <Button onClick={() => setBack()}>Back to payment Method</Button>
          <Button type="primary" onClick={handleCheckout}>
            Continue payment
          </Button>
        </div>
      </BottomTotalPayment>

      <div
        id={'snap-container'}
        style={{ width: '100%', height: '100%', padding: '2em 1em' }}
      ></div>
    </div>
  );
};
