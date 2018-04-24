import {
  CONFIRMATION,
  CLOSE_CONFIRMATION,
  CLOSE_TOASTER,
  SHOW_ERROR
} from '../constants'

export const confirmAction = (
  actionType/*: String */,
  objectType/*: String */,
  objectEntity/*: Object */
) => ({
  type: CONFIRMATION,
  payload: {
    actionType,
    objectEntity,
    objectType
  }
})

export const closeConfirmation = () => ({
  type: CLOSE_CONFIRMATION
})

export const closeToaster = () => ({
  type: CLOSE_TOASTER
})

export const showError = error => ({
  type: SHOW_ERROR,
  payload: {
    error
  }
})
