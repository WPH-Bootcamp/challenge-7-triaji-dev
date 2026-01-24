export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'bni',
    name: 'BNI Bank Negara Indonesia',
    icon: '/icons/payments/bni.svg',
    description: 'Transfer via BNI Virtual Account',
  },
  {
    id: 'bca',
    name: 'BCA Bank Central Asia',
    icon: '/icons/payments/bca.svg',
    description: 'Transfer via BCA Virtual Account',
  },
  {
    id: 'mandiri',
    name: 'Bank Mandiri',
    icon: '/icons/payments/mandiri.svg',
    description: 'Transfer via Mandiri Virtual Account',
  },
  {
    id: 'bri',
    name: 'BRI Bank Rakyat Indonesia',
    icon: '/icons/payments/bri.svg',
    description: 'Transfer via BRI Virtual Account',
  },
  {
    id: 'gopay',
    name: 'GoPay',
    icon: '/icons/payments/gopay.svg',
    description: 'Pay with GoPay e-wallet',
  },
  {
    id: 'ovo',
    name: 'OVO',
    icon: '/icons/payments/ovo.svg',
    description: 'Pay with OVO e-wallet',
  },
  {
    id: 'dana',
    name: 'DANA',
    icon: '/icons/payments/dana.svg',
    description: 'Pay with DANA e-wallet',
  },
  {
    id: 'cod',
    name: 'Cash on Delivery',
    icon: '/icons/payments/cod.svg',
    description: 'Pay when your order arrives',
  },
];

export const DEFAULT_PAYMENT_METHOD = PAYMENT_METHODS[0];
