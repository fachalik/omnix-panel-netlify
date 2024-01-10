export interface Checkout {
  tenant_name: string;
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

export interface CheckoutSubscribe {
  tenant_name: string;
  total: number;
  payment_type?: string;
  cardNumber_cc?: number;
  cardExpMonth_cc?: number;
  cardExpYear_cc?: number;
  cardCvv_cc?: number;
  phone_number_gopay?: number;
  country_code_gopay?: number;
  name: string;
  productType: string;
  productCategory: string;
  checkout: CheckoutElement[];
}
