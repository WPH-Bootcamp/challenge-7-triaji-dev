export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin' | 'staff';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  isVerified?: boolean;
  preferences?: UserPreferences;
  addresses?: Address[];
}

export interface UserPreferences {
  language: 'id' | 'en';
  currency: 'IDR' | 'USD';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  dietary?: {
    vegetarian?: boolean;
    vegan?: boolean;
    halal?: boolean;
    glutenFree?: boolean;
    allergies?: string[];
  };
}

export interface Address {
  id: number;
  label: string; // 'Home', 'Office', 'Other'
  fullAddress: string;
  latitude?: number;
  longitude?: number;
  isDefault: boolean;
  notes?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  isVerified: boolean;
}

export interface UserStats {
  totalOrders: number;
  totalSpent: number;
  favoriteRestaurants: string[];
  memberSince: string;
}
