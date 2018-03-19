import {
  DISCARD_PAGINATION,
  SET_PAGINATION_PAGE
} from '../constants'

export const discardPagination = () => ({
  type: DISCARD_PAGINATION
})

export const setCurrentPageIndex = index => ({
  type: SET_PAGINATION_PAGE,
  payload: index
})
