import React from 'react';

import { Form } from 'antd';
import { timeout } from '@/utils/utilitys';

import { FieldTypeAddProduct } from '../models/businessSchema';

interface IUserFormTeam {
  mutate: any;
  handleCloseForm: any;
  productType: any;
  productCategory: any;
}

export default function useFormMProduct(props: IUserFormTeam) {
  const [watchData, setWatchData] = React.useState<FieldTypeAddProduct | null>(
    null
  );
  const { mutate, handleCloseForm, productType, productCategory } = props;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = async (params: any) => {
    // console.log('params', params);
    let payload = {
      ...params,
      productCategory,
      productType,
      status: 0,
    };
    console.log('payload', payload);

    setIsLoading(true);
    await timeout(1000);
    await mutate(payload);
    await form.resetFields();
    handleCloseForm();
    setIsLoading(false);
  };

  const handleValuesChange = (changedValues: any, allValues: any) => {
    console.log('Changed values:', changedValues);
    console.log('All values:', allValues);
    setWatchData(allValues);
  };

  return {
    form,
    watchData,
    handleValuesChange,
    onFinish,
    onFinishFailed,
    isLoading,
  };
}
