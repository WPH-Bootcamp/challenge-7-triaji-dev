export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  restaurantId: number;
  isAvailable?: boolean;
  ingredients?: string[];
  allergens?: string[];
  nutritionInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
}

export interface MenuCategory {
  id: number;
  name: string;
  description?: string;
  image?: string;
  restaurantId: number;
  sortOrder?: number;
}

export interface MenuFilters {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  isAvailable?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}
