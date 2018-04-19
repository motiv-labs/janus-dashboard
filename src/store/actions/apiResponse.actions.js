import {
  OPEN_RESPONSE_MODAL,
  CLOSE_RESPONSE_MODAL,
  OPEN_CONFIRMATION_MODAL,
  CLOSE_CONFIRMATION_MODAL,
  CLEAR_CONFIRMATION_MODAL,
  OPEN_TOASTER,
  CLOSE_TOASTER
} from '../constants'

import {
  confirmedDeleteOAuthServer
} from './oAuthServer.actions'

export const openResponseModal = data => ({
  type: OPEN_RESPONSE_MODAL,
  payload: data
})

export const closeResponseModal = () => ({
  type: CLOSE_RESPONSE_MODAL
})

export const openConfirmationModal = (action, api, apiName, isRedirect) => {
  const createConfirmationContent = action => {
    switch (action) {
      case 'save': {
        return {
          api,
          apiName,
          message: 'Are you sure you want to save?',
          status: action,
          actionType: 'save',
          title: 'Save'
        }
      }
      case 'update': {
        return {
          api,
          apiName,
          message: 'Are you sure you want to update?',
          status: action,
          actionType: 'update',
          title: 'Update'
        }
      }
      case 'delete':
      case 'deleteOAuthServer': {
        return {
          message: 'Are you sure you want to delete? This can\'t be undone',
          status: action,
          actionType: 'delete',
          title: `Delete ${apiName ? apiName + '?' : ''}`,
          apiName,
          isRedirect
        }
      }
      default:
        return false
    }
  }

  return {
    type: OPEN_CONFIRMATION_MODAL,
    payload: createConfirmationContent(action)
  }
}

export const closeConfirmationModal = () => ({
  type: CLOSE_CONFIRMATION_MODAL
})

export const clearConfirmationModal = () => ({
  type: CLEAR_CONFIRMATION_MODAL
})

export const showToaster = () => ({
  type: OPEN_TOASTER
})

export const closeToaster = () => ({
  type: CLOSE_TOASTER
})

// @HERE
export const afterCloseConfirmationModal = (actionType, item, itemName, isRedirect) => (dispatch, getState) => {
  switch (actionType) {
    case 'deleteOAuthServer': {
      return confirmedDeleteOAuthServer(dispatch, itemName, isRedirect)
    }
    default:
      return false
  }
}
