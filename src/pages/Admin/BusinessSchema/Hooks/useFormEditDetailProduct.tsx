import React from 'react';

import { Form } from 'antd';
import { timeout } from '@/utils/utilitys';

import { FieldTypeUpdateProduct } from '../models/businessSchema';

interface IUserFormTeam {
  mutate: any;
  refetch: any;
  id: string;
  data: any;
}

export default function useFormDetailProduct(props: IUserFormTeam) {
  const [watchData, setWatchData] =
    React.useState<FieldTypeUpdateProduct | null>(null);
  const { mutate, refetch, id, data } = props;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    let isMount = true;

    if (isMount && data) {
      form.setFieldsValue(data);
    }

    return () => {
      isMount = false;
    };
  }, [data]);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = async (params: any) => {
    console.log('params', params);
    let payload = {
      val: {
        ...params,
        licenseAgent: [params.licenseAgent],
        licenseBackroom: [params.licenseBackroom],
        licenseSVP: [params.licenseSVP],
        status: 1,
      },
      id,
    };

    console.log('payload', payload);
    setIsLoading(true);
    await timeout(1000);
    await mutate(payload);
    setIsLoading(false);
    await refetch();
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