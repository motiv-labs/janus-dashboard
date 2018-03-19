/* eslint-env jest */
import apiReducer, { initialState } from '../../../store/reducers/api.reducer'
import {
  DELETE_ENDPOINT_START,
  DELETE_ENDPOINT_SUCCESS,
  FETCH_ENDPOINT_START,
  FETCH_ENDPOINT_SUCCESS,
  FETCH_ENDPOINT_SCHEMA_START,
  FETCH_ENDPOINT_SCHEMA_SUCCESS,
  SAVE_ENDPOINT_START,
  SAVE_ENDPOINT_SUCCESS,
  SET_DEFAULT_ENDPOINT,
  EXCLUDE_PLUGIN,
  SELECT_PLUGIN,
  RESET_ENDPOINT
} from '../../../store/constants/api.constants'

import touchedReducerProps from '../../../helpers/touchedReducerProperties'

describe('apiReducer', () => {
  describe('Default', () => {
    const result = apiReducer(initialState, {})

    it('returns the intial state by default', () => {
      expect(result).toEqual(initialState)
    })

    it('should handle only change exact amount of reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(4)
    })
  })

  describe('RESET_ENDPOINT', () => {
    const result = apiReducer(Math.random(), { type: RESET_ENDPOINT })

    it('returns the initial state when RESET_ENDPOINT was triggered', () => {
      expect(result).toEqual(initialState)
    })

    it('should handle only change exact amount of reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(4)
    })
  })

  describe('DELETE_ENDPOINT_START', () => {
    const initialState = { isFetching: false }
    const result = apiReducer(initialState, { type: DELETE_ENDPOINT_START })

    it('sets the isFetching state to true when delete endpoint started', () => {
      expect(result.isFetching).toEqual(true)
    })

    it('should handle only change exact amount of reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(1)
    })
  })

  describe('FETCH_ENDPOINT_START', () => {
    const initialState = { isFetching: false }
    const result = apiReducer(initialState, { type: FETCH_ENDPOINT_START })

    it('sets the isFetching state to true when fetch endpoint started', () => {
      expect(result.isFetching).toEqual(true)
    })

    it('should handle only change exact amount of reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(1)
    })
  })

  describe('FETCH_ENDPOINT_SCHEMA_START', () => {
    const initialState = { isFetching: false }
    const result = apiReducer(initialState, { type: FETCH_ENDPOINT_SCHEMA_START })

    it('sets the isFetching state to true when fetch endpoint schema started', () => {
      expect(result.isFetching).toEqual(true)
    })

    it('should handle only change exact amount of reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(1)
    })
  })

  describe('SAVE_ENDPOINT_START', () => {
    const initialState = { isFetching: false }
    const result = apiReducer(initialState, { type: SAVE_ENDPOINT_START })

    it('sets the isFetching state to true when save endpoint started', () => {
      expect(result.isFetching).toEqual(true)
    })

    it('should handle only change exact amount of reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(1)
    })
  })

  describe('DELETE_ENDPOINT_SUCCESS', () => {
    const initialState = { isFetching: true }
    const result = apiReducer(initialState, { type: DELETE_ENDPOINT_SUCCESS })

    it('sets the isFetching state to false when delete endpoint succeeded', () => {
      expect(result.isFetching).toEqual(false)
    })

    it('should handle only change exact amount of reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(1)
    })
  })

  describe('SAVE_ENDPOINT_SUCCESS', () => {
    const initialState = { isFetching: true }
    const result = apiReducer(initialState, { type: SAVE_ENDPOINT_SUCCESS })

    it('sets the isFetching state to false when save endpoint succeeded', () => {
      expect(result.isFetching).toEqual(false)
    })

    it('should handle only change exact amount of reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(1)
    })
  })

  describe('FETCH_ENDPOINT_SCHEMA_SUCCESS', () => {
    const payload = 'expected-value'
    const initialState = {
      isFetching: true,
      apiSchema: 'old-api-schema-value'
    }
    const result = apiReducer(
      initialState,
      {
        type: FETCH_ENDPOINT_SCHEMA_SUCCESS,
        payload
      }
    )

    it('sets the apiSchema equal to the given payload and the isFetching state to false when fetching endpoint schema succeeded', () => {
      expect(result.isFetching).toEqual(false)
      expect(result.apiSchema).toEqual(payload)
    })

    it('should handle only change exact amount of reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(2)
    })
  })

  describe('EXCLUDE_PLUGIN', () => {
    const payload = [1, 3, 5]
    const initialState = { selectedPlugins: [1, 2, 3, 4, 5] }
    const result = apiReducer(initialState, { type: EXCLUDE_PLUGIN, payload })

    it('remove the payload plugins from the state', () => {
      expect(result.selectedPlugins.length).toEqual(2)
      expect(result.selectedPlugins[0]).toEqual(2)
      expect(result.selectedPlugins[1]).toEqual(4)
    })

    it('should handle only change exact amount of reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(1)
    })
  })

  describe('SELECT_PLUGIN', () => {
    const payload = [1, 3, 5]
    const initialState = { selectedPlugins: [2, 4] }
    const result = apiReducer(initialState, { type: SELECT_PLUGIN, payload })

    it('add the payload plugins to the state', () => {
      expect(result.selectedPlugins.length).toEqual(5)
      expect(result.selectedPlugins[2]).toEqual(1)
      expect(result.selectedPlugins[3]).toEqual(3)
      expect(result.selectedPlugins[4]).toEqual(5)
    })

    it('should handle only change exact amount of reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(1)
    })
  })

  describe('FETCH_ENDPOINT_SUCCESS', () => {
    const api = {
      plugins: [
        { name: 'name-1' },
        { name: 'name-2' },
        { name: 'name-3' }
      ]
    }
    const response = 'response-value'
    const payload = {
      api,
      response
    }
    const result = apiReducer({}, { type: FETCH_ENDPOINT_SUCCESS, payload })

    it('sets the api, response, selectedPlugins from the api values and isFetching to false', () => {
      expect(result.api).toEqual(api)
      expect(result.response).toEqual(response)
      expect(result.isFetching).toEqual(false)
      expect(result.selectedPlugins.length).toEqual(3)
      expect(result.selectedPlugins[0]).toEqual('name-1')
      expect(result.selectedPlugins[1]).toEqual('name-2')
      expect(result.selectedPlugins[2]).toEqual('name-3')
    })

    it('should handle only change exact amount of reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(4)
    })
  })

  describe('SET_DEFAULT_ENDPOINT', () => {
    const api = 'meow'
    const result = apiReducer({}, {
      type: SET_DEFAULT_ENDPOINT,
      payload: api
    })

    it('sets the api to action payload when SET_DEFAULT_ENDPOINT was triggered', () => {
      expect(result.api).toEqual(api)
    })

    it('should handle only change exact amount of reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(1)
    })
  })
})
