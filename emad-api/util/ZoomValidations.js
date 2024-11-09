const { isStringArray, isValidationError, toStringArray } = require('./ZoomUtil');

// CURRIED VALIDATORS
const inNumberArray = (allowedNumbers) => (property, value) => {
  if (typeof value === 'undefined') return;

  if (typeof value !== 'number' || isNaN(value)) {
    return {
      property,
      reason: `Value ${value} not allowed, must be of type number`,
    };
  }

  if (!allowedNumbers.includes(value)) {
    return {
      property,
      reason: `Value is not valid. Got ${value}, expected ${allowedNumbers}`,
    };
  }
};

const isBetween = (min, max) => (property, value) => {
  if (typeof value === 'undefined') return;

  if (typeof value !== 'number' || isNaN(value)) {
    return {
      property,
      reason: `Value ${value} not allowed, must be of type number`,
    };
  }

  if (value < min || value > max) {
    return {
      property,
      reason: `Value must be between ${min} and ${max}`,
    };
  }
};

const isLengthLessThan = (maxLength) => (property, value) => {
  if (typeof value === 'undefined') return;

  if (typeof value !== 'string') {
    return {
      property,
      reason: `Value ${value} not allowed, must be of type string`,
    };
  }

  if (value.length > maxLength) {
    return {
      property,
      reason: `Value exceeds max length. Got ${value.length}, expected less than or equal to ${maxLength}`,
    };
  }
};

const isRequired = (property, value) => {
  if (typeof value === 'undefined') {
    return {
      property,
      reason: `Property required, but not present in request body`,
    };
  }
};

const matchesStringArray = (allowedStrings) => (property, value) => {
  if (typeof value === 'undefined') return;

  if (typeof value !== 'string' && !isStringArray(value)) {
    return {
      property,
      reason: `Value ${value} not allowed, must be of type string or string array`,
    };
  }

  const arr = toStringArray(value);

  if (arr.length === 0) {
    return {
      property,
      reason: `Property defined, but no values were present`,
    };
  }

  if (!arr.every((x) => allowedStrings.includes(x))) {
    return {
      property,
      reason: `One or more values not allowed. Got (${arr}), expected (${allowedStrings})`,
    };
  }
};

// VALIDATION RUNNER
const validateRequest = (body, validator) =>
  Object.keys(validator)
    .flatMap((property) => {
      const value = body ? body[property] : '';
      const func = validator[property];
      const validations = Array.isArray(func) ? func.map((f) => f(property, value)) : func(property, value);
      return Array.isArray(validations) ? validations : [validations];
    })
    .filter(isValidationError);

// Export all functions
module.exports = {
  inNumberArray,
  isBetween,
  isLengthLessThan,
  isRequired,
  matchesStringArray,
  validateRequest,
};
