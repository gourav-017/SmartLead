const axios = require('axios');

const NATIONALIZE_API_URL = 'https://api.nationalize.io';

/**
 * Fetches nationality prediction for a single name
 * @param {string} name - The name to query
 * @returns {Promise<Object>} - Object with country and probability
 */
async function getNationality(name) {
  try {
    const response = await axios.get(`${NATIONALIZE_API_URL}?name=${encodeURIComponent(name)}`, {
      timeout: 10000 // 10 second timeout
    });

    if (response.data && response.data.country && response.data.country.length > 0) {
      const topCountry = response.data.country[0];
      return {
        country: topCountry.country_id,
        probability: topCountry.probability
      };
    } else {
      // No prediction available
      return {
        country: 'Unknown',
        probability: 0
      };
    }
  } catch (error) {
    console.error(`Error fetching nationality for ${name}:`, error.message);
    return {
      country: 'Error',
      probability: 0
    };
  }
}

/**
 * Processes a batch of names concurrently
 * @param {Array<string>} names - Array of names to process
 * @returns {Promise<Array>} - Array of results with name, country, and probability
 */
async function processBatch(names) {
  try {
    const promises = names.map((name) =>
      getNationality(name.trim()).then((result) => ({
        name: name.trim(),
        ...result,
      }))
    );

    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error('Error processing batch:', error.message || error);
    throw error;
  }
}

module.exports = {
  getNationality,
  processBatch
};


