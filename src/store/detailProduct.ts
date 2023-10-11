import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface StoreDetailProduct {
  data: any;
}

interface IStoreDetailProduct {
  detailProduct: StoreDetailProduct;
  setDetailProduct: (data: any) => void;
  setRemoveProduct: () => void;
}

const initialState = {
  detailProduct: {
    data: {},
  },
};

export const useDetailProduct = create<IStoreDetailProduct>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        setDetailProduct(data: any) {
          set(
            () => ({
              detailProduct: { data },
            }),
            false
          );
        },

        setRemoveProduct() {
          set(() => initialState, false);
        },
      }),
      {
        name: 'omnix-detail-product-state',
      }
    )
  )
);
