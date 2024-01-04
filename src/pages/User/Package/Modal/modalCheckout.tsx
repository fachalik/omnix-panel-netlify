import React, { useState } from 'react';
import { Steps } from 'antd';

import { TableSummary } from './TableSummary';
import { PaymentMethod } from './PaymentMethod';

const steps = [
  {
    title: 'Subscription Summary',
    content: 'subscription-summary',
  },
  {
    title: 'Payment Method',
    content: 'payment-method',
  },
  // {
  //   title: 'Finish Payment',
  //   content: 'finish-payment',
  // },
];

interface IForm {
  handleClose: () => void;
}

export const ModalCheckout: React.FC<IForm> = ({ handleClose }: IForm) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

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
