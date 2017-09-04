export const parseJwt = token => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');

    return JSON.parse(window.atob(base64));
};

export const isEmpty = prop => (
  prop === null ||
    prop === undefined ||
    (Object.prototype.hasOwnProperty.call(prop, 'length') && prop.length === 0) ||
    (prop.constructor === Object && Object.keys(prop).length === 0)
);

export const carryTypeOf = variable => (comparator) => {
    const pattern = /Array|String|Object|Boolean|Number|Function/g;
    const variableType = Object.prototype.toString.call(variable).match(pattern)[0];

    if (comparator) {
        return variableType === comparator;
    }

    return variableType;
};

export const typeOf = (variable, comparator) => {
    const pattern = /Array|String|Object|Boolean|Number|Function/g;
    const variableType = Object.prototype.toString.call(variable).match(pattern)[0];

    if (comparator) {
        return variableType === comparator;
    }

    return variableType;
};

