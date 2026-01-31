'use client';

import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addItem,
  updateQuantity,
  removeItem,
  clearCart,
  setCartItems,
  toggleSheet,
  openSheet,
  closeSheet,
  selectCartItems,
  selectCartIsOpen,
  selectCartTotal,
  selectCartItemCount,
} from './cart.slice';
import {
  useServerCart,
  useAddToCart,
  useUpdateCartItem,
  useRemoveCartItem,
  useClearCart,
  cartKeys,
} from './cart.queries';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { CartItem } from '@/types/api';

export function useCart() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  // Redux state
  const items = useAppSelector(selectCartItems);
  const isOpen = useAppSelector(selectCartIsOpen);
  const total = useAppSelector(selectCartTotal);
  const itemCount = useAppSelector(selectCartItemCount);

  // Server queries
  const { data: serverCart, isLoading: isLoadingCart } = useServerCart();
  const addToCartMutation = useAddToCart();
  const updateItemMutation = useUpdateCartItem();
  const removeItemMutation = useRemoveCartItem();
  const clearCartMutation = useClearCart();

  // Sync server cart to Redux when fetched
  useEffect(() => {
    if (serverCart?.cart) {
      const flatItems: CartItem[] = serverCart.cart.flatMap((group) =>
        group.items.map((item) => ({
          id: item.id,
          menuId: item.menu.id,
          restaurantId: group.restaurant.id,
          name: item.menu.foodName,
          price: item.menu.price,
          quantity: item.quantity,
          imageUrl: item.menu.image,
        }))
      );
      dispatch(setCartItems(flatItems));
    }
  }, [serverCart, dispatch]);

  // Add to cart with optimistic UI
  const handleAddToCart = useCallback(
    async (
      restaurantId: number,
      menuId: number,
      quantity: number = 1,
      menuData?: Partial<CartItem>
    ) => {
      const tempId = Date.now();
      const optimisticItem: CartItem = {
        id: tempId,
        menuId,
        restaurantId,
        name: menuData?.name || 'Loading...',
        price: menuData?.price || 0,
        quantity,
        imageUrl: menuData?.imageUrl || '',
      };
      dispatch(addItem(optimisticItem));
      dispatch(openSheet());

      try {
        await addToCartMutation.mutateAsync({
          restaurantId,
          menuId,
          quantity,
        });
        toast.success('Added to cart!');
      } catch (error) {
        dispatch(removeItem(tempId));
        toast.error('Failed to add to cart');
        console.error('Add to cart error:', error);
      }
    },
    [dispatch, addToCartMutation]
  );

  // Update quantity with optimistic UI
  const handleUpdateQuantity = useCallback(
    async (id: number, quantity: number) => {
      const previousItems = items;
      const previousQuantity = items.find((item) => item.id === id)?.quantity;

      dispatch(updateQuantity({ id, quantity }));

      try {
        await updateItemMutation.mutateAsync({ id, data: { quantity } });
      } catch (error) {
        if (previousQuantity !== undefined) {
          dispatch(updateQuantity({ id, quantity: previousQuantity }));
        } else {
          dispatch(setCartItems(previousItems));
        }
        toast.error('Failed to update quantity');
        console.error('Update quantity error:', error);
      }
    },
    [dispatch, items, updateItemMutation]
  );

  // Remove item with optimistic UI
  const handleRemoveItem = useCallback(
    async (id: number) => {
      const removedItem = items.find((item) => item.id === id);

      dispatch(removeItem(id));

      try {
        await removeItemMutation.mutateAsync(id);
        toast.success('Item removed from cart');
      } catch (error) {
        if (removedItem) {
          dispatch(addItem(removedItem));
        }
        toast.error('Failed to remove item');
        console.error('Remove item error:', error);
      }
    },
    [dispatch, items, removeItemMutation]
  );

  // Clear cart with optimistic UI
  const handleClearCart = useCallback(async () => {
    const previousItems = items;

    dispatch(clearCart());

    try {
      await clearCartMutation.mutateAsync();
      toast.success('Cart cleared');
    } catch (error) {
      dispatch(setCartItems(previousItems));
      toast.error('Failed to clear cart');
      console.error('Clear cart error:', error);
    }
  }, [dispatch, items, clearCartMutation]);

  // Refresh cart from server
  const refreshCart = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: cartKeys.list() });
  }, [queryClient]);

  return {
    // State
    items,
    isOpen,
    total,
    itemCount,
    isLoading: isLoadingCart,
    isUpdating:
      addToCartMutation.isPending ||
      updateItemMutation.isPending ||
      removeItemMutation.isPending ||
      clearCartMutation.isPending,

    // Actions
    addToCart: handleAddToCart,
    updateQuantity: handleUpdateQuantity,
    removeItem: handleRemoveItem,
    clearCart: handleClearCart,
    refreshCart,

    // Sheet controls
    toggleSheet: () => dispatch(toggleSheet()),
    openSheet: () => dispatch(openSheet()),
    closeSheet: () => dispatch(closeSheet()),
  };
}
