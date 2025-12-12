import React, { useState, useCallback } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import StatsGrid from './components/StatsGrid';
import LeadForm from './components/LeadForm';
import FilterButtons from './components/FilterButtons';
import LeadsTable from './components/LeadsTable';
import { useLeads } from './hooks/useLeads';
import { useStats } from './hooks/useStats';
import { LEAD_STATUS } from './constants/status';

function App() {
  const [filterStatus, setFilterStatus] = useState(LEAD_STATUS.ALL);
  const { leads, loading: leadsLoading, refetch: refetchLeads } = useLeads(filterStatus);
  const { stats, loading: statsLoading, refetch: refetchStats } = useStats();

  const handleFormSuccess = useCallback(async () => {
    // Refetch both leads and stats after successful form submission
    try {
      await Promise.all([refetchLeads(), refetchStats()]);
    } catch (error) {
      console.error('Error refetching data:', error);
    }
  }, [refetchLeads, refetchStats]);

  const handleFilterChange = useCallback((status) => {
    setFilterStatus(status);
  }, []);

  return (
    <div className="min-h-screen p-5">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <div className="max-w-7xl mx-auto">
        <Header />
        
        <StatsGrid stats={stats} loading={statsLoading} />
        
        <LeadForm onSuccess={handleFormSuccess} />
        
        <FilterButtons
          filterStatus={filterStatus}
          onFilterChange={handleFilterChange}
        />
        
        <LeadsTable leads={leads} loading={leadsLoading} />
      </div>
    </div>
  );
}

export default App;
