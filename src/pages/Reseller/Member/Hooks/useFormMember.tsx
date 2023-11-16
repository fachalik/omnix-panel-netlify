import React from 'react';

import { Form } from 'antd';
import { timeout } from '@/utils/utilitys';

interface IUserFormUSer {
  handleCloseForm: () => void;
  mutate: any;
  id: string | undefined;
}

export default function useFormMember(props: IUserFormUSer) {
  const { handleCloseForm, mutate, id } = props;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = async (params: any) => {
    const newData = params.member.map((item: any) => {
      return { id_member: item };
    });
    const member: any = { member: newData };
    const payload = await {
      val: member,
      id,
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
