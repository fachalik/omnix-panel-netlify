import React from 'react';

import { Form } from 'antd';
import { timeout } from '@/utils/utilitys';

interface IUserFormBusinessSchema {
  handleCloseForm: () => void;
  mutate: any;
  data: any;
  changeKey: string;
  id_reseller: any;
}

export default function useFormEditBusinessSchema(
  props: IUserFormBusinessSchema
) {
  const { handleCloseForm, mutate, data, changeKey, id_reseller } = props;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = async (params: any) => {
    // console.log('params', params);

    const id = data['_id'];
    const payload: any = data;

    delete payload['_id'];
    delete payload['__v'];
    delete payload['createdAt'];
    delete payload['createdBy'];
    delete payload['productCategory'];
    delete payload['productId'];
    delete payload['updatedBy'];

    payload['images'] = [
      {
        _id: data['images'][0],
      },
    ];
    payload[changeKey] = params.productPrice;
    payload['productPrice'] = params.productPrice;

    console.log('payload here', payload);

    setIsLoading(true);

    await timeout(1000);
    const value = await {
      val: { ...payload },
      id,
      id_reseller,
    };

    console.log('value here', value);
    await mutate(value);
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
