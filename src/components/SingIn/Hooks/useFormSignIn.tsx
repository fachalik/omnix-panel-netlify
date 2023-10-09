import React from 'react';

import { useAuthStore } from '@/store/auth';
import { Form } from 'antd';
import { timeout } from '@/utils/utilitys';

export default function useFormSignIn() {
  const { login } = useAuthStore((state) => state);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = async (params: any) => {
    setIsLoading(true);
    timeout(1000);
    login(params);
    setIsLoading(false);
  };

  return {
    form,
    onFinish,
    onFinishFailed,
    isLoading,
  };
}
