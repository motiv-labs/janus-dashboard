/**
 * @name validation
 * We need this in order to handle radio buttons,
 * because React makes values as a string, so
 * we need to convert those strings('true'/'false') to boolean.
 *
 * @param {Object} pattern - string which will be part of the pattern
 * @param {Object} value - value from input
 *
 * @returns {Boolean}
 */

const validation = pattern => value => new RegExp(`^${pattern}`).test(value);

export default validation;
