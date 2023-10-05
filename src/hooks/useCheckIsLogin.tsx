'use client';

import React from 'react';
// import { useRouter } from 'next/navigation';
import { timeout } from '@/utils/utilitys';
import { useAuthStore } from '@/store';

const useCheckIsLogin = () => {
  const { user } = useAuthStore((state) => state);
  // const { replace } = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLogin, setIsLogin] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsLoading(true);
    if (user === null) {
      // replace('/');
      // return;
    } else {
      setIsLogin(true);
    }

    timeout(3000);

    setIsLogin(true);
    setIsLoading(false);
  }, [user]);

  return { isLoading, isLogin };
};

export default useCheckIsLogin;
