import R from 'ramda';

const getValues = path => target => R.path(path, target);

export default getValues;
