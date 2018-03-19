/* eslint-env jest */
import oAuthServerReducer, { initialState } from '../../../store/reducers/oAuthServer.reducer'
import {
  FETCH_OAUTH_SERVER_SCHEMA_START,
  FETCH_OAUTH_SERVER_SCHEMA_SUCCESS,
  SAVE_OAUTH_SERVER_START,
  SAVE_OAUTH_SERVER_SUCCESS,
  UPDATE_OAUTH_SERVER_START,
  UPDATE_OAUTH_SERVER_SUCCESS,
  DELETE_OAUTH_SERVER_START,
  DELETE_OAUTH_SERVER_SUCCESS,
  CLEAR_OAUTH_SERVER
} from '../../../store/constants'

import touchedReducerProps from '../../../helpers/touchedReducerProperties'
import getRandomString from '../../../helpers/getRandomString'

describe('oAuthServerReducer', () => {
  describe('Default', () => {
    const result = oAuthServerReducer(initialState, {})

    it('returns the initial state by default', () => {
      expect(result).toEqual(initialState)
    })

    it('has only change exact amount of reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(3)
    })
  })

  describe('FETCH_OAUTH_SERVER_SCHEMA_START', () => {
    const result = oAuthServerReducer({}, { type: FETCH_OAUTH_SERVER_SCHEMA_START })

    it('returns fetching oauth servers starts state', () => {
      expect(result.isFetching).toEqual(true)
    })

    it('has only change exact amount of reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(1)
    })
  })

  describe('FETCH_OAUTH_SERVER_SCHEMA_SUCCESS', () => {
    const payload = getRandomString()
    const result = oAuthServerReducer({}, { type: FETCH_OAUTH_SERVER_SCHEMA_SUCCESS, payload })

    it('returns fetching oauth server final state with received info', () => {
      expect(result.isFetching).toEqual(false)
      expect(result.oAuthServerSchema).toEqual(payload)
    })

    it('has only change exact amount of reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(2)
    })
  })

  describe('SAVE_OAUTH_SERVER_START', () => {
    const initialState = { isFetching: false }
    const result = oAuthServerReducer(initialState, { type: SAVE_OAUTH_SERVER_START })

    it('sets the isFetching state to true', () => {
      expect(result.isFetching).toEqual(true)
    })

    it('changes only the required reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(1)
    })
  })

  describe('UPDATE_OAUTH_SERVER_START', () => {
    const initialState = { isFetching: false }
    const result = oAuthServerReducer(initialState, { type: UPDATE_OAUTH_SERVER_START })

    it('sets the isFetching state to true', () => {
      expect(result.isFetching).toEqual(true)
    })

    it('changes only the required reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(1)
    })
  })

  describe('DELETE_OAUTH_SERVER_START', () => {
    const initialState = { isFetching: false }
    const result = oAuthServerReducer(initialState, { type: DELETE_OAUTH_SERVER_START })

    it('sets the isFetching state to true', () => {
      expect(result.isFetching).toEqual(true)
    })

    it('changes only the required reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(1)
    })
  })

  describe('SAVE_OAUTH_SERVER_SUCCESS', () => {
    const initialState = { isFetching: true }
    const result = oAuthServerReducer(initialState, { type: SAVE_OAUTH_SERVER_SUCCESS })

    it('sets the isFetching state to true', () => {
      expect(result.isFetching).toEqual(false)
    })

    it('changes only the required reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(1)
    })
  })

  describe('UPDATE_OAUTH_SERVER_SUCCESS', () => {
    const initialState = { isFetching: true }
    const result = oAuthServerReducer(initialState, { type: UPDATE_OAUTH_SERVER_SUCCESS })

    it('sets the isFetching state to true', () => {
      expect(result.isFetching).toEqual(false)
    })

    it('changes only the required reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(1)
    })
  })

  describe('DELETE_OAUTH_SERVER_SUCCESS', () => {
    const initialState = { isFetching: true }
    const result = oAuthServerReducer(initialState, { type: DELETE_OAUTH_SERVER_SUCCESS })

    it('sets the isFetching state to true', () => {
      expect(result.isFetching).toEqual(false)
    })

    it('changes only the required reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(1)
    })
  })

  describe('CLEAR_OAUTH_SERVER', () => {
    const result = oAuthServerReducer({}, { type: CLEAR_OAUTH_SERVER })

    it('clear the OAuthServer object', () => {
      expect(result.oAuthServer).toEqual({})
    })

    it('changes only the required reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(1)
    })
  })
})
