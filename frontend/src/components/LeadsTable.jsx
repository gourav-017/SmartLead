import React from 'react';
import { FaSpinner, FaCheckCircle, FaClock, FaGlobe, FaUser, FaChartBar } from 'react-icons/fa';
import { formatConfidence } from '../utils/formatters';
import { STATUS_COLORS } from '../constants/status';

const LeadsTable = ({ leads, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col items-center justify-center py-14 sm:py-20">
          <FaSpinner className="text-4xl text-indigo-500 animate-spin mb-4" />
          <p className="text-gray-500 text-base sm:text-lg">Loading leads...</p>
        </div>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col items-center justify-center py-14 sm:py-20 text-center">
          <FaUser className="text-5xl sm:text-6xl text-gray-300 mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">No leads found</h3>
          <p className="text-gray-500">Process some names to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2 mb-5">
        <div className="flex items-center gap-2">
          <FaChartBar className="text-indigo-500 text-xl" />
          <h2 className="text-gray-800 text-xl sm:text-2xl font-semibold">Processed Leads</h2>
        </div>
        <span className="sm:ml-auto px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-semibold w-fit">
          {leads.length} {leads.length === 1 ? 'lead' : 'leads'}
        </span>
      </div>

      {/* Mobile-friendly cards */}
      <div className="grid gap-4 sm:hidden">
        {leads.map((lead, index) => (
          <div
            key={lead._id}
            className="border border-gray-100 rounded-lg p-4 shadow-sm animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Name</p>
                <p className="text-lg font-semibold text-gray-800">{lead.name}</p>
              </div>
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                  lead.status === 'Verified'
                    ? STATUS_COLORS[lead.status].bg + ' ' + STATUS_COLORS[lead.status].text
                    : STATUS_COLORS['To Check'].bg + ' ' + STATUS_COLORS['To Check'].text
                }`}
              >
                {lead.status === 'Verified' ? <FaCheckCircle className="text-[10px]" /> : <FaClock className="text-[10px]" />}
                {lead.status}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-sm font-medium">
                <FaGlobe className="text-xs" />
                {lead.predictedCountry}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-semibold">
                {lead.syncedToCRM ? (
                  <span className="inline-flex items-center gap-1 text-green-600">
                    <FaCheckCircle className="text-xs" /> Synced
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-gray-500">
                    <FaClock className="text-xs" /> Pending
                  </span>
                )}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-500 h-2 rounded-full transition-all"
                  style={{ width: `${lead.confidenceScore * 100}%` }}
                ></div>
              </div>
              <span className="text-gray-800 font-mono font-semibold text-xs">
                {formatConfidence(lead.confidenceScore)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">
                <div className="flex items-center gap-2">
                  <FaUser />
                  Name
                </div>
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">
                <div className="flex items-center gap-2">
                  <FaGlobe />
                  Predicted Country
                </div>
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">
                Confidence Score
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">
                Status
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">
                Synced
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr
                key={lead._id}
                className="hover:bg-gray-50 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <td className="px-4 py-3 border-b border-gray-200 text-gray-800 font-semibold">
                  {lead.name}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-gray-800">
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-sm font-medium">
                    {lead.predictedCountry}
                  </span>
                </td>
                <td className="px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[120px]">
                      <div
                        className="bg-indigo-500 h-2 rounded-full transition-all"
                        style={{ width: `${lead.confidenceScore * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-800 font-mono font-semibold text-sm">
                      {formatConfidence(lead.confidenceScore)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 border-b border-gray-200">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                      lead.status === 'Verified'
                        ? STATUS_COLORS[lead.status].bg + ' ' + STATUS_COLORS[lead.status].text
                        : STATUS_COLORS['To Check'].bg + ' ' + STATUS_COLORS['To Check'].text
                    }`}
                  >
                    {lead.status === 'Verified' ? (
                      <FaCheckCircle className="text-xs" />
                    ) : (
                      <FaClock className="text-xs" />
                    )}
                    {lead.status}
                  </span>
                </td>
                <td className="px-4 py-3 border-b border-gray-200">
                  {lead.syncedToCRM ? (
                    <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
                      <FaCheckCircle />
                      Synced
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-gray-500">
                      <FaClock />
                      Pending
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsTable;

