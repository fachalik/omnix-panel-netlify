import React from 'react';

import { Form } from 'antd';
import { timeout } from '@/utils/utilitys';

interface IUserFormProduct {
  handleCloseForm: () => void;
  mutate: any;
  id?: string | undefined;
}

export default function useFormProduct(props: IUserFormProduct) {
  const { handleCloseForm, mutate, id } = props;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = async (params: any) => {
    console.log('params', params);
    const payload = await {
      ...params,
      images: [{ _id: params?.productLogo['_id'] }],
      productCategory: ` ${params.productCategory}`,
      status: 1,
    };
    delete payload['productLogo'];
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
