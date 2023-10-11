import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useAuthStore } from './auth';

interface StoreAlert {
  isModalOpen: boolean;
}

interface IStoreAuth extends StoreAlert {
  showModal: () => void;
  handleOk: () => void;
  handleCancel: () => void;
  reset: () => void;
}

const initialState = {
  isModalOpen: false,
};

export const useModalLogoutstore = create<IStoreAuth>()(
  devtools(
    (set) => ({
      ...initialState,

      showModal() {
        set(() => ({ isModalOpen: true }), false, 'modal-close-true');
      },

      handleOk() {
        set(() => ({ isModalOpen: false }), false, 'modal-close-false');
        useAuthStore.getState().logoutAuth();
      },

      handleCancel() {
        set(() => ({ isModalOpen: false }), false);
        useAuthStore.getState().logoutAuth();
      },

      reset() {
        set(() => initialState, false);
      },
    }),
    {
      name: 'omnix-modal-logout-state',
    }
  )
);
