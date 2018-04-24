import {
  OPEN_RESPONSE_MODAL,
  CLOSE_RESPONSE_MODAL
} from '../constants'

export const toasterState = {
  isOpen: false,
  message: ''
}

export const initialState = {
  isOpen: false,
  needConfirm: false,
  status: null,
  statusText: '',
  title: '',
  message: '',
  toaster: toasterState
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case OPEN_RESPONSE_MODAL: {
      const { message, redirectOnClose, status, statusText } = action.payload

      return {
        ...state,
        message,
        redirectOnClose,
        status,
        statusText,
        isOpen: true
      }
    }
    case CLOSE_RESPONSE_MODAL: {
      return initialState
    }
    default:
      return state
  }
}
