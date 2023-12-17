import React from 'react';

import { Form } from 'antd';
import { timeout, transformStringToKey } from '@/utils/utilitys';

import { FieldTypeAddProduct } from '../models/businessSchema';

// import { useSearchParams } from 'react-router-dom';

interface IUserFormTeam {
  mutate: any;
  data?: any;
  handleCloseForm: any;
  productType: any;
}

export default function useFormMProduct(props: IUserFormTeam) {
  // const [searchParams, setSearchParams] = useSearchParams();
  const [watchData, setWatchData] = React.useState<FieldTypeAddProduct | null>(
    null
  );
  const { mutate, data, handleCloseForm, productType } = props;
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
        productType,
        key: transformStringToKey(params.name),
      };
    } else {
      payload = await {
        val: {
          ...params,
          status: params.status ? 1 : 0,
          productType,
          key: transformStringToKey(params.name),
        },
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
