'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { timeout } from '@/utils/utilitys';

interface StoreAlert {
  type: string;
  status: string;
  hit: boolean;
}

interface IStoreAuth {
  alert: StoreAlert;

  setAlert: (payload: { status: string; hit: boolean; type: string }) => void;
}

const initialState = {
  alert: {
    type: 'success',
    status: '',
    hit: false,
  },
};

export const useAlertStore = create<IStoreAuth>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        async setAlert(payload: {
          status: string;
          hit: boolean;
          type: string;
        }) {
          // set alert
          set(
            () => ({
              alert: {
                type: payload.type,
                status: payload.status,
                hit: true,
              },
            }),
            false
          );

          await timeout(1000);

          // set init state
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
  )
);
