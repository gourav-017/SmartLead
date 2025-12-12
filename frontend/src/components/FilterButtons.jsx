import React from 'react';
import { FaFilter, FaCheckCircle, FaExclamationTriangle, FaList } from 'react-icons/fa';
import { LEAD_STATUS } from '../constants/status';

const FilterButtons = ({ filterStatus, onFilterChange }) => {
  const filters = [
    { value: LEAD_STATUS.ALL, label: 'All', icon: FaList },
    { value: LEAD_STATUS.VERIFIED, label: 'Verified', icon: FaCheckCircle },
    { value: LEAD_STATUS.TO_CHECK, label: 'To Check', icon: FaExclamationTriangle },
  ];

  return (
    <div className="bg-white rounded-xl p-5 mb-8 shadow-md flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex items-center gap-2">
        <FaFilter className="text-indigo-500" />
        <label className="font-semibold text-gray-700">Filter by Status:</label>
      </div>
      <div className="flex flex-wrap gap-2.5 w-full sm:w-auto">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = filterStatus === filter.value;
          
          return (
            <button
              key={filter.value}
              className={`w-full sm:w-auto px-4 py-2 border-2 rounded-md font-medium transition-all flex items-center gap-2 justify-center ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent shadow-md'
                  : 'border-gray-200 bg-white hover:border-indigo-500 hover:text-indigo-500 hover:shadow-sm'
              }`}
              onClick={() => onFilterChange(filter.value)}
            >
              <Icon />
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterButtons;

