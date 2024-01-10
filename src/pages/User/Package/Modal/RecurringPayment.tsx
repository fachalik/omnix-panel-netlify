import 'react-credit-cards/es/styles-compiled.css';

import React from 'react';
import { Button, Form, Input, Row, Col, DatePicker } from 'antd';
import Cards from 'react-credit-cards';
import dayjs from 'dayjs';

import { BottomTotalPayment } from './BottomTotalPayment';
import { CreditCardOutlined, LockOutlined } from '@ant-design/icons';
import { useOrderStore } from '@/store';

import useFormRecurring from '../Hooks/useFormRecurring';

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
  const [focus, setFocus] = React.useState<any>('');

  const [initData] = React.useState<any>({
    cvc: '',
    expiry: '',
    name: '',
    cardNumber_cc: '',
  });
  const [total, setTotal] = React.useState<number>(0);
  const { setBack } = props;
  const { checkout } = useOrderStore((state) => state);

  const { form, handleValuesChange, isLoading, onFinish, onFinishFailed } =
    useFormRecurring({ total });

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

  const handleInputFocus = (e: any) => {
    setFocus(e.target.name);
  };

  const validateCreditCard = (_rule: any, value: any, callback: any) => {
    // Check if the input value is a valid credit card number
    const regex = /^[0-9]{16}$/;
    if (!regex.test(value)) {
      callback('Please enter a valid 16-digit credit card number');
    } else {
      callback();
    }
  };

  const validateCVC = (_rule: any, value: any, callback: any) => {
    // Check if the input value is a valid 3 or 4-digit CVC code
    const regex = /^[0-9]{3,4}$/;
    if (!regex.test(value)) {
      callback('Please enter a valid 3 or 4-digit CVC code');
    } else {
      callback();
    }
  };

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <Form
        initialValues={initData}
        autoComplete="off"
        name="basic"
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={handleValuesChange}
      >
        <div style={{ padding: '2em 4em', width: '100%' }}>
          <Row style={{ width: '100%', marginBottom: '.5em' }}>
            <Col
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Cards
                cvc={form.getFieldValue('cardCvv_cc') ?? ''}
                focused={focus}
                expiry={dayjs(form.getFieldValue('expiry') ?? '').format(
                  'MM/YYYY'
                )}
                name={form.getFieldValue('name') ?? ''}
                number={form.getFieldValue('cardNumber_cc') ?? ''}
              />
            </Col>
          </Row>
          <Row style={{ gap: '.5em' }}>
            <Col xs={24}>
              <div
                style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}
              >
                Name on card
              </div>
              <Form.Item name="name" rules={[{ required: true }]}>
                <Input
                  prefix={<CreditCardOutlined />}
                  autoComplete="cc-name"
                  placeholder="John Doe"
                  onFocus={handleInputFocus}
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <div
                style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3 }}
              >
                Card Number
              </div>
              <Form.Item
                name="cardNumber_cc"
                rules={[{ required: true }, { validator: validateCreditCard }]}
              >
                <Input
                  autoComplete="cc-number"
                  prefix={<CreditCardOutlined />}
                  placeholder="**** **** **** ****"
                  onFocus={handleInputFocus}
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
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      marginBottom: 3,
                    }}
                  >
                    Expired Date
                  </div>
                  <Form.Item name="expiry" rules={[{ required: true }]}>
                    <DatePicker
                      autoComplete="cc-exp"
                      format="MM/YYYY"
                      picker="month"
                      style={{ width: '100%' }}
                      onFocus={handleInputFocus}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={11}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      marginBottom: 3,
                    }}
                  >
                    CVV
                  </div>
                  <Form.Item
                    name="cvc"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter the CVV',
                      },
                      { validator: validateCVC },
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined />}
                      placeholder="123"
                      onFocus={handleInputFocus}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <BottomTotalPayment>
          <div style={{ display: 'flex', gap: '1em' }}>
            <Button htmlType="button" onClick={() => setBack()}>
              Back to payment Method
            </Button>
            <Form.Item shouldUpdate className="submit">
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ fontSize: 14, fontWeight: 700 }}
                  disabled={isLoading}
                >
                  Continue payment
                </Button>
              )}
            </Form.Item>
          </div>
        </BottomTotalPayment>
      </Form>
      <div
        id={'snap-container'}
        style={{ width: '100%', height: '100%', padding: '2em 1em' }}
      ></div>
    </div>
  );
};
