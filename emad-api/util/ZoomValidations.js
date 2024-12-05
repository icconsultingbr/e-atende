const ZoomUtil = require('./ZoomUtil');
const isStringArray = ZoomUtil.isStringArray;
const isValidationError = ZoomUtil.isValidationError;
const toStringArray = ZoomUtil.toStringArray;

// CURRIED VALIDATORS
function inNumberArray(allowedNumbers) {
    return function (property, value) {
        if (typeof value === 'undefined') return;

        if (typeof value !== 'number' || isNaN(value)) {
            return {
                property: property,
                reason: 'Value ' + value + ' not allowed, must be of type number'
            };
        }

        if (allowedNumbers.indexOf(value) === -1) {
            return {
                property: property,
                reason: 'Value is not valid. Got ' + value + ', expected ' + allowedNumbers
            };
        }
    };
}

function isBetween(min, max) {
    return function (property, value) {
        if (typeof value === 'undefined') return;

        if (typeof value !== 'number' || isNaN(value)) {
            return {
                property: property,
                reason: 'Value ' + value + ' not allowed, must be of type number'
            };
        }

        if (value < min || value > max) {
            return {
                property: property,
                reason: 'Value must be between ' + min + ' and ' + max
            };
        }
    };
}

function isLengthLessThan(maxLength) {
    return function (property, value) {
        if (typeof value === 'undefined') return;

        if (typeof value !== 'string') {
            return {
                property: property,
                reason: 'Value ' + value + ' not allowed, must be of type string'
            };
        }

        if (value.length > maxLength) {
            return {
                property: property,
                reason: 'Value exceeds max length. Got ' + value.length + ', expected less than or equal to ' + maxLength
            };
        }
    };
}

function isRequired(property, value) {
    if (typeof value === 'undefined') {
        return {
            property: property,
            reason: 'Property required, but not present in request body'
        };
    }
}

function matchesStringArray(allowedStrings) {
    return function (property, value) {
        if (typeof value === 'undefined') return;

        if (typeof value !== 'string' && !isStringArray(value)) {
            return {
                property: property,
                reason: 'Value ' + value + ' not allowed, must be of type string or string array'
            };
        }

        const arr = toStringArray(value);

        if (arr.length === 0) {
            return {
                property: property,
                reason: 'Property defined, but no values were present'
            };
        }

        if (!arr.every(function (x) { return allowedStrings.indexOf(x) !== -1; })) {
            return {
                property: property,
                reason: 'One or more values not allowed. Got (' + arr + '), expected (' + allowedStrings + ')'
            };
        }
    };
}

// VALIDATION RUNNER
function validateRequest(body, validator) {
    return Object.keys(validator)
        .map(function (property) {
            var value = body && body[property]; // Replace optional chaining
            var func = validator[property];
            var validations = Array.isArray(func)
                ? func.map(function (f) { return f(property, value); })
                : func ? func(property, value) : undefined;

            return Array.isArray(validations) ? validations : [validations];
        })
        .reduce(function (acc, curr) {
            return acc.concat(curr);
        }, [])
        .filter(isValidationError);
}

// Export all functions
module.exports = {
    inNumberArray: inNumberArray,
    isBetween: isBetween,
    isLengthLessThan: isLengthLessThan,
    isRequired: isRequired,
    matchesStringArray: matchesStringArray,
    validateRequest: validateRequest
};
