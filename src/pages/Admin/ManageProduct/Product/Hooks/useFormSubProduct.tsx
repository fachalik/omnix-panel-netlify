import React from 'react';

import { Form } from 'antd';
import { timeout } from '@/utils/utilitys';
// import { useNavigate } from 'react-router-dom';

interface IUserFormSubProduct {
  handleCloseForm: () => void;
  setChooseForm: (text: any) => void;
  mutate: any;
  data?: any;
}

export default function useFormSubProduct(props: IUserFormSubProduct) {
  // const { mutate, data } = useCreateProduct();
  const { handleCloseForm, setChooseForm, mutate, data } = props;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = async (params: any) => {
    setIsLoading(true);
    let payload: any = await {};
    params.subproductPrice = parseInt(params.subproductPrice);
    if (data) {
      payload = await {
        val: { ...params },
        id: data.id,
      };
    } else {
      payload = await {
        productId: { productId: params.productId },
        channelId: { channelId: params.channelId },
        ...params,
      };
    }

    await timeout(1000);
    console.log(payload);
    await mutate(payload);
    await form.resetFields();
    handleCloseForm();
    setChooseForm('');
    setIsLoading(false);
  };

  return {
    form,
    onFinish,
    onFinishFailed,
    isLoading,
  };
}
