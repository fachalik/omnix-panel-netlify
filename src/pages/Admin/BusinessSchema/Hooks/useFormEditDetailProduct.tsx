import React from 'react';

import { Form } from 'antd';
import { timeout } from '@/utils/utilitys';

import { FieldTypeUpdateProduct } from '../models/businessSchema';

interface IUserFormTeam {
  mutate: any;
  refetch: any;
  id: string;
}

export default function useFormDetailProduct(props: IUserFormTeam) {
  const [watchData, setWatchData] =
    React.useState<FieldTypeUpdateProduct | null>(null);
  const { mutate, refetch, id } = props;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = async (params: any) => {
    console.log('params', params);
    let payload = {
      val: {
        ...params,
        status: 1,
      },
      id,
    };

    if (params?.licenseAgent) {
      payload['val']['licenseAgent'] = [params.licenseAgent];
    } else {
      payload['val']['licenseAgent'] = [];
    }

    if (params?.licenseBackroom) {
      payload['val']['licenseBackroom'] = [params.licenseBackroom];
    } else {
      payload['val']['licenseBackroom'] = [];
    }

    if (params?.licenseSVP) {
      payload['val']['licenseSVP'] = [params.licenseSVP];
    } else {
      payload['val']['licenseSVP'] = [];
    }

    if (params?.minQuantity) {
      payload['val']['minQuantity'] = +params.minQuantity;
    } else {
      payload['val']['minQuantity'] = 0;
    }

    if (params?.maxQuantity) {
      payload['val']['maxQuantity'] = +params.maxQuantity;
    } else {
      payload['val']['maxQuantity'] = 0;
    }

    console.log('payload', payload);
    setIsLoading(true);
    await timeout(1000);
    mutate(payload);
    refetch();
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
