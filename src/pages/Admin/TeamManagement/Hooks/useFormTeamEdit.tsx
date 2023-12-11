import React from 'react';

import { Form } from 'antd';
import { timeout, removeEmptyValues } from '@/utils/utilitys';

interface IUserFormTeam {
  handleCloseForm: () => void;
  mutate: any;
  data: any;
}

export default function useFormTeamEdit(props: IUserFormTeam) {
  const { handleCloseForm, mutate, data } = props;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = async (params: any) => {
    delete params['password_confirmation'];

    let clearParams: any = await removeEmptyValues(params);

    const payload = await {
      val: { ...clearParams, loginType: 'EMAIL', role: 'ADMIN', status: 1 },
      id: data._id,
    };

    console.log('payload', payload);

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
