import { useAuthStore } from '@/store';
import { useEffect, useState } from 'react';
import { getLogin } from '@/utils/sessions';

export default function UseAuth() {
  const { user } = useAuthStore((state) => state);
  const [auth, setAuth] = useState(getLogin());

  useEffect(() => {
    setAuth(getLogin());
  }, [user]);

  return {
    auth,
    isLogin: Boolean(auth.access_token),
    role: auth ? auth?.user?.role?.name : 'no user',
  };
}
