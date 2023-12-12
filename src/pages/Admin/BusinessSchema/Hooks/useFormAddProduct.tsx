import React from 'react';

import { Form } from 'antd';

interface IFormAddProduct {
  handleCloseForm: () => void;
  mutate: any;
  productType: string;
  productCategory: string;
  typeDetails: string;
  refetch: any;
}

export default function useFormAddProduct(props: IFormAddProduct) {
  const {
    refetch,
    handleCloseForm,
    mutate,
    productCategory,
    productType,
    typeDetails,
  } = props;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = async (params: any) => {
    let payload = {};

    if (typeDetails === 'PAKET') {
      payload = {
        productName: params.productName,
        productPrice: params.productPrice,
        description: params.description,
        status: params.status ? 1 : 0,
        productCategory,
        productType,
        typeDetails,
        detail: [
          {
            digital: params.digital?.toString() ?? '0',
            voice: params.voice?.toString() ?? '0',
            svp: params.svp?.toString() ?? '0',
            backroom: params.backroom?.toString() ?? '0',
            videocall: params.videocall?.toString() ?? '0',
            Email: params.email?.toString() ?? '0',
            SMS: params.sms?.toString() ?? '0',
            Whatsapp: params.whatsapp?.toString() ?? '0',
          },
        ],
      };
    } else {
      payload = {
        productName: params.productName,
        productPrice: params.productPrice,
        description: params.description,
        status: params.status ? 1 : 0,
        productCategory,
        productType,
        typeDetails,
      };
    }

    console.log('payload', payload);

    await mutate(payload);
    form.resetFields();
    handleCloseForm();
    await refetch();
    setIsLoading(false);
  };

  return {
    form,
    onFinish,
    onFinishFailed,
    isLoading,
  };
}
