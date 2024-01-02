export interface Checkout {
  total: number;
  name: string;
  productType: string;
  productCategory: string;
  method: string;
  payment_type: string;
  checkout: CheckoutElement[];
}

export interface CheckoutElement {
  id: string;
  quantity: number;
  name: string;
  type: string;
}
