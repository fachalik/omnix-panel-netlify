import React from 'react';

import { Form } from 'antd';
import { timeout } from '@/utils/utilitys';

interface IUserFormTeam {
  handleCloseForm: () => void;
  mutate: any;
  // data?: any;
  id: string;
}

export default function useFormPermissionMenu(props: IUserFormTeam) {
  const { handleCloseForm, mutate, id } = props;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = async (params: any) => {
    const menuFinal = params.menu.map((item: string) => {
      return {
        id: item,
        status: params.status ? 1 : 0,
        editing: params.editing ? 1 : 0,
      };
    });

    const payload = {
      menu: menuFinal,
    };

    setIsLoading(true);

    await timeout(1000);
    await mutate({ val: payload, id });
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
