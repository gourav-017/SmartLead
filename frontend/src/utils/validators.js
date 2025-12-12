/**
 * Validate names input
 * @param {string} namesInput - Comma-separated names string
 * @returns {{ isValid: boolean, error?: string, names?: string[] }}
 */
export const validateNamesInput = (namesInput) => {
  if (!namesInput || !namesInput.trim()) {
    return {
      isValid: false,
      error: 'Please enter at least one name',
    };
  }

  const namesArray = namesInput
    .split(',')
    .map((name) => name.trim())
    .filter((name) => name.length > 0);

  if (namesArray.length === 0) {
    return {
      isValid: false,
      error: 'Please enter valid names separated by commas',
    };
  }

  // Check for empty names after trimming
  const hasEmptyNames = namesArray.some((name) => name.length === 0);
  if (hasEmptyNames) {
    return {
      isValid: false,
      error: 'Names cannot be empty',
    };
  }

  // Check for duplicate names
  const uniqueNames = new Set(namesArray);
  if (uniqueNames.size !== namesArray.length) {
    return {
      isValid: false,
      error: 'Duplicate names are not allowed',
    };
  }

  return {
    isValid: true,
    names: namesArray,
  };
};

