import { useState, useEffect, useCallback } from 'react';
import { fetchLeads } from '../services/api';
import toast from 'react-hot-toast';

/**
 * Custom hook for managing leads data
 * @param {string} filterStatus - Status filter ('All', 'Verified', 'To Check')
 * @returns {{ leads: Array, loading: boolean, error: string | null, refetch: Function }}
 */
export const useLeads = (filterStatus = 'All') => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadLeads = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchLeads(filterStatus);
      setLeads(data);
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch leads';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error loading leads:', err);
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => {
    loadLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus]);

  return {
    leads,
    loading,
    error,
    refetch: loadLeads,
  };
};

