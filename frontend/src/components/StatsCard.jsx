import React from 'react';
import { FaUsers, FaCheckCircle, FaExclamationTriangle, FaSync } from 'react-icons/fa';

const iconMap = {
  total: FaUsers,
  verified: FaCheckCircle,
  toCheck: FaExclamationTriangle,
  synced: FaSync,
};

const borderColorMap = {
  total: '',
  verified: 'border-t-4 border-green-500',
  toCheck: 'border-t-4 border-amber-500',
  synced: 'border-t-4 border-blue-500',
};

const StatsCard = ({ label, value, type = 'total', loading = false }) => {
  const Icon = iconMap[type] || FaUsers;
  const borderClass = borderColorMap[type] || '';

  return (
    <div
      className={`bg-white rounded-xl p-5 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${borderClass}`}
    >
      <div className="flex items-center justify-center mb-2">
        <Icon className={`text-2xl ${
          type === 'verified' ? 'text-green-500' :
          type === 'toCheck' ? 'text-amber-500' :
          type === 'synced' ? 'text-blue-500' :
          'text-indigo-500'
        }`} />
      </div>
      {loading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-16 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
        </div>
      ) : (
        <>
          <div className="text-3xl font-bold text-gray-800 mb-1">{value ?? 0}</div>
          <div className="text-xs text-gray-500 uppercase tracking-wider">{label}</div>
        </>
      )}
    </div>
  );
};

export default StatsCard;

