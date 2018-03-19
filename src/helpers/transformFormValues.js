import R from 'ramda'

/**
 * @name transformFormValues
 * We need this in order to handle radio buttons,
 * because React makes values as a string, so
 * we need to convert those strings('true'/'false') to boolean.
 *
 * @param {Object} values - Values of redux-form
 *
 * @returns {Object}
 */

const transformFormValues = (values, toBoolean) => {
  const convertToBooleans = (val, key, obj) => {
    if (toBoolean) {
      if (val === 'true') return true
      if (val === 'false') return false
      if (R.type(val) === 'Object') return R.mapObjIndexed(convertToBooleans, val)
    } else {
      if (val === true) return 'true'
      if (val === false) return 'false'
      if (R.type(val) === 'Object') return R.mapObjIndexed(convertToBooleans, val)
    }

    return val
  }

  return R.mapObjIndexed(convertToBooleans, values)
}

export default transformFormValues
