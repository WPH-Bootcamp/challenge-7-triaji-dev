export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://restaurant-be-400174736012.asia-southeast2.run.app';

export const APP_NAME = 'Restaurant App';
export const APP_DESCRIPTION = 'Order your favorite food online';

export const PAYMENT_METHODS = [
  'BCA Virtual Account',
  'Mandiri Virtual Account',
  'BNI Virtual Account',
  'BRI Virtual Account',
  'Gopay',
  'OVO',
  'Dana',
  'ShopeePay',
];

export const ORDER_STATUS = {
  PREPARING: 'preparing',
  ON_THE_WAY: 'on_the_way',
  DELIVERED: 'delivered',
  DONE: 'done',
  CANCELLED: 'cancelled',
} as const;

export type OrderStatusType = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
