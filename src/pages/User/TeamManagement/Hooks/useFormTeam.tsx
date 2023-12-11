import React from 'react';

import { Form } from 'antd';
import { timeout } from '@/utils/utilitys';

interface IUserFormTeam {
  handleCloseForm: () => void;
  mutate: any;
}

export default function useFormTeam(props: IUserFormTeam) {
  const { handleCloseForm, mutate } = props;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = async (params: any) => {
    console.log('params', params);

    delete params['password_confirmation'];

    const payload = await {
      ...params,
      loginType: 'EMAIL',
      role: 'REGULER',
      status: 1,
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
    onFinish,
    onFinishFailed,
    isLoading,
  };
}
