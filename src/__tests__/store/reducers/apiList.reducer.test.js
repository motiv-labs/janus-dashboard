/* eslint-env jest */
import apiList, { initialState } from '../../../store/reducers/apiList.reducer'
import {
  FETCH_ENDPOINTS_START,
  FETCH_ENDPOINTS_SUCCESS,
  REFRESH_ENDPOINTS,
  SET_SORTING_FILTER,
  SET_ASCEND_FILTER
} from '../../../store/constants/apiList.constants'
import touchedReducerProps from '../../../helpers/touchedReducerProperties'
import getRandomString from '../../../helpers/getRandomString'

describe('search', () => {
  describe('Default', () => {
    const result = apiList(initialState, {})

    it('returns the initial state by default', () => {
      expect(result).toEqual(initialState)
    })

    it('has only change exact amount of reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(4)
    })
  })

  describe('FETCH_ENDPOINTS_START', () => {
    const result = apiList({}, { type: FETCH_ENDPOINTS_START })

    it('returns fetching endpoint starts state', () => {
      expect(result.isFetching).toEqual(true)
    })

    it('has only change exact amount of reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(1)
    })
  })

  describe('FETCH_ENDPOINTS_SUCCESS', () => {
    const randomString = getRandomString()
    const result = apiList({}, { type: FETCH_ENDPOINTS_SUCCESS, payload: randomString })

    it('returns fetched endpoint success state', () => {
      expect(result.apiList).toEqual(randomString)
      expect(result.isFetching).toEqual(false)
    })

    it('has only change exact amount of reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(2)
    })
  })

  // TODO: investigate for more better solution
  describe('REFRESH_ENDPOINTS', () => {
    const result = apiList(initialState, { type: REFRESH_ENDPOINTS })

    it('returns resfresh endpoints state', () => {
      expect(result.apiList).toEqual([])
    })

    it('returns resfresh endpoints state when having already elements on apiList', () => {
      const newInitialState = { ...initialState,
        apiList: [
          {name: 1},
          {name: 2},
          {name: 3}
        ]}
      const payload = 3
      const result = apiList(
        newInitialState,
        {
          type: REFRESH_ENDPOINTS,
          payload
        }
      )

      expect(result.apiList).toEqual([
        {name: 1},
        {name: 2}
      ])
    })

    it('has only change exact amount of reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(4)
    })
  })

  describe('SET_SORTING_FILTER', () => {
    const payload = 'filter'
    const result = apiList(
      {},
      {
        type: SET_SORTING_FILTER,
        payload
      }
    )

    it('sets the sorting filter', () => {
      expect(result.sortingFilter).toEqual(payload)
    })

    it('has only change exact amount of reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(1)
    })
  })

  describe('SET_ASCEND_FILTER', () => {
    const state = { sortAscend: true }
    const result = apiList(state, { type: SET_ASCEND_FILTER })

    it('switches ascending/descending sorting', () => {
      expect(result.sortAscend).toBe(!state.sortAscend)
    })

    it('has only change exact amount of reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(1)
    })
  })
})
