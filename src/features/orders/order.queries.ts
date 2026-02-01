'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { orderService } from '@/services/order';
import { cartKeys } from '@/features/cart/cart.queries';
import type { CheckoutRequest, OrderStatus } from '@/types/api';

// Query Keys
export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  list: (status: OrderStatus, page: number) =>
    [...orderKeys.lists(), status, page] as const,
};

// Checkout - create order from menu items
export function useCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CheckoutRequest) => {
      const response = await orderService.checkout(data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.list() });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
    onError: (error) => {
      console.error('Checkout failed:', error);
    },
  });
}

// Get user's orders
export function useMyOrders(
  status: OrderStatus = 'done',
  page: number = 1,
  limit: number = 10
) {
  return useQuery({
    queryKey: orderKeys.list(status, page),
    queryFn: async () => {
      const response = await orderService.getMyOrders({ status, page, limit });
      return response.data;
    },
    enabled: typeof window !== 'undefined' && !!Cookies.get('token'),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}
