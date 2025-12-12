/**
 * Format confidence score as percentage
 * @param {number} score - Confidence score (0-1)
 * @returns {string} Formatted percentage string
 */
export const formatConfidence = (score) => {
  if (typeof score !== 'number' || isNaN(score)) {
    return '0.0%';
  }
  return `${(score * 100).toFixed(1)}%`;
};

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  if (!date) return 'N/A';
  try {
    return new Date(date).toLocaleString();
  } catch (error) {
    return 'Invalid Date';
  }
};

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

