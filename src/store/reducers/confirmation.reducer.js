import {
  CONFIRMATION,
  SAVE_ENDPOINT_SUCCESS,
  SAVE_OAUTH_SERVER_SUCCESS,
  DELETE_ENDPOINT_SUCCESS,
  DELETE_OAUTH_SERVER_SUCCESS,
  CLOSE_CONFIRMATION,
  CLOSE_TOASTER,
  SHOW_ERROR
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
    case CONFIRMATION: {
      return {
        ...state,
        actionType: action.payload.actionType,
        objectEntity: action.payload.objectEntity,
        objectType: action.payload.objectType,
        isOpen: true
      }
    }
    case CLOSE_CONFIRMATION: {
      return {
        ...initialState
      }
    }
    case CLOSE_TOASTER: {
      return {
        ...state,
        toaster: toasterInitialState
      }
    }
    case SAVE_ENDPOINT_SUCCESS: {
      return {
        toaster: {
          actionType: 'save',
          name: `Endpoint "${action.payload.name}"`,
          isOpen: true
        }
      }
    }
    case DELETE_ENDPOINT_SUCCESS: {
      return {
        toaster: {
          actionType: 'delete',
          name: `Endpoint "${action.payload}"`,
          isOpen: true
        }
      }
    }
    case SAVE_OAUTH_SERVER_SUCCESS: {
      return {
        toaster: {
          actionType: 'save',
          name: `OAuth server "${action.payload.name}"`,
          isOpen: true
        }
      }
    }
    case DELETE_OAUTH_SERVER_SUCCESS: {
      return {
        toaster: {
          actionType: 'delete',
          name: `OAuth server "${action.payload}"`,
          isOpen: true
        }
      }
    }
    case SHOW_ERROR: {
      return {
        ...state,
        error: action.payload.error
      }
    }
    default:
      return state
  }
}
