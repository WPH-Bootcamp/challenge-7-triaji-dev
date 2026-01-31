'use client';

import { useState, useCallback } from 'react';
import { useSearchState } from '@/features/restaurant/use-search';
import { useScrollToTop } from '@/hooks/use-scroll-to-top';

export function useHomePage() {
  const [showSearchMode, setShowSearchMode] = useState(false);

  useScrollToTop();

  const {
    searchQuery,
    hasSearched,
    handleSearch,
    clearSearch,
    setSearchComplete,
  } = useSearchState();

  const handleToggleSearchMode = useCallback(() => {
    setShowSearchMode((prev) => !prev);
  }, []);

  const handleSearchFromRecommended = useCallback(
    (query: string) => {
      handleSearch(query);
      setShowSearchMode(false);
    },
    [handleSearch]
  );

  const hideSearchMode = useCallback(() => {
    setShowSearchMode(false);
  }, []);

  return {
    // State
    showSearchMode,
    searchQuery,
    hasSearched,

    // Handlers
    handleSearch,
    clearSearch,
    setSearchComplete,
    handleToggleSearchMode,
    handleSearchFromRecommended,
    hideSearchMode,
  };
}
