import {
  OPEN_RESPONSE_MODAL,
  CLOSE_RESPONSE_MODAL,
  CLEAR_CONFIRMATION_MODAL
} from '../constants'

export const confirmationModalState = {
  actionType: '',
  api: {},
  apiName: null,
  message: '',
  needConfirm: false,
  isRedirect: null,
  status: null,
  title: ''
}

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
  confirmationModal: confirmationModalState,
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
    case CLEAR_CONFIRMATION_MODAL: {
      return {
        ...state,
        confirmationModal: confirmationModalState
      }
    }
    case CLOSE_RESPONSE_MODAL: {
      return initialState
    }
    default:
      return state
  }
}
