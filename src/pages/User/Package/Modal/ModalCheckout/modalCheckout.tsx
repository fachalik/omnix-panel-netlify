import React from 'react';
import { Steps } from 'antd';

import { TableSummary } from '../components/TableSummary';
import { PaymentMethod } from '../components/PaymentMethod';

const steps = [
  {
    title: 'Subscription Summary',
    content: 'subscription-summary',
  },
  {
    title: 'Payment Method',
    content: 'payment-method',
  },
];

interface IForm {
  handleClose: () => void;
  next: () => void;
  prev: () => void;
  current: any;
  setCurrent: any;
}

export const ModalCheckout: React.FC<IForm> = ({
  handleClose,
  next,
  prev,
  current,
  setCurrent,
}: IForm) => {
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const mapContent = (content: string) => {
    switch (content) {
      case 'subscription-summary':
        return (
          <TableSummary
            current={current}
            next={next}
            prev={prev}
            steps={steps}
            handleClose={handleClose}
            setCurrent={setCurrent}
          />
        );

      case 'payment-method':
        return (
          <PaymentMethod
            current={current}
            next={next}
            prev={prev}
            steps={steps}
            handleClose={handleClose}
            setCurrent={setCurrent}
          />
        );

      default:
        break;
    }
  };

  return (
    <div style={{ padding: '2em 0em' }}>
      <Steps current={current} items={items} />
      <div>{mapContent(steps[current].content)}</div>
    </div>
  );
};