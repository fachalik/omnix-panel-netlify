import React from 'react';

import { Form } from 'antd';
import { timeout } from '@/utils/utilitys';
import { useNavigate } from 'react-router-dom';
import { registerReseller } from '@/service/authReseller';

export default function useFormSignUpReseller() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = async (params: any) => {
    setIsLoading(true);
    delete params.password_confirmation;

    const payload = { ...params };
    payload['role'] = await 3;
    await timeout(1000);
    await registerReseller(payload)
      .then(() => navigate('/verify'))
      .catch((err) => console.log(err));

    setIsLoading(false);
  };

  return {
    form,
    onFinish,
    onFinishFailed,
    isLoading,
  };
}
