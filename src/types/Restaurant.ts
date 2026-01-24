import type { Menu, Review } from './api';

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
  openingHours?: OpeningHours;
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  features?: string[];
  cuisine?: string[];
  deliveryInfo?: {
    deliveryFee: number;
    minimumOrder: number;
    estimatedTime: string;
    deliveryRadius: number;
  };
}

export interface RestaurantDetail extends Restaurant {
  menus: Menu[];
  reviews: Review[];
  gallery?: string[];
  about?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
}

export interface OpeningHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
  breaks?: {
    start: string;
    end: string;
  }[];
}

export interface RestaurantStats {
  totalOrders: number;
  averageRating: number;
  totalReviews: number;
  popularItems: string[];
}
