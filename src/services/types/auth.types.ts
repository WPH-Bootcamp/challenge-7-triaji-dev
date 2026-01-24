export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
}

export interface RegisterRequest {
  name: string;       // minLength: 2
  email: string;      // email format
  phone: string;
  password: string;   // minLength: 6
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// Update Profile uses multipart/form-data
export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: File; // For client-side handling
}
