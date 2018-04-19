import {
  ___CONFIRMATION,
  ___CLOSE_CONFIRMATION,
  ___CLOSE_TOASTER,
  ___SHOW_ERROR
} from '../constants'

export const confirmAction = (
  actionType/*: String */,
  objectType/*: String */,
  objectEntity/*: Object */
) => ({
  type: ___CONFIRMATION,
  payload: {
    actionType,
    objectEntity,
    objectType
  }
})

export const ___closeConfirmation = () => ({
  type: ___CLOSE_CONFIRMATION
})

export const ___closeToaster = () => ({
  type: ___CLOSE_TOASTER
})

export const showError = error => ({
  type: ___SHOW_ERROR,
  payload: {
    error
  }
})
