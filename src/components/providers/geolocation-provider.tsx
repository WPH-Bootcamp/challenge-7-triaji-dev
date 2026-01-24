'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  calculateDistance,
  formatDistance,
  getMockCoordinates,
} from '@/lib/distance';
import type { Restaurant } from '@/types/Restaurant';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  loading: boolean;
  error: string | null;
  hasRequested: boolean;
}

interface GeolocationContextType extends GeolocationState {
  requestLocation: () => void;
  calculateRestaurantDistance: (restaurant: Restaurant) => string;
}

const GeolocationContext = createContext<GeolocationContextType | undefined>(
  undefined
);

interface GeolocationProviderProps {
  children: React.ReactNode;
  autoRequest?: boolean;
}

export const GeolocationProvider: React.FC<GeolocationProviderProps> = ({
  children,
  autoRequest = false,
}) => {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    loading: false,
    error: null,
    hasRequested: false,
  });

  const handleSuccess = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    setState((prev) => ({
      ...prev,
      latitude,
      longitude,
      loading: false,
      error: null,
    }));
  };

  const handleError = (error: GeolocationPositionError) => {
    let errorMessage = 'An unknown error occurred.';

    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage = 'Location access denied by user.';
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage = 'Location information is unavailable.';
        break;
      case error.TIMEOUT:
        errorMessage = 'Location request timed out.';
        break;
    }

    setState((prev) => ({
      ...prev,
      loading: false,
      error: errorMessage,
    }));
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Geolocation is not supported by this browser.',
        hasRequested: true,
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
      hasRequested: true,
    }));

    const options: PositionOptions = {
      enableHighAccuracy: true,
      maximumAge: 300000,
      timeout: 10000,
    };

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options
    );
  };

  const calculateRestaurantDistance = (restaurant: Restaurant): string => {
    if (state.loading && state.hasRequested) {
      return 'Loading...';
    }

    if (state.error || !state.latitude || !state.longitude) {
      return '-';
    }

    const restaurantCoords = getMockCoordinates(restaurant.place);
    const distanceKm = calculateDistance(
      state.latitude,
      state.longitude,
      restaurantCoords.lat,
      restaurantCoords.lng
    );

    return formatDistance(distanceKm);
  };

  useEffect(() => {
    if (autoRequest && !state.hasRequested) {
      const timer = setTimeout(() => {
        requestLocation();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [autoRequest, state.hasRequested]);

  const contextValue: GeolocationContextType = {
    ...state,
    requestLocation,
    calculateRestaurantDistance,
  };

  return (
    <GeolocationContext.Provider value={contextValue}>
      {children}
    </GeolocationContext.Provider>
  );
};

export const useGeolocationContext = () => {
  const context = useContext(GeolocationContext);
  if (context === undefined) {
    throw new Error(
      'useGeolocationContext must be used within a GeolocationProvider'
    );
  }
  return context;
};
