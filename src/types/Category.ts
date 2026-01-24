export interface Category {
  id: number;
  name: string;
  description?: string;
  image?: string;
  sortOrder?: number;
  isActive?: boolean;
  restaurantCount?: number;
}

export interface CategoryFilters {
  isActive?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}
