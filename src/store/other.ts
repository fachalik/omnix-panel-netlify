'use client';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface StoreOther {
  sidebarCollapse: boolean;
}

interface IStoreOther {
  other: StoreOther;
  setSidebarCollapse: () => void;
}

const initialState = {
  other: {
    sidebarCollapse: true,
  },
};

export const useOtherStore = create<IStoreOther>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        setSidebarCollapse() {
          set(
            (state: any) => ({
              other: { sidebarCollapse: !state.other.sidebarCollapse },
            }),
            false
          );
        },
      }),
      {
        name: 'omnix-other-state',
      }
    )
  )
);
