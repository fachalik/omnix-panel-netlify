import React from 'react';

import { Form } from 'antd';
import { timeout } from '@/utils/utilitys';

interface IFormUser {
  mutate: any;
  handleCloseForm: any;
}

export default function useFormUser(props: IFormUser) {
  const { mutate, handleCloseForm } = props;
  const [watchData, setWatchData] = React.useState<any>(null);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleValuesChange = (changedValues: any, allValues: any) => {
    console.log('Changed values:', changedValues);
    console.log('All values:', allValues);
    setWatchData(allValues);
  };

  const onFinish = async (params: any) => {
    console.log('params', params);
    const payload = {
      val: {
        reqPrice: 1,
      },
      id: params.user,
    };

    setIsLoading(true);
    await timeout(1000);
    await mutate(payload);
    await form.resetFields();
    handleCloseForm();
    setIsLoading(false);
  };

  return {
    form,
    watchData,
    handleValuesChange,
    onFinish,
    onFinishFailed,
    isLoading,
  };
}
