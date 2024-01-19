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
  tenant_name: string;
  productId?: string;
  setCheckout: (items: StoreOrder[]) => void;
  setProductId: (id: string) => void;
  setPlan: (plan: string) => void;
  setProductCategory: (category: string) => void;
  setProductType: (type: string) => void;
  setTenantName: (name: string) => void;
  reset: () => void;
}

const initialState = {
  productId: '',
  checkout: [],
  plan: 'MONTHLY',
  productCategory: '',
  productType: '',
  tenant_name: '',
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

      setProductId(id: string) {
        set(
          (_state: IStoreOrder) => ({
            productId: id,
          }),
          false,
          'set-product-id'
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

      setTenantName(name: string) {
        set(
          (_state: IStoreOrder) => ({
            tenant_name: name,
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
