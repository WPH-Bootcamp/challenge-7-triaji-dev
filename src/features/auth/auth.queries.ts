'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { authService } from '@/services/auth';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UpdateProfileRequest,
  User,
} from '@/types/api';

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
};

// Login mutation
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const response = await authService.login(credentials);
      return response.data; 
    },
    onSuccess: (data) => {
      Cookies.set('token', data.token, { expires: 7 });
      Cookies.set('user', JSON.stringify(data.user), { expires: 7 });
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
}

// Register mutation
export function useRegister() {
  return useMutation({
    mutationFn: async (userData: RegisterRequest) => {
      const response = await authService.register(userData);
      return response; 
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });
}

// Get profile query
export function useProfile(enabled: boolean = true) {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: async () => {
      const response = await authService.getProfile();
      return response.data;
    },
    enabled: enabled && typeof window !== 'undefined' && !!Cookies.get('token'),
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000, 
    retry: false, 
  });
}

// Update profile mutation
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProfileRequest) => {
      const response = await authService.updateProfile(data);
      return response.data; 
    },
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.profile(), data);
      Cookies.set('user', JSON.stringify(data), { expires: 7 });
    },
    onError: (error) => {
      console.error('Profile update failed:', error);
    },
  });
}
