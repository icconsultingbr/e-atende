// Check if a string is defined (not null or undefined)
function isDefined(str) {
  return !!str;
}

// Check if a value is an array of strings
function isStringArray(value) {
  return Array.isArray(value) && value.every(function (x) {
      return typeof x === 'string';
  });
}

// Check if a value is a validation error
function isValidationError(value) {
  return value && typeof value.property !== 'undefined' && typeof value.reason !== 'undefined';
}

// Replace all whitespace in a string
function replaceWhitespace(str) {
  return str.replace(/\s+/g, '');
}

// Convert a value to a string array
function toStringArray(value) {
  if (Array.isArray(value)) {
      return value.reduce(function (acc, item) {
          return acc.concat(replaceWhitespace(item));
      }, []).filter(isDefined);
  } else if (value && typeof value === 'string') {
      return value.split(',').map(replaceWhitespace).filter(isDefined);
  }
  return [];
}

// Export all functions
module.exports = {
  isDefined: isDefined,
  isStringArray: isStringArray,
  isValidationError: isValidationError,
  replaceWhitespace: replaceWhitespace,
  toStringArray: toStringArray
};