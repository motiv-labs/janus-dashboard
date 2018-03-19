/* eslint-env jest */
import userSessionReducer from '../../../store/reducers/userSession.reducer'
import {
  CHECK_LOGGED_STATUS,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from '../../../store/constants/userSession.constants'
import touchedReducerProps from '../../../helpers/touchedReducerProperties'

describe('user session reducer', () => {
  describe('Default', () => {
    const initialState = { initial: 'state' }
    const result = userSessionReducer(initialState, {})

    it('returns the initial state by default', () => {
      expect(result).toEqual(initialState)
    })

    it('has change exact amount of properties which are in initialState', () => {
      expect(touchedReducerProps(result)).toBe(1)
    })
  })

  describe('CHECK_LOGGED_STATUS', () => {
    const result = userSessionReducer({}, {
      type: CHECK_LOGGED_STATUS
    })

    it('returns no changes to the state', () => {
      expect(result).toEqual({})
    })

    it('has NOT change any properties of the state', () => {
      expect(touchedReducerProps(result)).toBe(0)
    })
  })

  describe('LOGIN_START', () => {
    const result = userSessionReducer({}, {
      type: LOGIN_START
    })

    it('returns no changes to the state', () => {
      expect(result).toEqual({})
    })

    it('has NOT change any properties of the state', () => {
      expect(touchedReducerProps(result)).toBe(0)
    })
  })

  describe('LOGIN_SUCCESS', () => {
    const result = userSessionReducer(
      {},
      {
        type: LOGIN_SUCCESS,
        payload: {
          userName: 'mock-name',
          isAdmin: false
        }
      }
    )

    it('sets correct user info and admin status, and discard errorMsg to null when user getes logged in', () => {
      expect(result.user).toEqual('mock-name')
      expect(result.isAdmin).toEqual(false)
      expect(result.errorMsg).toEqual(null)
    })

    it('has only change exact amount of reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(3)
    })
  })

  describe('LOGIN_FAILURE', () => {
    const initialState = {
      user: 'mock-name',
      isAdmin: false,
      errorMsg: null
    }
    const payload = 'an-error-message'

    const result = userSessionReducer(
      initialState,
      {
        type: LOGIN_FAILURE,
        payload
      }
    )

    it('discards user info and status, and sets the error message to the given payload when user failed to log in', () => {
      expect(result.user).toEqual('')
      expect(result.isAdmin).toEqual(false)
      expect(result.errorMsg).toEqual(payload)
    })

    it('has only change exact amount of reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(3)
    })
  })

  describe('LOGOUT', () => {
    const result = userSessionReducer({}, {
      type: LOGOUT
    })

    it('discards user info', () => {
      expect(result.user).toBe('')
    })

    it('discards admin status', () => {
      expect(result.isAdmin).toBe(false)
    })

    it('has only change exact amount of reducer properties', () => {
      expect(touchedReducerProps(result)).toBe(2)
    })
  })
})
