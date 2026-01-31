'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useProfile } from './auth.queries';
import { setUser, logout, restoreAuth } from './auth.slice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { token, user, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const {
    data: profileData,
    isLoading,
    isError,
    error,
    refetch,
  } = useProfile(isAuthenticated && !user);

  useEffect(() => {
    dispatch(restoreAuth());
  }, [dispatch]);

  useEffect(() => {
    if (profileData && !user) {
      dispatch(setUser(profileData));
    }
  }, [profileData, user, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const refreshProfile = async () => {
    const result = await refetch();
    if (result.data) {
      dispatch(setUser(result.data));
    }
    return result;
  };

  return {
    isAuthenticated,
    user,
    token,
    isLoading,
    isError,
    error,
    logout: handleLogout,
    refreshProfile,
  };
};
