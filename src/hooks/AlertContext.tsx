'use client';

import React from 'react';

import { useAlertStore } from '@/store';

import { message } from 'antd';

const AlertContext = () => {
  const { alert } = useAlertStore();
  const [messageApi, contextHolder] = message.useMessage();

  React.useEffect(() => {
    let hitAlert = true;

    if (hitAlert) {
      if (alert.hit) {
        messageApi.open({
          type: alert.type === 'error' ? 'error' : 'success',
          content: alert.status,
        });
      }
    }
    return () => {
      hitAlert = false;
    };
  }, [alert]);

  return <>{contextHolder}</>;
};

export default AlertContext;
