import { OrderStatus } from './common.types';

export interface CheckoutItem {
  menuId: number;
  quantity: number;
}

export interface CheckoutRestaurant {
  restaurantId: number;
  items: CheckoutItem[];
}

export interface CheckoutRequest {
  restaurants: CheckoutRestaurant[];
  deliveryAddress: string;
  phone?: string;
  paymentMethod?: string;
  notes?: string;
}

export interface Order {
  transactionId: string;
  restaurantId: number;
  restaurantName: string;
  totalAmount: number;
  status: OrderStatus;
  items: CheckoutItem[];
  createdAt: string;
}
