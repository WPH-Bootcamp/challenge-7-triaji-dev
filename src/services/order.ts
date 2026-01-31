import { api } from '@/lib/axios';
import type {
  ApiResponse,
  CheckoutRequest,
  Order,
  OrderStatus,
  PaginatedResponse,
} from '@/types/api';

export const orderService = {
  /**
   * Checkout - create order from menu items
   */
  checkout: async (data: CheckoutRequest) => {
    const response = await api.post<ApiResponse<unknown>>(
      '/api/order/checkout',
      data
    );
    return response.data;
  },

  /**
   * Get user's orders
   */
  getMyOrders: async (params?: {
    status?: OrderStatus;
    page?: number;
    limit?: number;
  }) => {
    const { status = 'done', page = 1, limit = 10 } = params || {};
    const response = await api.get<ApiResponse<PaginatedResponse<Order>>>(
      '/api/order/my-order',
      { params: { status, page, limit } }
    );
    return response.data;
  },
};

export default orderService;
