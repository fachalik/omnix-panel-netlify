import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface StoreOrder {
  id: string;
  name: string;
  type: string;
  price: number;
  quantity: number;
}

export interface IStoreOrder {
  checkout: StoreOrder[];
  setCheckout: (items: StoreOrder[]) => void;
}

const initialState = {
  checkout: [],
};

export const useOrderStore = create<IStoreOrder>()(
  devtools(
    (set, _get) => ({
      ...initialState,

      setCheckout(items: StoreOrder[]) {
        set(
          (_state: IStoreOrder) => ({
            checkout: items,
          }),
          false,
          'set-checkout'
        );
      },
    }),
    {
      name: 'omnix-order-state',
    }
  )
);
