'use client';
import { useEffect } from 'react';
import { useAuthStore } from './auth';
import { User } from '@/models/authModels';

type ReduxStore = {
  _persist: {
    version: number;
    rehydrated: boolean;
  };
  token: string | null;
  refreshToken: string | null;
  user: User | null;
};

type PersistedReduxStore = {
  [k in keyof ReduxStore]: Exclude<ReduxStore[k], null> extends Record<any, any>
    ? string | null
    : ReduxStore[k];
};
export default function PersistAdaptor() {
  const user = useAuthStore((state) => state);

  useEffect(() => {
    const storage = window.localStorage;
    const data: ReduxStore = {
      _persist: {
        version: 0,
        rehydrated: true,
      },
      token: null,
      refreshToken: null,
      user: null,
    } as const;

    // @ts-expect-error
    const persisted: PersistedReduxStore = {
      ...data,
      _persist: JSON.stringify(data._persist),
    };

    if (user == null) {
      storage.setItem('persist:user', JSON.stringify(persisted));
      return;
    }

    persisted.user = JSON.stringify(user);
    persisted.token = JSON.stringify(user.token);
    persisted.refreshToken = JSON.stringify(user?.refreshToken);
    storage.setItem('persist:user', JSON.stringify(persisted));
  }, [user]);
  return <></>;
}
