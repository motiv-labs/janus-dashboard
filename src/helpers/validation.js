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
    switch (pattern) {
        case 'name': {
            const nameRegex = /^[a-z_-]{1,100}$/;

            return nameRegex.test(value);
        }
        default: {
            const fn = p => new RegExp(`^${pattern}`).test(value);

            return R.any(fn)(pattern);
        }
    }
};

export default validation;
