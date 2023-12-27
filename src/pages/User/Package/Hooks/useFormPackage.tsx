import React from 'react';

import { Form } from 'antd';
import { timeout } from '@/utils/utilitys';

// import { FieldTypeProduct } from '../models/order';

interface IUserFormTeam {
  mutate: any;
}

export default function useFormPackage(props: IUserFormTeam) {
  const { mutate } = props;
  const [watchData, setWatchData] = React.useState<any | null>(null);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<any>(null);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    setError(errorInfo);
  };

  const onFinish = async (params: any) => {
    console.log('params', params);

    setIsLoading(true);
    await timeout(1000);
    mutate(params);
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
