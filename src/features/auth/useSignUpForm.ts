'use client';

import { useState } from 'react';
import { useRegister } from './auth.queries';

interface SignUpData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  [key: string]: string;
}

interface UseSignUpFormOptions {
  onSuccess?: () => void;
}

export function useSignUpForm(options?: UseSignUpFormOptions) {
  const registerMutation = useRegister();

  const [data, setData] = useState<SignUpData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) => password.length >= 6;
  const validatePhone = (phone: string) =>
    /^[0-9+\-\s()]+$/.test(phone) && phone.length >= 10;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!data.name) newErrors.name = 'Name is required';
    if (!data.email) newErrors.email = 'Email is required';
    else if (!validateEmail(data.email))
      newErrors.email = 'Please enter a valid email';
    if (!data.phone) newErrors.phone = 'Phone number is required';
    else if (!validatePhone(data.phone))
      newErrors.phone = 'Please enter a valid phone number';
    if (!data.password) newErrors.password = 'Password is required';
    else if (!validatePassword(data.password))
      newErrors.password = 'Password must be at least 6 characters';
    if (!data.confirmPassword)
      newErrors.confirmPassword = 'Please confirm your password';
    else if (data.password !== data.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await registerMutation.mutateAsync({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });

      // Reset form
      setData({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      });

      if (options?.onSuccess) {
        options.onSuccess();
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const updateField = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  return {
    data,
    errors,
    showPassword,
    showConfirmPassword,
    isPending: registerMutation.isPending,
    error: registerMutation.error,
    handleSubmit,
    updateField,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  };
}
