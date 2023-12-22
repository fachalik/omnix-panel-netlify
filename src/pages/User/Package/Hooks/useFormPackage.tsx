import React from 'react';

import { Form } from 'antd';
import { timeout } from '@/utils/utilitys';

interface IUserFormMenu {
  handleCloseForm: () => void;
  mutate: any;
  data?: any;
}

export default function useFormMenu(props: IUserFormMenu) {
  const { handleCloseForm, mutate, data } = props;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = async (params: any) => {
    console.log('params', params);

    let payload = {};

    if (!data) {
      payload = await {
        ...params,
        status: params.status ? 1 : 0,
      };
    } else {
      payload = await {
        val: { ...params, status: params.status ? 1 : 0 },
        id: data['_id'],
      };
    }

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
