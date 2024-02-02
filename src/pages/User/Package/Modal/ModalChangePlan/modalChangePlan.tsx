import React from 'react';
import { Steps } from 'antd';

import { TableSummary } from '../components/TableSummary';
import { PaymentMethod } from '../components/PaymentMethod';
import { ChangePlan } from '../components/ChangePlan';
import { useOrderStore } from '@/store';

interface IForm {
  handleClose: () => void;
  next: () => void;
  prev: () => void;
  current: any;
  setCurrent: any;
}

export const ModalChangePlan: React.FC<IForm> = ({
  handleClose,
  next,
  prev,
  current,
  setCurrent,
}: IForm) => {
  const { checkout, changePlan } = useOrderStore((state) => state);

  const [isLow, setIsLow] = React.useState<boolean>(false);
  const [items, setItems] = React.useState<any[]>([]);

  const handleLow = async (checkout: any, changePlan: any) => {
    if (checkout.length !== 0 && changePlan.length !== 0) {
      let changePlanUser: any = {
        agent: 0,
        // agentDigital: 0,
        // agentVoice: 0,
        // agentVideoCall: 0,
        svp: 0,
        backroom: 0,
      };
      let planUser: any = {
        agent: 0,
        // agentDigital: 0,
        // agentVoice: 0,
        // agentVideoCall: 0,
        svp: 0,
        backroom: 0,
      };

      const changeplanData = await changePlan.productsDetail.filter(
        (item: any) => !!item.license
      );

      const planUserData = await checkout.filter((item: any) => !!item.license);

      await changeplanData.forEach((element: any) => {
        if (element.type === 'PACKAGE') {
          changePlanUser['agent'] =
            changePlanUser['agent'] +
            parseInt(element['license']['Agent'][0]['maxQuantity']);

          changePlanUser['svp'] =
            changePlanUser['svp'] +
            parseInt(element['license']['SVP'][0]['maxQuantity']);

          changePlanUser['backroom'] =
            changePlanUser['backroom'] +
            parseInt(element['license']['Backroom'][0]['maxQuantity']);
        }

        if (element.name.includes('Agent')) {
          changePlanUser['agent'] =
            changePlanUser['agent'] + parseInt(element['quantity']);
        }

        if (element.name.includes('Supervisor')) {
          changePlanUser['svp'] =
            changePlanUser['svp'] + parseInt(element['quantity']);
        }

        if (element.name.includes('Backroom')) {
          changePlanUser['backroom'] =
            changePlanUser['backroom'] + parseInt(element['quantity']);
        }
      });

      await planUserData.forEach((element: any) => {
        if (element.type === 'PACKAGE') {
          planUser['agent'] =
            planUser['agent'] +
            parseInt(element['license']['Agent'][0]['maxQuantity']);

          planUser['svp'] =
            planUser['svp'] +
            parseInt(element['license']['SVP'][0]['maxQuantity']);

          planUser['backroom'] =
            planUser['backroom'] +
            parseInt(element['license']['Backroom'][0]['maxQuantity']);
        }

        if (element.name.includes('Agent')) {
          planUser['agent'] = planUser['agent'] + parseInt(element['quantity']);
        }

        if (element.name.includes('Supervisor')) {
          planUser['svp'] = planUser['svp'] + parseInt(element['quantity']);
        }

        if (element.name.includes('Backroom')) {
          planUser['backroom'] =
            planUser['backroom'] + parseInt(element['quantity']);
        }
      });

      if (
        changePlanUser.agent > planUser.agent ||
        changePlanUser.svp > planUser.svp
      ) {
        setIsLow(true);
      }

      // console.log('changeplanData', changeplanData);
      console.log('planUser', planUser);
      // console.log('planUserData', planUserData);
      console.log('changePlanUser', changePlanUser);
    }
  };

  React.useEffect(() => {
    handleLow(checkout, changePlan);
  }, [checkout, changePlan]);

  const stepsDeleteUser = [
    {
      title: 'Change Plan',
      content: 'change-plan',
    },
    {
      title: 'Choose User',
      content: 'choose-user',
    },
    {
      title: 'Subscription Summary',
      content: 'subscription-summary',
    },
    {
      title: 'Payment Method',
      content: 'payment-method',
    },
  ];

  const steps = [
    {
      title: 'Change Plan',
      content: 'change-plan',
    },
    {
      title: 'Subscription Summary',
      content: 'subscription-summary',
    },
    {
      title: 'Payment Method',
      content: 'payment-method',
    },
  ];

  console.log('isLow', isLow);

  React.useEffect(() => {
    if (isLow) {
      setItems(
        stepsDeleteUser.map((item) => ({ key: item.title, title: item.title }))
      );
    } else {
      setItems(steps.map((item) => ({ key: item.title, title: item.title })));
    }
  }, [isLow]);

  const mapContent = (content: string) => {
    console.log('content', content);
    switch (content) {
      case 'change-plan':
        return (
          <ChangePlan
            current={current}
            next={next}
            prev={prev}
            steps={steps}
            handleClose={handleClose}
            setCurrent={setCurrent}
          />
        );

      case 'choose-user':
        return (
          <p> disini ganti user</p>
          // <TableSummary
          //   current={current}
          //   next={next}
          //   prev={prev}
          //   steps={steps}
          //   handleClose={handleClose}
          //   setCurrent={setCurrent}
          // />
        );

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
      <div>
        {mapContent(
          isLow ? stepsDeleteUser[current].content : steps[current].content
        )}
      </div>
    </div>
  );
};
