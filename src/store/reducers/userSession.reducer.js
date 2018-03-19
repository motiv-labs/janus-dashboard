import {
  CHECK_LOGGED_STATUS,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from '../constants'

export const initialState = {
  errorMsg: null,
  isAdmin: false,
  user: ''
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case CHECK_LOGGED_STATUS:
    case LOGIN_START: {
      return {
        ...state
      }
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        errorMsg: null,
        user: action.payload.userName,
        isAdmin: action.payload.isAdmin
      }
    }

    case LOGIN_FAILURE: {
      return {
        ...state,
        errorMsg: action.payload,
        user: '',
        isAdmin: false
      }
    }

    case LOGOUT: {
      return {
        ...state,
        user: '',
        isAdmin: false
      }
    }

    default:
      return state
  }
}
