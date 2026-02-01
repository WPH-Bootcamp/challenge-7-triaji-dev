'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { cartService, type CartResponse } from '@/services/cart';
import type { AddToCartRequest, UpdateCartItemRequest } from '@/types/api';

// Query keys
export const cartKeys = {
  all: ['cart'] as const,
  list: () => [...cartKeys.all, 'list'] as const,
};

// Get user's cart
export function useServerCart(enabled: boolean = true) {
  return useQuery({
    queryKey: cartKeys.list(),
    queryFn: async () => {
      const response = await cartService.getCart();
      return response.data; 
    },
    enabled: enabled && typeof window !== 'undefined' && !!Cookies.get('token'),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}

// Add item to cart
export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddToCartRequest) => {
      const response = await cartService.addToCart(data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.list() });
    },
    onError: (error) => {
      console.error('Add to cart failed:', error);
    },
  });
}

// Update cart item quantity
export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: UpdateCartItemRequest;
    }) => {
      const response = await cartService.updateCartItem(id, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.list() });
    },
    onError: (error) => {
      console.error('Update cart item failed:', error);
    },
  });
}

// Remove cart item
export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await cartService.deleteCartItem(id);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.list() });
    },
    onError: (error) => {
      console.error('Remove cart item failed:', error);
    },
  });
}

// Clear entire cart

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await cartService.clearCart();
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.list() });
    },
    onError: (error) => {
      console.error('Clear cart failed:', error);
    },
  });
}
