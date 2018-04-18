import {
  ___CONFIRMATION,
  ___CLOSE_CONFIRMATION,
  ___CLOSE_TOASTER,
  ___SHOW_ERROR
} from '../constants'

const toasterInitialState = {}

export const initialState = {
  isOpen: false,
  actionType: '',
  error: null,
  objectEntity: null,
  objectType: '',
  toaster: toasterInitialState
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case ___CONFIRMATION: {
      return {
        ...state,
        actionType: action.payload.actionType,
        objectEntity: action.payload.objectEntity,
        objectType: action.payload.objectType,
        isOpen: true
      }
    }
    case ___CLOSE_CONFIRMATION: {
      return {
        ...initialState
      }
    }
    case ___CLOSE_TOASTER: {
      return {
        ...state,
        toaster: toasterInitialState
      }
    }
    case ___SHOW_ERROR: {
      return {
        ...state,
        error: action.payload.error
      }
    }
    default:
      return state
  }
}
