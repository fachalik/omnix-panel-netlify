import { StoreOrder } from '@/store/order';
export type FieldTypeProduct = {
  package: StoreOrder | null;
  alacarte: StoreOrder[] | [];
  addon: StoreOrder[] | [];
  package_addon: StoreOrder[] | [];
  alacarte_addon: StoreOrder[] | [];
};
