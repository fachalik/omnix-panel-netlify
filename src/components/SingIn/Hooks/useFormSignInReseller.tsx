import React from 'react';

import { useAuthStore } from '@/store/auth';
import { Form } from 'antd';
import { timeout } from '@/utils/utilitys';

export default function useFormSignInReseller() {
  const { loginReseller } = useAuthStore((state) => state);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = async (params: any) => {
    setIsLoading(true);
    await timeout(1000);
    await loginReseller(params);
    setIsLoading(false);
  };

  return {
    form,
    onFinish,
    onFinishFailed,
    isLoading,
  };
}
