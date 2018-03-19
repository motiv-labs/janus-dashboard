import {
  REQUEST_START,
  REQUEST_COMPLETE,
  REQUEST_FAILURE
} from '../constants'

export const initialState = {
  isFetching: false
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case REQUEST_START: {
      return {
        ...state,
        isFetching: true
      }
    }

    case REQUEST_COMPLETE:
    case REQUEST_FAILURE: {
      return {
        ...state,
        isFetching: false
      }
    }

    default:
      return state
  }
}
