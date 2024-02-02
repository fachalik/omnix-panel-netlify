import React from 'react';
import { Divider, Button, Typography } from 'antd';
import { useOrderStore } from '@/store';
import { HandlePlan } from '@/utils/utilitys';

import { BottomTotalPaymentChangePlan } from '../components/BottomTotalPaymentChangePlan';

import './style-table-change-plan.css';

interface IProps {
  current: number;
  steps: any;
  next: () => void;
  prev: () => void;
  handleClose: () => void;
  setCurrent: any;
}

export const ChangePlan: React.FC<IProps> = (props: IProps) => {
  const {
    checkout,
    changePlan: changePlanStore,
    plan,
  } = useOrderStore((state) => state);

  const [_total, setTotal] = React.useState<number>(0);
  const { next, handleClose } = props;
  const [changePlanData, setChangePlanData] = React.useState<any[]>([]);

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
    console.log(changePlanStore);
    if (changePlanStore?.productsDetail) {
      const data: any = changePlanStore?.productsDetail.filter(
        (item: any) => item.type !== 'TAX'
      );
      setChangePlanData(data);
    }
  }, [changePlanStore]);

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <table
        style={{ width: '100%', height: '100%', padding: '2em 1em' }}
        className="darkTable"
      >
        <thead className="ant-table-thead">
          <tr>
            <td className="ant-table-cell" scope="col">
              <Typography>Name</Typography>
            </td>
            <td className="ant-table-cell" scope="col">
              <Typography>Price</Typography>
            </td>
            <td className="ant-table-cell" scope="col">
              <Typography>Quantity</Typography>
            </td>
            <td className="ant-table-cell" scope="col">
              <Typography>Total</Typography>
            </td>
          </tr>
        </thead>
        <tbody>
          {changePlanData.length !== 0 &&
            changePlanData.map((item2: any, idx: number) => (
              <tr style={{ color: 'red' }} key={`changePlan_${idx}`}>
                <td>
                  <Typography style={{ color: 'red' }}>{item2.name}</Typography>
                </td>
                <td>
                  <Typography style={{ color: 'red' }}>
                    <HandlePlan plan={plan} sum={item2?.price} />
                  </Typography>
                </td>
                <td>
                  <Typography style={{ color: 'red' }}>
                    {item2.quantity}
                  </Typography>
                </td>
                <td>
                  <Typography style={{ color: 'red' }}>
                    <HandlePlan
                      plan={plan}
                      sum={item2?.price * item2?.quantity}
                    />
                  </Typography>
                </td>
              </tr>
            ))}
          {/* {JSON.stringify(changePlan)} */}
          <tr>
            <td colSpan={4}>
              <Divider>In To</Divider>
            </td>
          </tr>
          {checkout.map((item, idx: number) => (
            <tr key={`checkout${idx}`}>
              <td>
                <Typography style={{ color: 'blue' }}>{item.name}</Typography>
              </td>
              <td>
                <Typography style={{ color: 'blue' }}>
                  <HandlePlan plan={plan} sum={item?.price} />
                </Typography>
              </td>
              <td>
                <Typography style={{ color: 'blue' }}>
                  {item.quantity}
                </Typography>
              </td>
              <td>
                <Typography style={{ color: 'blue' }}>
                  <HandlePlan plan={plan} sum={item?.price * item?.quantity} />
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <BottomTotalPaymentChangePlan>
        <div>
          <Button
            type="text"
            style={{ margin: '0 8px' }}
            onClick={() => handleClose()}
          >
            Cancel
          </Button>

          <Button type="primary" onClick={() => next()}>
            Check Out
          </Button>
        </div>
      </BottomTotalPaymentChangePlan>
    </div>
  );
};
