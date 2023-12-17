import React from 'react';

import { Form } from 'antd';
import { timeout } from '@/utils/utilitys';

import { FieldTypeAddonUpdateProduct } from '../models/businessSchema';

interface IAddon {
  mutate: any;
  refetch: any;
  id: string;
}

export default function useFormAddOnDetailProduct(props: IAddon) {
  const { mutate, refetch, id } = props;
  const [watchData, setWatchData] =
    React.useState<FieldTypeAddonUpdateProduct | null>(null);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<any>(null);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    setError(errorInfo);
  };

  const onFinish = async (params: any) => {
    console.log('params', params);

    const payload = await params?.channelAddOn?.map((item: any) => {
      return {
        product_id: id,
        ...item,
      };
    });

    console.log('payload', payload);
    setIsLoading(true);
    await timeout(1000);
    await mutate({ val: { data: payload } });
    refetch();
    setIsLoading(false);
  };

  const handleValuesChange = (changedValues: any, allValues: any) => {
    console.log('Changed values:', changedValues);
    console.log('All values:', allValues);
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
