import React from 'react';

import { Form, message } from 'antd';
import { timeout } from '@/utils/utilitys';
import { CheckoutSubscribe } from '@/models';
import { useOrderStore } from '@/store';
import dayjs from 'dayjs';
import { PostOrderSubscribe } from '@/service/order';
import use3DSMidtrans from '@/hooks/use3DSMidtrans';
import { useNavigate } from 'react-router-dom';

interface IProps {
  total: number;
}

export default function useFormRecurring({ total }: IProps) {
  const navigate = useNavigate();
  const [watchData, setWatchData] = React.useState<any | null>(null);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<any>(null);

  const { midtransNew3DsEmbed } = use3DSMidtrans();

  const { checkout, productCategory, productType, tenant_name } = useOrderStore(
    (state) => state
  );

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    setError(errorInfo);
  };

  const onFinish = async (params: any) => {
    try {
      const data: CheckoutSubscribe = {
        tenant_name,
        total,
        cardNumber_cc: Number(params.cardNumber_cc),
        cardExpMonth_cc: Number(dayjs(params.expiry).format('MM')),
        cardExpYear_cc: Number(dayjs(params.expiry).format('YYYY')),
        cardCvv_cc: Number(params.cvc),
        name:
          checkout[0]?.type === 'PACKAGE'
            ? checkout[0]?.name ?? ''
            : `${checkout[0]?.name} - ${checkout[0]?.type}`,
        payment_type: 'credit_card',
        productCategory,
        productType,
        checkout,
      };
      setIsLoading(true);
      await timeout(1000);
      const response: any = await PostOrderSubscribe(data);
      // console.log(response?.status);
      // console.log(response?.data?.data);
      if (response?.status == 201 && response?.data?.data?.statusCode == 200) {
        const data: any = response?.data?.data?.data;
        midtransNew3DsEmbed(data?.redirect_url, navigate);
      } else {
        message.error('payment error');
      }
      setIsLoading(false);
    } catch (err: any) {
      console.error(err);
      message.error(err);
      setIsLoading(false);
    }
  };

  const handleValuesChange = (_changedValues: any, allValues: any) => {
    setWatchData(allValues);
  };

  return {
    form,
    watchData,
    error,
    handleValuesChange,
    onFinish,
    onFinishFailed,
    isLoading,
  };
}
