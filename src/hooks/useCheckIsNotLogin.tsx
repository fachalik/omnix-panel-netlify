import React from 'react';
// import { useRouter } from 'next/navigation';
import { timeout } from '@/utils/utilitys';
import { useAuthStore } from '@/store';
// import { adminRoutes, userRoutes, resellerRoutes } from '@/routes';

const useCheckIsNotLogin = () => {
  const { user } = useAuthStore((state) => state);
  // const { replace } = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isNotLogin, setIsNotLogin] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsLoading(true);
    // if (user !== null) {
    //   switch (user.role.name.toLowerCase()) {
    //     case 'user':
    //       replace(userRoutes[0].key);

    //     case 'admin':
    //       replace(adminRoutes[0].key);

    //     case 'reseller':
    //       replace(resellerRoutes[0].key);

    //     default:
    //       break;
    //   }

    //   setIsNotLogin(false);
    //   // return;
    // } else {
    //   setIsNotLogin(true);
    // }

    timeout(3000);

    setIsNotLogin(true);
    setIsLoading(false);
  }, [user]);

  return { isLoading, isNotLogin };
};

export default useCheckIsNotLogin;
