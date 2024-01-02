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
    title: 'Credit / Debit Card',
    description: 'Pay with Visa, MasterCard, JCB, or Amex',
    disabled: true,
    icon: 'ri-bank-card-fill',
  },
  {
    code: 2,
    title: 'ATM / Bank transfer',
    description: 'Pay from ATM Bersama, Prima or Alto',
    disabled: true,
    icon: 'ri-money-dollar-box-fill',
  },
  {
    code: 3,
    title: 'E-Wallets',
    description: 'Scan QR code using GoPay or other e-wallets',
    disabled: true,
    icon: 'ri-wallet-3-fill',
  },
  {
    code: 4,
    title: 'Others',
    description: 'Payment with snap midtrans',
    disabled: false,
    icon: 'ri-secure-payment-fill',
  },
];
