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
  plan: string;
  productCategory: string;
  productType: string;
  setCheckout: (items: StoreOrder[]) => void;
  setPlan: (plan: string) => void;
  setProductCategory: (category: string) => void;
  setProductType: (type: string) => void;
  reset: () => void;
}

const initialState = {
  checkout: [],
  plan: 'MONTHLY',
  productCategory: '',
  productType: '',
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

      setPlan(plan: string) {
        set(
          (_state: IStoreOrder) => ({
            plan,
          }),
          false,
          'set-plan'
        );
      },

      setProductCategory(category: string) {
        set(
          (_state: IStoreOrder) => ({
            productCategory: category,
          }),
          false,
          'set-category'
        );
      },

      setProductType(type: string) {
        set(
          (_state: IStoreOrder) => ({
            productType: type,
          }),
          false,
          'set-type'
        );
      },

      reset() {
        set((_state: IStoreOrder) => initialState, false, 'set-reset');
      },
    }),
    {
      name: 'omnix-order-state',
    }
  )
);
