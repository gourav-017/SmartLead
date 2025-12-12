import { useState, useEffect, useCallback } from 'react';
import { fetchStats } from '../services/api';
import toast from 'react-hot-toast';

/**
 * Custom hook for managing statistics
 * @returns {{ stats: Object | null, loading: boolean, error: string | null, refetch: Function }}
 */
export const useStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchStats();
      setStats(data);
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch statistics';
      setError(errorMessage);
      // Don't show toast for stats errors as it's less critical
      console.error('Error loading stats:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
    
    // Refresh stats every 10 seconds
    const interval = setInterval(() => {
      loadStats();
    }, 10000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: loadStats,
  };
};

