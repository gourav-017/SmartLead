import React from 'react';
import StatsCard from './StatsCard';

const StatsGrid = ({ stats, loading }) => {
  if (!stats && !loading) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      <StatsCard
        label="Total Leads"
        value={stats?.total}
        type="total"
        loading={loading}
      />
      <StatsCard
        label="Verified"
        value={stats?.verified}
        type="verified"
        loading={loading}
      />
      <StatsCard
        label="To Check"
        value={stats?.toCheck}
        type="toCheck"
        loading={loading}
      />
      <StatsCard
        label="Synced to CRM"
        value={stats?.synced}
        type="synced"
        loading={loading}
      />
    </div>
  );
};

export default StatsGrid;

