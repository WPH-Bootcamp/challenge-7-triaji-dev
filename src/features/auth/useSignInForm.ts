'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from './auth.queries';
import { ROUTES } from '@/constants';

interface SignInData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  [key: string]: string;
}

interface UseSignInFormOptions {
  onSuccess?: () => void;
}

export function useSignInForm(options?: UseSignInFormOptions) {
  const router = useRouter();
  const loginMutation = useLogin();

  const [data, setData] = useState<SignInData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) => password.length >= 6;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!data.email) newErrors.email = 'Email is required';
    else if (!validateEmail(data.email))
      newErrors.email = 'Please enter a valid email';
    if (!data.password) newErrors.password = 'Password is required';
    else if (!validatePassword(data.password))
      newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
      });

      if (options?.onSuccess) {
        options.onSuccess();
      } else {
        router.push(ROUTES.HOME);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const updateField = (field: string, value: string | boolean) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return {
    data,
    errors,
    showPassword,
    isPending: loginMutation.isPending,
    error: loginMutation.error,
    handleSubmit,
    updateField,
    togglePasswordVisibility,
  };
}
