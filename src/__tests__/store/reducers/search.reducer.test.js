/* eslint-env jest */
import searchReducer, { initialState } from '../../../store/reducers/search.reducer'
import { SEARCH_QUERY } from '../../../store/constants/search.constants'
import touchedReducerProps from '../../../helpers/touchedReducerProperties'
import getRandomString from '../../../helpers/getRandomString'

describe('search reducer', () => {
  describe('Default', () => {
    const result = searchReducer(initialState, {})

    it('returns the initial state by default', () => {
      expect(result).toEqual(initialState)
    })

    it('has change exact amount of properties which are in initialState', () => {
      expect(touchedReducerProps(result)).toBe(1)
    })
  })

  describe('SEARCH_QUERY', () => {
    const searchQuery = getRandomString()
    const payload = searchQuery
    const result = searchReducer(initialState, { type: SEARCH_QUERY, payload })

    it('returns search query state when user type for a search', () => {
      expect(result.searchQuery).toEqual(searchQuery)
    })

    it('has only change exact amount of reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(1)
    })
  })
})
