import R from 'ramda';
/**
 * @name validation
 * We need this in order to handle radio buttons,
 * because React makes values as a string, so
 * we need to convert those strings('true'/'false') to boolean.
 *
 * @param {String || Array<String>} pattern - string which will be part of the pattern
 * @param {String} value - value from input
 *
 * @returns {Boolean}
 */

const validation = pattern => value => {
    const fn = p => new RegExp(`^${p}`).test(value);

    return R.any(fn)(pattern);
};

export default validation;
