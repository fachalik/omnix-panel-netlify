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
  package: StoreOrder | null;
  alacarte: StoreOrder[] | [];
  addon: StoreOrder[] | [];
  setPackage: (items: StoreOrder | null) => void;
}

const initialState = {
  package: null,
  alacarte: [],
  addon: [],
};

export const useOrderStore = create<IStoreOrder>()(
  devtools(
    (set, _get) => ({
      ...initialState,

      setPackage(items: StoreOrder | null) {
        set(
          (_state: IStoreOrder) => ({
            package: items,
          }),
          false,
          'set-package'
        );
      },
    }),
    {
      name: 'omnix-order-state',
    }
  )
);
