import React, { useState } from 'react';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa';
import { processLeads } from '../services/api';
import { validateNamesInput } from '../utils/validators';
import toast from 'react-hot-toast';

const LeadForm = ({ onSuccess }) => {
  const [namesInput, setNamesInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    const validation = validateNamesInput(namesInput);
    if (!validation.isValid) {
      toast.error(validation.error);
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading('Processing leads...');

    try {
      const response = await processLeads(validation.names);
      
      toast.success(
        `Successfully processed ${response.leads.length} lead(s)!`,
        { id: loadingToast }
      );

      // Clear input
      setNamesInput('');

      // Notify parent component
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      const errorMessage = error.message || 'Failed to process leads. Please try again.';
      toast.error(errorMessage, { id: loadingToast });
      console.error('Error processing leads:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 mb-8 shadow-md hover:shadow-lg transition-shadow">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2.5">
          <label htmlFor="names" className="font-semibold text-gray-700 text-sm sm:text-base">
            Enter Names (comma-separated):
          </label>
          <input
            id="names"
            type="text"
            value={namesInput}
            onChange={(e) => setNamesInput(e.target.value)}
            placeholder="e.g., Peter, Aditi, Ravi, Satoshi"
            disabled={loading}
            className="px-4 py-3 border-2 border-gray-200 rounded-lg text-sm sm:text-base transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <p className="text-xs text-gray-500">
            Separate multiple names with commas
          </p>
        </div>
        <button
          type="submit"
          disabled={loading || !namesInput.trim()}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-sm sm:text-base font-semibold cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <FaPaperPlane />
              Process Leads
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default LeadForm;

