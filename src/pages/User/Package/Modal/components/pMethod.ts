export type PaymentMethodType = {
  code: number;
  title: string;
  description: string;
  disabled: boolean;
  icon: string;
};

export const paymentMethod = [
  {
    code: 1,
    title: 'Recurring Payment',
    description: 'Charge automatically your credit card in every month',
    disabled: false,
    icon: 'ri-bank-card-fill',
  },
  {
    code: 2,
    title: 'Single Payment',
    description: 'Payment with e-wallet / debit card / credit card / QRIS',
    disabled: false,
    icon: 'ri-secure-payment-fill',
  },
];
