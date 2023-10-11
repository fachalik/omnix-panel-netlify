import React from 'react';

import { useNotificatonStore } from '@/store';

import { notification } from 'antd';

const NotificationContext = () => {
  const { notification: notificationStore } = useNotificatonStore();
  const [api, contextHolder] = notification.useNotification();

  React.useEffect(() => {
    let hitAlert = true;

    if (hitAlert) {
      if (notificationStore.hit) {
        api.open({
          message: notificationStore.message,
          description: notificationStore.description,
          type: notificationStore.type,
        });
      }
    }
    return () => {
      hitAlert = false;
    };
  }, [notificationStore]);

  return <>{contextHolder}</>;
};

export default NotificationContext;
