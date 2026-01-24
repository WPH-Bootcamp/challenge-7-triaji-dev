export interface CartItem {
  id: number;
  menuId: number;
  restaurantId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface CartGrouped {
  restaurantId: number;
  restaurantName: string;
  items: CartItem[];
}

export interface AddToCartRequest {
  restaurantId: number;
  menuId: number;
  quantity?: number; // default: 1
}

export interface UpdateCartItemRequest {
  quantity: number;
}
