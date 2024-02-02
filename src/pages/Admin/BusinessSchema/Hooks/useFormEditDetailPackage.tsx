import React from 'react';

import { Form } from 'antd';
import { timeout } from '@/utils/utilitys';

import { FieldTypeUpdateProduct } from '../models/businessSchema';

interface IUserFormTeam {
  mutate: any;
  refetch: any;
  id: string;
  role?: string;
  user?: string;
}

export default function useFormDetailPackage(props: IUserFormTeam) {
  const { mutate, refetch, id } = props;
  const [watchData, setWatchData] =
    React.useState<FieldTypeUpdateProduct | null>(null);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<any>(null);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    setError(errorInfo);
  };

  const onFinish = async (params: any) => {
    // console.log('params', params);
    const { selectedProductPackages, ...rest } = params;
    let payload = {
      val: {
        ...rest,
        status: 1,
      },
      id,
    };

    if (params?.productsPackage.length !== 0) {
      payload['val']['productsPackage'] = params.productsPackage.map(
        (item: any) => {
          return {
            _id: item._id,
            quantity: item.quantity,
          };
        }
      );
    } else {
      payload['val']['productsPackage'] = [];
    }

    if (params?.addon.length !== 0) {
      payload['val']['addon'] = params.addon.map((item: any) => {
        return {
          _id:
            item._id.map((item2: any) => {
              const data = JSON.parse(item2);
              return {
                _id: data._id,
              };
            }) ?? [],
          addOnType: item.addOnType,
          purchaseRequired: item.purchaseRequired,
        };
      });
    }

    // console.log('payload', payload);
    setIsLoading(true);
    await timeout(1000);
    mutate(payload);
    refetch();
    setIsLoading(false);
  };

  const handleValuesChange = (_changedValues: any, allValues: any) => {
    // console.log('Changed values:', changedValues);
    // console.log('All values:', allValues);
    setWatchData(allValues);
  };

  return {
    form,
    watchData,
    error,
    handleValuesChange,
    onFinish,
    onFinishFailed,
    isLoading,
  };
}
