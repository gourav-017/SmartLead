import React from 'react';
import { FaSpinner, FaCheckCircle, FaClock, FaGlobe, FaUser, FaChartBar } from 'react-icons/fa';
import { formatConfidence } from '../utils/formatters';
import { STATUS_COLORS } from '../constants/status';

const LeadsTable = ({ leads, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-md">
        <div className="flex flex-col items-center justify-center py-20">
          <FaSpinner className="text-4xl text-indigo-500 animate-spin mb-4" />
          <p className="text-gray-500 text-lg">Loading leads...</p>
        </div>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-md">
        <div className="flex flex-col items-center justify-center py-20">
          <FaUser className="text-6xl text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No leads found</h3>
          <p className="text-gray-500">Process some names to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-8 shadow-md">
      <div className="flex items-center gap-2 mb-5">
        <FaChartBar className="text-indigo-500 text-xl" />
        <h2 className="text-gray-800 text-2xl font-semibold">Processed Leads</h2>
        <span className="ml-auto px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-semibold">
          {leads.length} {leads.length === 1 ? 'lead' : 'leads'}
        </span>
      </div>
      <div className="overflow-x-auto">
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
                    <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
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

