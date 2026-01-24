import { Review } from './review.types';

export interface Menu {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  isBestSeller: boolean;
}

export interface Restaurant {
  id: number;
  name: string;
  location: string;
  rating: number;
  category: string;
  imageUrl: string;
  range?: number;
  priceRange?: string;
}

export interface RestaurantDetail extends Restaurant {
  menus: Menu[];
  reviews: Review[];
}

export interface RestaurantFilters {
  location?: string;
  range?: number;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  category?: string;
  page?: number;
  limit?: number;
}
