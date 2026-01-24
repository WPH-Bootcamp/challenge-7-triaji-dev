import type { OrderStatus, PaymentMethod } from './api';

export interface Order {
  id: number;
  transactionId: string;
  status: OrderStatus;
  totalAmount: number;
  deliveryAddress: string;
  paymentMethod: PaymentMethod;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDeliveryTime?: string;
  actualDeliveryTime?: string;
  restaurant: {
    id: number;
    name: string;
    location: string;
    phone?: string;
  };
  items: OrderItem[];
  delivery?: {
    driverName?: string;
    driverPhone?: string;
    trackingUrl?: string;
  };
}

export interface OrderItem {
  id: number;
  menuId: number;
  menuName: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
}

export interface OrderSummary {
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount?: number;
  total: number;
}

export interface OrderTracking {
  orderId: number;
  status: OrderStatus;
  timeline: OrderTimelineEvent[];
}

export interface OrderTimelineEvent {
  status: OrderStatus;
  timestamp: string;
  description: string;
  location?: string;
}
