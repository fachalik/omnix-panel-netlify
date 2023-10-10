import React from 'react';

import { Form } from 'antd';
import { timeout } from '@/utils/utilitys';
// import { useNavigate } from 'react-router-dom';

interface IUserFormUSer {
  handleCloseForm: () => void;
  mutate: any;
  data?: any;
}

export default function useFormUser(props: IUserFormUSer) {
  // const { mutate, data } = useCreateProduct();
  const { handleCloseForm, mutate, data } = props;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = async (params: any) => {
    setIsLoading(true);
    let payload: any = await {};
    delete params.productLogo.path;
    if (data) {
      payload = await {
        val: { ...params, productPrice: parseInt(params.productPrice) },
        id: data.id,
      };
    } else {
      payload = await {
        ...params,
        productPrice: parseInt(params.productPrice),
      };
    }

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
