import { api } from '@/lib/axios';
import type {
  ApiResponse,
  AddToCartRequest,
  UpdateCartItemRequest,
} from '@/types/api';

// Cart response types (matching API contract)
export interface CartItemMenu {
  id: number;
  foodName: string;
  price: number;
  type: string;
  image: string;
}

export interface CartItem {
  id: number;
  menu: CartItemMenu;
  quantity: number;
  itemTotal: number;
}

export interface CartRestaurant {
  id: number;
  name: string;
  logo: string;
}

export interface CartGroupedItem {
  restaurant: CartRestaurant;
  items: CartItem[];
  subtotal: number;
}

export interface CartResponse {
  cart: CartGroupedItem[];
  summary: {
    totalItems: number;
    totalPrice: number;
    restaurantCount: number;
  };
}

export const cartService = {
  /**
   * Get user's cart items grouped by restaurant
   */
  getCart: async () => {
    const response = await api.get<ApiResponse<CartResponse>>('/api/cart');
    return response.data;
  },

  /**
   * Add item to cart
   */
  addToCart: async (data: AddToCartRequest) => {
    const response = await api.post<ApiResponse<unknown>>('/api/cart', data);
    return response.data;
  },

  /**
   * Update cart item quantity
   */
  updateCartItem: async (id: number, data: UpdateCartItemRequest) => {
    const response = await api.put<ApiResponse<unknown>>(
      `/api/cart/${id}`,
      data
    );
    return response.data;
  },

  /**
   * Remove item from cart
   */
  deleteCartItem: async (id: number) => {
    const response = await api.delete<ApiResponse<unknown>>(`/api/cart/${id}`);
    return response.data;
  },

  /**
   * Clear entire cart
   */
  clearCart: async () => {
    const response = await api.delete<ApiResponse<unknown>>('/api/cart');
    return response.data;
  },
};

export default cartService;
