export type OrderStatus = 'preparing' | 'on_the_way' | 'delivered' | 'done' | 'cancelled';

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
