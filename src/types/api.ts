// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  errors?: Record<string, string[]> | null;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

// User & Auth types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin' | 'staff';
  avatar?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface UpdateProfileRequest {
  name?: string;
  phone?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// Restaurant types
export interface Restaurant {
  id: number;
  name: string;
  description?: string;
  place: string;
  star: number;
  logo: string;
  images: string[];
  reviewCount: number;
  menuCount: number;
  priceRange: {
    min: number;
    max: number;
  };
  isOpen?: boolean;
}

export interface RestaurantDetail extends Restaurant {
  menus: Menu[];
  reviews: Review[];
}

export interface RestaurantFilters {
  location?: string;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  page?: number;
  limit?: number;
}

// Menu types
export interface Menu {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

// Cart types
export interface CartItem {
  id: number;
  menuId: number;
  quantity: number;
  itemTotal: number;
  menu: {
    name: string;
    price: number;
    image: string;
  };
  restaurant: {
    id: number;
    name: string;
  };
}

export interface Cart {
  items: CartItem[];
  summary: {
    totalItems: number;
    totalPrice: number;
  };
}

export interface AddToCartRequest {
  restaurantId: number;
  menuId: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

// Order types
export type OrderStatus =
  | 'preparing'
  | 'on_the_way'
  | 'delivered'
  | 'done'
  | 'cancelled';
export type PaymentMethod = 'credit_card' | 'debit_card' | 'cash' | 'e_wallet';

export interface Order {
  id: number;
  transactionId: string;
  status: OrderStatus;
  totalAmount: number;
  deliveryAddress: string;
  paymentMethod: PaymentMethod;
  notes?: string;
  createdAt: string;
  restaurant: {
    name: string;
    location: string;
  };
  items: OrderItem[];
}

export interface OrderItem {
  menuName: string;
  quantity: number;
  price: number;
}

export interface CreateOrderRequest {
  deliveryAddress: string;
  paymentMethod: PaymentMethod;
  notes?: string;
}

export interface CreateOrderResponse {
  transactionId: string;
  orderId: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  deliveryAddress: string;
  status: OrderStatus;
}

export interface OrderFilters {
  status?: OrderStatus;
  page?: number;
  limit?: number;
}

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
}

// Review types
export interface Review {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  user?: {
    name: string;
    avatar?: string;
  };
  restaurant?: {
    name: string;
    image: string;
  };
}

export interface CreateReviewRequest {
  transactionId: string;
  restaurantId: number;
  star: number;
  comment: string;
}

export interface UpdateReviewRequest {
  star: number;
  comment: string;
}

export interface ReviewFilters {
  rating?: number;
  page?: number;
  limit?: number;
}

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    '5': number;
    '4': number;
    '3': number;
    '2': number;
    '1': number;
  };
}

export interface RestaurantReviewsResponse {
  reviews: Review[];
  pagination: PaginationMeta;
  summary: ReviewSummary;
}

export interface MyReviewsResponse {
  reviews: Review[];
  pagination: PaginationMeta;
  summary: {
    totalReviews: number;
    averageRating: number;
  };
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Async thunk states
export interface AsyncState<T = unknown> extends LoadingState {
  data: T | null;
}
