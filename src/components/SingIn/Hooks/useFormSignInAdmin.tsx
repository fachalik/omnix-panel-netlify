import React from 'react';

// import { useAuthStore } from '@/store/auth';
import { Form } from 'antd';
import { timeout } from '@/utils/utilitys';

export default function useFormSignInAdmin() {
  // const { loginAdmin } = useAuthStore((state) => state);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = async (_params: any) => {
    setIsLoading(true);
    await timeout(1000);
    // await loginAdmin(params);
    setIsLoading(false);
  };

  return {
    form,
    onFinish,
    onFinishFailed,
    isLoading,
  };
}
