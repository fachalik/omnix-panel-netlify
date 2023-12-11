import React from 'react';

import { Form } from 'antd';
import { timeout, removeEmptyValues } from '@/utils/utilitys';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { register } from '@/service/auth';

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

    let clearParams: any = await removeEmptyValues(params);

    const payload = { ...clearParams };
    payload['role'] = 'RESELLER';
    payload['loginType'] = 'EMAIL';
    payload['status'] = 1;
    await timeout(1000);
    // console.log('payload', payload);
    await register(payload)
      .then(() => {
        const paramsData: any = [['email', payload.email]];
        navigate({
          pathname: '/verify-reseller',
          search: `?${createSearchParams(paramsData)}`,
        });
      })
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
