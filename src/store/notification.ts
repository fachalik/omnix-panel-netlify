import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { timeout } from '@/utils/utilitys';

type TNotification = 'success' | 'error' | 'info' | 'warning';
interface StoreNotification {
  message: string;
  description: string;
  type: TNotification;
  hit: boolean;
}

interface IStoreNotification {
  notification: StoreNotification;

  setNotification: (payload: {
    description: string;
    message: string;
    hit: boolean;
    type: TNotification;
  }) => void;
}

const initialState: { notification: StoreNotification } = {
  notification: {
    message: '',
    description: '',
    type: 'success',
    hit: false,
  },
};

export const useNotificatonStore = create<IStoreNotification>()(
  devtools(
    (set) => ({
      ...initialState,

      async setNotification(payload: {
        description: string;
        message: string;
        hit: boolean;
        type: TNotification;
      }) {
        set(
          () => ({
            notification: {
              message: payload.message,
              description: payload.description,
              type: payload.type,
              hit: payload.hit,
            },
          }),
          false
        );

        await timeout(1000);
        set(
          () => ({
            ...initialState,
          }),
          false
        );
      },
    }),
    {
      name: 'omnix-alert-state',
    }
  )
);
