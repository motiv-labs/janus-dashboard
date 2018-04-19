import {
  OPEN_RESPONSE_MODAL,
  CLOSE_RESPONSE_MODAL,
  CLEAR_CONFIRMATION_MODAL
} from '../constants'

export const openResponseModal = data => ({
  type: OPEN_RESPONSE_MODAL,
  payload: data
})

export const closeResponseModal = () => ({
  type: CLOSE_RESPONSE_MODAL
})

export const clearConfirmationModal = () => ({
  type: CLEAR_CONFIRMATION_MODAL
})
