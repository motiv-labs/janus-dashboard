import R from 'ramda'

const isAnyEmpty = iterables => R.any(R.isEmpty)(iterables)

export default isAnyEmpty
